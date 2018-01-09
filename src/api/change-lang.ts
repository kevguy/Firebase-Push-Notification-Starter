import { Application, Request, Response, NextFunction } from 'express';
import * as DeviceGroup from './database/controllers/DeviceGroupController';
import * as Token from './database/controllers/TokenController';
import { Observable, Observer } from 'rxjs/Rx';
// import * as userGroups from './custom-firebase/database/userGroups';

import { addTokenStream, removeTokenStream } from './utils/saveToken';

import * as utils from './utils';

export function addAndRemoveToken(tokenInfo: TokenRecord, targetLang: LangType) {
  const record: TokenRecord = {
    type: tokenInfo.type,
    token: tokenInfo.token,
    userId: tokenInfo.userId,
    lang: tokenInfo.lang
  };

  const addStream = addTokenStream({
      ...record,
      lang: targetLang
    })
    .do((result: any) => {
      console.info(`[Change Lang]: added token to ${targetLang} and subscribed to the right topic`);
    });

  const removeStream = removeTokenStream(record)
    .do((result: any) => {
      console.info(`[Change Lang]: removed token from ${tokenInfo.lang} and unsubscribed from the right topic`);
    });

  return Observable.concat(removeStream, addStream).last();
}

/**
 * Loop through a list of device groups and find if a token exists inside
 * Note that it'll only find one even if the token is in multiple device groups
 * @param token {string} the token
 * @param deviceGroups {string[]} the list of deviceGroups
 * @returns {Observable<any>} the observable
 */
export function checkTokenFromDeviceGroupStream(token: string, deviceGroups: string[]): Observable<any> {
  // find the device group the token belongs to
  // for each deviceGroup
  const streams = deviceGroups.map((deviceGroup) => DeviceGroup.checkTokenFromDeviceGroupStream(token, deviceGroup));
  const stream = Observable.merge(...streams)
    .filter((result: any) => result.found)
    // supposedly only one device group has that token
    .reduce((acc, curr: any) => {
      if (curr.found) return curr.deviceGroup;
      return acc;
    }, '');
  return stream;
}

/**
 * Handles /api/device-group/change-lang
 * @param deviceGroup {string} the device group name
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export default function changeLang(req: Request, res: Response, next: NextFunction): void {
  const { userId, token, targetLang }: ChangeLangType = req.body;

  const langKey = utils.getLangKey(targetLang);
  const targetGroupName = utils.getDeviceGroupName(userId, targetLang);
  const targetTopicName = utils.getBroadcastTopicName(targetLang);

  let originalGroupName: string;
  let tokenInfo: any;

  const stream = Token.queryTokenStream(token)
    .do((res: any) => {
      console.info(`[Change Lang]: queried token info`);
      tokenInfo = res;
    })
    .flatMap((result) => DeviceGroup.queryDeviceGroupStream(userId))
    .do((res: any) =>{ console.info(`[Change Lang]: queried device groups`); })
    .flatMap((result: Array<string>) => {
      // find the device group the token belongs to
      if (result.length > 0) {
        return checkTokenFromDeviceGroupStream(token, result);
      }
      return Observable.throw('Original Device Group Not Found');
    })
    .do((result: string) => {
      console.info(`[Change Lang]: found matched device group: ${result}`);
      originalGroupName = result;
    })
    .flatMap((res: any) => addAndRemoveToken(tokenInfo, targetLang))
    .flatMap((result: any) => Token.saveTokenStream({
        type: tokenInfo.type,
        lang: targetLang,
        token: tokenInfo.token,
        userId: tokenInfo.userId
      })
    )
    .do((result: any) => { console.info(`[Change Lang]: saved token to database`); })
    .map((result: any) => ({
        status: 'success',
        msg: `Device Group changed from ${originalGroupName} to ${targetGroupName}`
      })
    );

  utils.handler(stream, req, res, next);
}
