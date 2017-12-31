import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import { setupDatabase } from './custom-firebase/database/utils';
import * as users from './custom-firebase/database/users';
import * as userGroups from './custom-firebase/database/userGroups';
import { getConfig } from './custom-firebase/index';
import { saveTokenStream } from '../controllers/TokenController';

export function saveUserStream(database: any, record: TokenRecord) {
  return Observable.fromPromise(
    users.updateUser(database, record))
    .flatMap((result) =>
      Observable.of({ status: 'success', msg: 'saved user successfully' }))
    .do(() => { console.log('saved user'); });
}

export function createNotificationKeyStream(record: TokenRecord) {
  console.log(record);
  return Observable.fromPromise(
    userGroups.addToken(record))
    .flatMap((result) => Observable.of({
      status: 'success',
      msg: 'created notification key successfully',
      notification_key: result
    }))
    .do(() => { console.log('created notification key'); });
}

export default function saveToken(
    record: TokenRecord,
    req: Request, res: Response, next: NextFunction): void {
  const { userId, token, lang }: Partial<TokenRecord> = record;
  const payload: Payload = {
    status: 'success',
    result: []
  };
  // const database = setupDatabase(getConfig());
  // const userStream = saveUserStream(database, record);
  // const notificationKeyStream = createNotificationKeyStream(record);
  const mongoStream = saveTokenStream(record);
  // const stream = Observable.merge(userStream, notificationKeyStream);
  const stream = mongoStream;


  stream.subscribe(
    (result: {}) => { payload.result.push(result); console.log(result); },
    (err: Error) => {
      payload.status = 'failure';
      payload.result.push({ status: 'failure', result: err });
    },
    () => { console.log('finished, sending the stuff'); console.info(payload); res.send(JSON.stringify(payload)); }
  );
}
