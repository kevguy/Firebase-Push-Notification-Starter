import { Observable } from 'rxjs/Rx';

import sendNotification from '../custom-firebase/push-notification/individual-device';

export declare interface DirectMsg {
  title: string;
  message: string;
  token: TokenType;
  type: string;
}

export default function directMessageStream (data: DirectMsg): Observable<any> {
  const customMessage: FirebaseMsg = {
    title: data.title,
    body: data.message,
  };
  const stream = Observable.fromPromise(sendNotification(<TokenType>data.type, data.token, customMessage))
    .map(() => ({ status: 'success', msg: `message sent to token ${data.token}` }));
  return stream;
}
