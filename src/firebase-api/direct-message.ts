import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import sendNotification from './custom-firebase/push-notification/individual-device';

/**
 * Sends Custom Message to a device
 * @param req {Request} the Request
 * @param res {Response} the Response
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

export default function directMsgHandler (data: DirectMsg, req: Request, res: Response, next: NextFunction): void {
  // res.setHeader('Content-Type', 'application/json');
  let payload: Payload;

  createStream(data)
    .subscribe(
      (result: any) => { payload = { status: 'success', result }; },
      (err: Error) => { payload = { status: 'failure', result: err }; },
      () => { console.info(payload); res.send(JSON.stringify(payload)); }
    );
}
