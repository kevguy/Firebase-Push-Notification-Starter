import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import { setupDatabase } from './custom-firebase/database/utils';
import * as users from './custom-firebase/database/users';
import * as userGroups from './custom-firebase/database/userGroups';
import { getConfig } from './custom-firebase/index';
import * as MongoToken from '../controllers/TokenController';
import * as MongoDeviceGroup from '../controllers/DeviceGroupController';

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

/**
 * Saves token to MongoDb alons with the device group it's associated to
 */
export default function saveToken(
    record: TokenRecord,
    req: Request, res: Response, next: NextFunction): void {
  const { userId, token, lang }: Partial<TokenRecord> = record;
  const payload: Payload = {
    status: 'success',
    result: []
  };

  const langKey = record.lang === 'zh-hk' ? 'zh_hk' : 'en';
  const deviceGroupName = record.userId + '_' + langKey;

  const notificationKeyStream = createNotificationKeyStream(record);
  const saveTokenStream = MongoToken.saveTokenStream(record);
  const addTokenToDeviceGroupStream = MongoDeviceGroup.addTokenToDeviceGroupStream({
    deviceGroup: deviceGroupName,
    userId: record.userId,
    token: record.token
  });

  const stream = notificationKeyStream
    .flatMap((result: any) => Observable.merge(
      saveTokenStream,
      addTokenToDeviceGroupStream
    ));

  stream.subscribe(
    (result: {}) => { payload.result.push(result); },
    (err: Error) => {
      payload.status = 'failure';
      payload.result.push({ status: 'failure', result: err });
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}
