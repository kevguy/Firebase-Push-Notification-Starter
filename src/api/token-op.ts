import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';

import * as pushNotification from './custom-firebase/push-notification/device-group';
import * as Token from './database/controllers/TokenController';
import * as DeviceGroup from './database/controllers/DeviceGroupController';
import * as topics from './custom-firebase/push-notification/topic';
import * as utils from './utils';

/**
 * Create Observable for creating notification key for a user's group
 * @param record {TokenRecord} user's token record
 * @returns {Observable} the Observable
 */
export function createNotificationKeyStream(record: TokenRecord): Observable<any> {
  return Observable
    .fromPromise(pushNotification.addToken(record))
    .map((result: string) => ({
      status: 'success',
      msg: 'created notification key successfully',
      notification_key: result
    }));
}

/**
 * Create Observable for subscribing tokento the `test` topic
 * and the welcome topic for corresponding language
 * @param token {string} user's token
 * @param lang {LangType} user's chosen language
 * @returns {Observable} the Observable
 */
export function topicsSubscriptionStream(token: string, lang: LangType) {
  const langKey = utils.getLangKey(lang);

  return Observable.merge(
    Observable.fromPromise(topics.subscribeTokenToTopic(token, 'test')),
    Observable.fromPromise(topics.subscribeTokenToTopic(token, `welcome__${langKey}`)))
    .last();
}

/**
 * Create Observable for saving a new token
 * and the welcome topic for corresponding language
 * @param record {TokenRecord} user's token record
 * @returns {Observable} the Observable
 */
export function saveNewTokenStream(record: TokenRecord) {
  const deviceGroupName = utils.getDeviceGroupName(record.userId, record.lang);

  // token doesn't exist in database
  // find notification key for the device group and save the token to Firebase
  // save the token to MongoDB (both Token and DeviceGroup)
  const saveTokenStream = Token.saveTokenStream(record);
  const addTokenToDeviceGroupStream = DeviceGroup.addTokenToDeviceGroupStream({
    deviceGroup: deviceGroupName,
    userId: record.userId,
    token: record.token
  });

  return createNotificationKeyStream(record)
    .flatMap((result: any) => Observable.merge(
      saveTokenStream,
      addTokenToDeviceGroupStream
    ))
    .last();
}

// export default async function retrieveTokensHandler(userId: string,
//     req: Request, res: Response, next: NextFunction) {
//   let payload: Payload;
//
//   const database = setupDatabase(getConfig());
//   const result = await users.retrieveUser(database, userId);
//   payload = { status: 'success', result };
//   res.send(JSON.stringify(payload));
// }

/**
 * Retrieve all the tokens associated to the user from MongoDB
 * @param userId {string} user's id
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function retrieveTokens(userId: string,
    req: Request, res: Response, next: NextFunction) {

  utils.handler(Token.findTokensStream(userId), req, res, next);
}

/**
 * Register tokens to Firebase's device group and
 * Saves token to MongoDb along with the device group it's associated to
 * @param record {TokenRecord} user's token record
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function saveToken(
    record: TokenRecord,
    req: Request, res: Response, next: NextFunction): void {

  const { userId, token, lang }: Partial<TokenRecord> = record;
  const stream = Token.queryTokenStream(token) // query if token already exists
    .flatMap((res: any) => {
      if (res.hasOwnProperty('token')) { return saveNewTokenStream(record); }
      return Observable.of(1); // dummy value indicating token is found in MongoDb
    })
    // subscribe token to topics
    .flatMap((res: any) => topicsSubscriptionStream(token, lang))
    // .flatMap((result: any) => {
    //   // for testing purpose
    //   return Observable.fromPromise(topics.sendMsgToTopic({
    //     body: 'qwerty',
    //     title: 'qwerty'
    //   }, 'test'));
    // })
    .map((result: any) => ({
      status: 'success',
      msg: 'successfully saved token'
    }));

  utils.handler(stream, req, res, next);
}


export default function tokenRoutes(app: Application) {
  app.post('/api/token', (req: Request, res: Response, next: NextFunction) => {
    saveToken(<TokenRecord>req.body, req, res, next);
  });

  app.get('/api/tokens/:userId', (req: Request, res: Response, next: NextFunction) => {
    retrieveTokens(req.params.userId, req, res, next);
  });
}
