import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import sendNotification from './custom-firebase/push-notification/individual-device';

/**
 * Sends Custom Message to a device
 * @param data {DirectMsg} data
 * @returns {Observable<any>}
 */
export function createStream (data: DirectMsg): Observable<any> {
  const customMessage: FirebaseMsg = {
    title: data.title,
    body: data.message,
  };
  const stream = Observable.fromPromise(sendNotification(<TokenType>data.type, data.token, customMessage))
    .flatMap(() => Observable.of({ status: 'success', msg: `message sent to token ${data.token}` }));
  return stream;
}

/**
 * Handles /api/direct-message
 * @param data {DirectMsg} data
 * @param req {Request} the Request
 * @param res {Response} the Response
 * @param next {Next} the Next
 */
export default function directMsgHandler (data: DirectMsg, req: Request, res: Response, next: NextFunction): void {
  let payload: Payload;

  createStream(data)
    .subscribe(
      (result: any) => { payload = { status: 'success', result }; },
      (err: Error) => { payload = { status: 'failure', result: err }; },
      () => { console.info(payload); res.send(JSON.stringify(payload)); }
    );
}
