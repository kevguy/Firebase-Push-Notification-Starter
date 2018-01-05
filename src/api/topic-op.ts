import { Application, Request, Response, NextFunction } from 'express';
import * as topics from './custom-firebase/push-notification/topic';
import { Observable } from 'rxjs/Rx';

export function sendMsg(
    data: TopicMsg,
    req: Request, res: Response, next: NextFunction): void {

  const { topic, msg }: TopicMsg = data;
  const payload: Payload = {
    status: 'success',
    result: ''
  };

  const stream = Observable.fromPromise(topics.sendMsgToTopic(msg, topic))
    .flatMap((res: any) => {
      if (res.error) {
        return Observable.throw('fail to send message');
      }
      return Observable.of('message sent');
    });

  stream.subscribe(
    (result: {}) => { payload.result = result; },
    (err: Error) => {
      payload.status = 'failure';
      payload.result.push({ status: 'failure', result: err });
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}

export function sendBroadcastMsg(data: BroadcastMsg, req: Request, res: Response, next: NextFunction): void {

  const payload: Payload = {
    status: 'success',
    result: ''
  };

  const { lang, msg }: BroadcastMsg = data;
  const langKey = lang === 'zh-hk' ? 'zh_hk' : 'en';

  const stream =  Observable.fromPromise(topics.sendMsgToTopic(msg, `broadcast__${langKey}`))
    .flatMap((res: any) => {
      if (res.error) {
        return Observable.throw('fail to send message');
      }
      return Observable.of('message sent');
    });

  stream.subscribe(
    (result: {}) => { payload.result = result; },
    (err: Error) => {
      payload.status = 'failure';
      payload.result.push({ status: 'failure', result: err });
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}

export function sendWelcomeMsg(req: Request, res: Response, next: NextFunction): void {
  const payload: Payload = {
    status: 'success',
    result: ''
  };

  const topicKeys: Array<TopicMsg> = [
    {topic: 'broadcast__en', msg: { title: 'Welcome', body: 'Welcome to Ice Ice Baby' } },
    {topic: 'broadcast__zh_hk', msg: { title: '你好', body: '歡迎加入Ice Ice Baby' } }
  ];
  const streams = topicKeys.map((data) => {
    const { topic, msg }: TopicMsg = data;
    return Observable.fromPromise(topics.sendMsgToTopic(msg, topic))
      .flatMap((res: any) => {
        if (res.error) {
          return Observable.throw('fail to send message');
        }
        return Observable.of('message sent');
      })
  });

  const stream = Observable.merge(...streams)
    .reduce((acc: string, curr: string) => { return acc + curr }, '');
    stream.subscribe(
      (result: {}) => { payload.result = result; },
      (err: Error) => {
        payload.status = 'failure';
        payload.result.push({ status: 'failure', result: err });
        res.send(JSON.stringify(payload));
      },
      () => { res.send(JSON.stringify(payload)); }
    );
}

export function subscribeToTopic() {

}

export function unsubscribeFromTopic() {

}
