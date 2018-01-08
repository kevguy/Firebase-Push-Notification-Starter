import { Application, Request, Response, NextFunction } from 'express';
import * as DeviceGroup from './database/controllers/DeviceGroupController';
import * as Token from './database/controllers/TokenController';
import { Observable, Observer } from 'rxjs/Rx';
import { createNotificationKeyStream } from './token-op';
// import * as userGroups from './custom-firebase/database/userGroups';
import * as pushNotification from './custom-firebase/push-notification/device-group';
import { subscribeTokenToTopic, unsubscribeFromTopic } from './custom-firebase/push-notification/topic';

import * as utils from './utils';

/**
 * Adds token from device group and in MongoDB
 * @param record {TokenRecord} the token record
 * @returns {Observable<any>} the observable
 */
export function addTokenStream(record: TokenRecord): Observable<any> {
  const langKey = record.lang === 'zh-hk' ? 'zh_hk' : 'en';
  const deviceGroupName = record.userId + '_' + langKey;

  const notificationKeyStream = createNotificationKeyStream(record);
  const _saveTokenStream = Token.saveTokenStream(record);
  const _addTokenToDeviceGroupStream = DeviceGroup.addTokenToDeviceGroupStream({
    deviceGroup: deviceGroupName,
    userId: record.userId,
    token: record.token
  });

  return notificationKeyStream
    .flatMap((result: any) => (_saveTokenStream))
    .flatMap((result: any) => (_addTokenToDeviceGroupStream));
}

/**
 * Removes token from device group and in MongoDB
 * @param record {TokenRecord} the token record
 * @returns {Observable<any>} the observable
 */
export function removeTokenStream(record: TokenRecord) {
  const langKey = record.lang === 'zh-hk' ? 'zh_hk' : 'en';
  const deviceGroupName = record.userId + '_' + langKey;

  return Observable
    .fromPromise(pushNotification.removeToken(record))
    .flatMap((res: any) => {
      console.log('\n\n\n\n');
      console.log('after removeToken');
      console.log(res);
      return DeviceGroup.removeTokenFromDeviceGroupStream({
        deviceGroup: deviceGroupName,
        userId: record.userId,
        token: record.token
      });
    });
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

  const newLangKey = targetLang === 'zh-hk' ? 'zh_hk' : 'en';

  const langKey = targetLang === 'zh-hk' ? 'zh_hk' : 'en';
  const targetGroupName = userId + '_' + langKey;
  const targetTopicName = 'broadcast__' + langKey;
  let originalGroupName: string;
  let tokenInfo: any;

  const payload: Payload = {
    status: 'success',
    result: ''
  };

  const stream = Token.queryTokenStream(token)
    .flatMap((res: any) => {
      tokenInfo = res;
      return Observable.of(tokenInfo);
    })
    .flatMap((result) => DeviceGroup.queryDeviceGroupStream(userId))
    .flatMap((result: Array<string>) => {
      // find the device group the token belongs to
      if (result.length > 0) {
        // for each deviceGroup
        const streams = result.map((deviceGroup) => DeviceGroup.checkTokenFromDeviceGroupStream(token, deviceGroup));
        const stream = Observable.merge(...streams)
          .filter((result: any) => {
            console.log(result);
            return result.found
          })
          // supposedly only one device group has that token
          .reduce((acc, curr: any) => {
            if (curr.found) return curr.deviceGroup;
            return acc;
          }, '');
        return stream;
      } else {
        return Observable.throw('Original Device Group Not Found');
      }
    })
    .flatMap((result: string) => {
      originalGroupName = result;
      return removeTokenStream({
        type: <TokenType>(tokenInfo.type),
        token,
        userId,
        lang: <LangType>(tokenInfo.lang)
      });
    })
    .flatMap((result: any) => addTokenStream({
      type: <TokenType>(tokenInfo.type),
      token,
      userId,
      lang: <LangType>(targetLang)
    }))
    .flatMap((result: any) => {
      const langKey = utils.getLangKey(tokenInfo.lang);      
      console.log(`unsubscribing token from ${'broadcast__' + langKey}`);
      return Observable.fromPromise(unsubscribeFromTopic(
        tokenInfo.token, 'broadcast__' + langKey));
    })
    .flatMap((result: any) => {
      console.log(`subscribing token to ${targetTopicName}`);
      return Observable.fromPromise(subscribeTokenToTopic(
        tokenInfo.token, targetTopicName));
    })
    .flatMap((result: any) => {
      // update token info
      console.log('token info');
      console.log(tokenInfo);
      return Token.saveTokenStream({
        type: tokenInfo.type,
        lang: targetLang,
        token: tokenInfo.token,
        userId: tokenInfo.userId
      });
    })
    .flatMap((result: any) => {
      return Observable.of({
        status: 'success',
        msg: `Device Group changed from ${originalGroupName} to ${targetGroupName}`
      });
    });
  stream.subscribe(
    (result: {}) => {
      payload.result = result;
    },
    (err: Error) => {
      payload.status = 'failure';
      payload.result = { status: 'failure', result: err };
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}
