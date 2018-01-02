import { Application, Request, Response, NextFunction } from 'express';
import {
  queryDeviceGroupStream,
  queryTokenListFromDeviceGroupStream,
  checkTokenFromDeviceGroupStream,
  removeTokenFromDeviceGroupStream,
  addTokenToDeviceGroupStream } from '../controllers/DeviceGroupController';
import { saveTokenStream, queryTokenStream } from '../controllers/TokenController';
import { Observable, Observer } from 'rxjs/Rx';
import { createNotificationKeyStream } from './save-token';
import * as userGroups from './custom-firebase/database/userGroups';


export function queryDeviceGroup(
  userId: string,
  req: Request, res: Response, next: NextFunction): void {

  const payload: Payload = {
    status: 'success',
    result: []
  };

  const stream = queryDeviceGroupStream(userId);
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

export function queryTokenList(
  deviceGroup: string,
  req: Request, res: Response, next: NextFunction): void {

  const payload: Payload = {
    status: 'success',
    result: ''
  };

  const stream = queryTokenListFromDeviceGroupStream(deviceGroup);
  stream.subscribe(
    (result: {}) => { payload.result = result; },
    (err: Error) => {
      payload.status = 'failure';
      payload.result = { status: 'failure', result: err };
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}

export function checkToken() {

}

export function addToken() {

}

export function removeToken() {

}




export function changeLang(
  userId: string, token: string, targetLang: string,
  req: Request, res: Response, next: NextFunction): void {

  const langKey = targetLang === 'zh-hk' ? 'zh_hk' : 'en';
  const targetGroupName = userId + '_' + langKey;
  let originalGroupName: string;
  let tokenInfo: any;

  const payload: Payload = {
    status: 'success',
    result: ''
  };

  const stream = queryTokenStream(token)
    .flatMap((res: any) => {
      tokenInfo = res;
      return Observable.of(tokenInfo);
    })
    .flatMap((result) => queryDeviceGroupStream(userId))
    .flatMap((result: Array<string>) => {
      // find the device group the token belongs to
      console.log('in flat map');
      console.log(result);
      if (result.length > 0) {
        // for each deviceGroup
        const streams = result.map((deviceGroup) => checkTokenFromDeviceGroupStream(token, deviceGroup));
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
        return Observable.of('');
      }
    })
    .flatMap((result: string) => {
      if (result === '') {
        return Observable.throw('Original Device Group Not Found');
      } else {
        originalGroupName = result;
        return Observable.fromPromise(
          userGroups.removeToken({
            type: tokenInfo.type,
            lang: tokenInfo.lang,
            token,
            userId
          }))
          .flatMap((res: any) => {
            console.log('after removeToken');
            console.log(res);
            return removeTokenFromDeviceGroupStream({
              deviceGroup: result, userId, token
            })
          })
          .flatMap((res: any) => {
            console.log('after removeTokenFromDeviceGroupStream');
            console.log(res);
            const record: TokenRecord = {
              type: <TokenType>(tokenInfo.type),
              lang: <LangType>(targetLang),
              token,
              userId
            };

            const notificationKeyStream = createNotificationKeyStream(record);
            const _saveTokenStream = saveTokenStream(record);
            const _addTokenToDeviceGroupStream = addTokenToDeviceGroupStream({
              deviceGroup: targetGroupName, userId, token
            });

            return notificationKeyStream
              .flatMap((result: any) => Observable.merge(
                _saveTokenStream,
                _addTokenToDeviceGroupStream
              ));
          });
      }
    })
    .flatMap((result: any) => {
      console.log(result);
      return Observable.of({
        status: 'success',
        msg: `Device Group changed from ${originalGroupName} to ${targetGroupName}`
      });
    });
  stream.subscribe(
    (result: {}) => { payload.result = result; },
    (err: Error) => {
      payload.status = 'failure';
      payload.result = { status: 'failure', result: err };
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}
