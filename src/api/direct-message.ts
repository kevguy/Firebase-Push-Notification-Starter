import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import sendNotification from './custom-firebase/push-notification/individual-device';

declare interface DirectMsg {
  title: string;
  message: string;
  token: TokenType;
  type: string;
}

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
    .map(() => ({ status: 'success', msg: `message sent to token ${data.token}` }));
  return stream;
}

/**
 * Sends a direct message through a token
 * @param data {DirectMsg} data
 * @param req {Request} the Request
 * @param res {Response} the Response
 * @param next {Next} the Next
 */
export function directMsgHandler (data: DirectMsg, req: Request, res: Response, next: NextFunction): void {
  let payload: Payload;

  createStream(data)
    .subscribe(
      (result: any) => { payload = { status: 'success', result }; },
      (err: Error) => { payload = { status: 'failure', result: err }; },
      () => { console.info(payload); res.send(JSON.stringify(payload)); }
    );
}

export default function directMsgRoutes(app: Application) {
  app.post('/api/direct-message', (req: Request, res: Response, next: NextFunction) => {
    const { title, message, token, type }: DirectMsg = req.body;
    const data: DirectMsg = { title, message, token, type };
    directMsgHandler(data, req, res, next);
  });
}
