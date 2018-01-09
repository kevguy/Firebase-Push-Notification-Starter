import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';

import * as utils from './utils';
import sendTopicStream from './utils/sendTopic';

declare interface TopicMsg {
  topic: string,
  msg: FirebaseMsg
}

declare interface BroadcastMsg {
  lang: string,
  msg: FirebaseMsg
}

/**
 * Send a message to a specific topic,
 * @param data {TopicMsg} messages to be sent and topic name
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function sendTopicMsg(
  data: TopicMsg,
  req: Request, res: Response, next: NextFunction): void {
  utils.handler(sendTopicStream(data.msg, data.topic), req, res, next);
}

/**
 * Send a broadcast message to every device via the `broadcast_XXX` topic,
 * the message will be in device's chosen language
 * @param data {BroadcastMsg[]} messages to be sent
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function sendBroadcastMsg(
  data: BroadcastMsg[],
  req: Request, res: Response, next: NextFunction): void {

  const streams = data.map((item) => ({
    topic: utils.getBroadcastTopicName(<LangType>item.lang),
    msg: item.msg
  }))
  .map((data: TopicMsg) => sendTopicStream(data.msg, data.topic));

  const stream = Observable.merge(...streams)
    .reduce((acc: string, curr: string) => { return acc + curr }, '');

  utils.handler(stream, req, res, next);
}

/**
 * Send a welcome message to every device via the `broadcast_XXX` topic,
 * the welcome message will be in device's chosen language
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function sendWelcomeMsg(req: Request, res: Response, next: NextFunction): void {
  const topicKeys: Array<BroadcastMsg> = [
    {lang: 'en', msg: { title: 'Welcome', body: 'Welcome to Ice Ice Baby' } },
    {lang: 'zh-hk', msg: { title: '你好', body: '歡迎加入Ice Ice Baby' } }
  ];
  sendBroadcastMsg(topicKeys, req, res, next);
}

/**
 * Send a custom message to the `test` topic, every device will receive the message
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function sendTestMessage(req: Request, res: Response, next: NextFunction): void {
  const msg: FirebaseMsg = req.body;
  utils.handler(sendTopicStream(msg, 'test'), req, res, next);
}

export function subscribeToTopic() {

}

export function unsubscribeFromTopic() {

}

export default function topicRoutes(app: Application): void {
  app.post('/api/topic-message',
    (req: Request, res: Response, next: NextFunction): void => {
    sendTopicMsg(<TopicMsg>req.body, req, res, next);
  });

  app.post('/api/broadcast-message',
    (req: Request, res: Response, next: NextFunction): void => {
    sendBroadcastMsg(<Array<BroadcastMsg>>req.body, req, res, next);
  });

  app.post('/api/welcome-message',
    (req: Request, res: Response, next: NextFunction): void => {
    sendWelcomeMsg(req, res, next);
  });

  app.post('/api/test-message',
    (req: Request, res: Response, next: NextFunction): void => {
    sendTestMessage(req, res, next);
  });
}
