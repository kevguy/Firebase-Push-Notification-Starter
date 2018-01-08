import { Application, Request, Response, NextFunction } from 'express';
import DeviceGroup from '../models/DeviceGroup';
import { Observable, Observer } from 'rxjs/Rx';
import { queryTokenStream } from './TokenController';

export function queryDeviceGroupStream(userId: string) {
  return Observable.create((observer: Observer<any>) => {
    DeviceGroup.find({ userId }, (err, result) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
      const itemsToBeSent = result.map((item) => ((<any>item).deviceGroup));
      observer.next(itemsToBeSent);
      observer.complete();
    });
  });
}

export function queryTokenListFromDeviceGroupStream(deviceGroup: string) {
  return Observable.create((observer: Observer<any>) => {
    DeviceGroup.findOne({ deviceGroup }, (err, result) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
      if (result) {
        observer.next((<any>result).tokens);
      } else {
        observer.next([]);
      }
      observer.complete();
    });
  })
  .flatMap((result) => {
    if (result) {
      const streams = result.map((item) => queryTokenStream(item));
      return Observable.merge(...streams).reduce((acc: Array<any>, curr) => [...acc, curr], []);
    }
    return Observable.of([]);
  });
}

export function checkTokenFromDeviceGroupStream(token: string, deviceGroup: string) {
  // query token list from device group, then verify if token exists
  const stream = queryTokenListFromDeviceGroupStream(deviceGroup)
    .flatMap((result: Array<string>) => {
      console.log('in checkTokenFromDeviceGroupStream flatmap');
      console.log(result);

      if (result.length > 0) {
        const arr = result.map((item: any) => item.token);
        if (arr.indexOf(token) >= 0) {
          return Observable.of({
            deviceGroup,
            found: true
          });
        } else {
          return Observable.of({
            deviceGroup,
            found: false
          });
        }
      } else {
        return Observable.of({
          deviceGroup,
          found: false
        });
      }
    });
  return stream;
}

export function addTokenToDeviceGroupStream(data: DeviceGroupRecord) {
  return Observable.create((observer: Observer<any>) => {
    DeviceGroup.findOne({ deviceGroup: data.deviceGroup }, (err, existingGroup) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
      let deviceGroupData: any;
      if (existingGroup) {
        // https://stackoverflow.com/questions/31775150/node-js-mongodb-the-immutable-field-id-was-found-to-have-been-altered
        const newTokensArr = [...(<any>existingGroup).tokens, data.token]
          .reduce((a,b) => {
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
          },[]);

        deviceGroupData = {
          deviceGroup: (<any>existingGroup).deviceGroup,
          userId: (<any>existingGroup).userId,
          tokens: newTokensArr
        };
      } else {
        deviceGroupData = {
          deviceGroup: data.deviceGroup,
          userId: data.userId,
          tokens: [data.token]
        };
      }
      DeviceGroup.findOneAndUpdate({ deviceGroup: data.deviceGroup }, deviceGroupData,
          { upsert: true, new: true }, (err, existingGroup) => {
        if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
        observer.next({ status: 'success', msg: `token saved to device group ${data.deviceGroup}`, result: existingGroup });
        observer.complete();
      })
    });
  });
}

export function removeTokenFromDeviceGroupStream(data: DeviceGroupRecord) {
  return Observable.create((observer: Observer<any>) => {
    DeviceGroup.findOne({ deviceGroup: data.deviceGroup }, (err, existingGroup) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
      if (!existingGroup) {
        observer.error({ status: 'failure', msg: 'record not found' });
      }

      let deviceGroupData: any;
      if ((<any>existingGroup).tokens.length === 1) {
        // delete the record
        DeviceGroup.remove({ deviceGroup: data.deviceGroup }, (err) => {
          if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
          observer.next({ status: 'success', msg: `token deleted from device group ${data.deviceGroup}` });
          observer.complete();
        });
      } else {
        deviceGroupData =  {
          deviceGroup: (<any>existingGroup).deviceGroup,
          userId: (<any>existingGroup).userId,
          tokens: (<any>existingGroup).tokens.filter((item) => (item !== data.token))
        };
        DeviceGroup.findOneAndUpdate(
            { deviceGroup: data.deviceGroup },
            deviceGroupData,
            { upsert: true, new: true }, (err, existingGroup) => {
          if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
          observer.next({ status: 'success', msg: `token deleted from device group ${data.deviceGroup}` });
          observer.complete();
        });
      }
    });
  });
}
