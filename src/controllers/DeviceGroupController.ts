import { Application, Request, Response, NextFunction } from 'express';
import DeviceGroup from '../models/DeviceGroup';
import { Observable, Observer } from 'rxjs/Rx';
import { queryTokenStream } from './TokenController';

export function queryDeviceGroupStream(userId: string) {
  const stream = Observable.create((observer: Observer<any>) => {
    DeviceGroup.find({ userId }, (err, result) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
      const itemsToBeSent = result.map((item) => ((<any>item).deviceGroup));
      observer.next(itemsToBeSent);
      observer.complete();
      console.log(result);
    });
  });
  return stream;
}

export function queryTokenListFromDeviceGroupStream(deviceGroup: string) {
  const tokenResult = [];
  const stream = Observable.create((observer: Observer<any>) => {
    DeviceGroup.findOne({ deviceGroup }, (err, result) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
      observer.next((<any>result).tokens);
      observer.complete();
    });
  })
  .flatMap((result) => {
    if (result) {
      const streams = result.map((item) => queryTokenStream(item));
      return Observable.merge(...streams)
        .reduce((acc: Array<any>, curr) => [...acc, curr], []);
    } else {
      return Observable.of([]);
    }
  });
  return stream;
}

export function addTokenToDeviceGroupStream(data: DeviceGroupRecord) {
  const stream = Observable.create((observer: Observer<any>) => {
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
      DeviceGroup.findOneAndUpdate(
          { deviceGroup: data.deviceGroup },
          deviceGroupData,
          { upsert: true, new: true }, (err, existingGroup) => {
        if (err) { observer.error({ status: 'failure', msg: 'database error', err }); }
        observer.next({ status: 'success', msg: `token saved to device group ${data.deviceGroup}`, result: existingGroup });
        observer.complete();
      })
    });
  });
  return stream;
}

export function removeTokenFromDeviceGroupStream(data: DeviceGroupRecord) {
  const stream = Observable.create((observer: Observer<any>) => {
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
        })
      }
    });
  });
  return stream;
}
