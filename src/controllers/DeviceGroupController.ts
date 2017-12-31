import { Application, Request, Response, NextFunction } from 'express';
import DeviceGroup from '../models/DeviceGroup';
import { Observable, Observer } from 'rxjs/Rx';

export function addTokenToDeviceGroupStream(data: DeviceGroupRecord) {
  const stream = Observable.create((observer: Observer<any>) => {
    DeviceGroup.findOne({ deviceGroup: data.deviceGroup }, (err, existingGroup) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error' }); }
      let deviceGroupData: any;
      if (existingGroup) {
        // https://stackoverflow.com/questions/31775150/node-js-mongodb-the-immutable-field-id-was-found-to-have-been-altered
        deviceGroupData = {
          deviceGroup: (<any>existingGroup).deviceGroup,
          userId: (<any>existingGroup).userId,
          tokens: [...(<any>existingGroup).tokens, data.token]
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
        if (err) { console.log(err); observer.error({ status: 'failure', msg: 'database error' }); }
        observer.next({ status: 'success', msg: `token saved to device group ${data.deviceGroup}`, result: existingGroup });
        observer.complete();
      })
    });
  });
  return stream;
}

export function removeTokenFromDeviceGroupStream() {

}
