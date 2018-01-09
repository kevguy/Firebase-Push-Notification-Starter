import { Observable } from 'rxjs/Rx';

import { sendMsgToTopic } from '../custom-firebase/push-notification/topic';

/**
 * Create an Observable for sending message to a topic
 * @param msg {FirebaseMsg} messages to be sent
 * @param topic {string} the topic name
 */
export default function sendTopicStream(msg: FirebaseMsg, topic: string): Observable<any> {
  return Observable.fromPromise(sendMsgToTopic(msg, 'test'))
    .do((res: any) => {
      console.info(`[utils/sendTopicStream]: send msg to topic ${topic}`);
    })
    .flatMap((res: any) => {
      if (res.error) { return Observable.throw('fail to send message'); }
      return Observable.of('message sent');
    })
    .do((res: any) => {
      console.info(`[utils/sendTopicStream]: successfully sent msg to topic ${topic}`);
    });
}
