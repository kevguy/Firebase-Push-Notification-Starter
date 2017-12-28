import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import { setupDatabase } from './custom-firebase/database/utils';
import * as users from './custom-firebase/database/users';
import * as userGroups from './custom-firebase/database/userGroups';
import { getConfig } from './custom-firebase/index';
import sendNotification from './custom-firebase/push-notification/device-group';

export function createSendCustomMsgToDeviceGroupStream (data: CustomMsg): Observable<any> {
  const database = setupDatabase(getConfig());
  const customMessage: any = {
    title: data.title,
    body: data.message
  };
  const record: Partial<TokenRecord> = {
    userId: data.userId,
    lang: data.lang
  };
  const stream = Observable.fromPromise(userGroups.retrieveNotificationKey(record))
    .flatMap((result: string) => {
      console.info(`found notification id: ${result}`);
      return Observable.fromPromise(sendNotification(result, customMessage));
    })
    .flatMap((result: any) => Observable.of({ ...result, status: 'success' }));
  return stream;
}


export default function customMsgHandler (data: CustomMsg, req: Request, res: Response, next: NextFunction): void {
  // res.setHeader('Content-Type', 'application/json');
  let payload: Payload;

  // createSendCustomMsgToDeviceStream(data)
  createSendCustomMsgToDeviceGroupStream(data)
    .subscribe(
      (result: {}) => { payload = { status: 'success', result }; },
      (err: Error) => { payload = { status: 'failure', result: err }; },
      () => { console.info(payload); res.send(JSON.stringify(payload)); }
    );
}
