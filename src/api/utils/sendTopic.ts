import { Observable } from 'rxjs/Rx';

import { sendMsgToTopic, sendMsgToTopics } from '../custom-firebase/push-notification/topic';

/**
 * Create an Observable for sending message to a topic
 * @param msg {FirebaseMsg} messages to be sent
 * @param topic {string} the topic name
 */
export function sendTopicStream(msg: FirebaseMsg, topic: string): Observable<any> {
  return Observable.fromPromise(sendMsgToTopic(msg, topic))
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


export function sendTopicsStream(msg: FirebaseMsg, topics: string[]): Observable<any> {
  console.info('creating send topics stream');
  console.info(topics);
  return Observable.fromPromise(sendMsgToTopics(msg, topics))
    .do((res: any) => {
      console.info(`[utils/sendTopicsStream]: send msg to topics ${topics}`);
    })
    .flatMap((res: any) => {
      console.log(res);
      if (res.error) { return Observable.throw('fail to send message'); }
      return Observable.of('message sent');
    })
    .do((res: any) => {
      console.info(`[utils/sendTopicsStream]: successfully sent msg to topics ${topics}`);
    });
}
