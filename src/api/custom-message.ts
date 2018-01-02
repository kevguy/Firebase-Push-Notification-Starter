import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import * as userGroups from './custom-firebase/database/userGroups';
import sendNotification from './custom-firebase/push-notification/device-group';

/**
 * Create Observable that sends a custom message to a device group
 * @param data {CustomMsg} data that contains userId, title, message, lang
 * @returns {Observable} the observable
 */
export function createSendCustomMsgToDeviceGroupStream (data: CustomMsg): Observable<any> {
  const customMessage: FirebaseMsg = {
    title: data.title,
    body: data.message
  };
  const record: Partial<TokenRecord> = {
    userId: data.userId,
    lang: data.lang
  };
  const stream = Observable.fromPromise(userGroups.retrieveNotificationKey(record))
    .flatMap((notifitcationId: string) =>
      Observable.fromPromise(sendNotification(notifitcationId, customMessage)))
    .flatMap((result: any) => Observable.of({ ...result, status: 'success' }));
  return stream;
}

/**
 * Handles /api/custom-message
 * @param data {CustomMsg} data that contains userId, title, message, lang
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export default function customMsgHandler (data: CustomMsg, req: Request, res: Response, next: NextFunction): void {
  let payload: Payload;

  createSendCustomMsgToDeviceGroupStream(data)
    .subscribe(
      (result: {}) => { payload = { status: 'success', result }; },
      (err: Error) => {
        payload = { status: 'failure', result: err };
        res.send(JSON.stringify(payload));
      },
      () => { res.send(JSON.stringify(payload)); }
    );
}
