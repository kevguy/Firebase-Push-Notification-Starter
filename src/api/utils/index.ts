import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';

const LangMap: {} = {
  'zh-hk': 'zh_hk',
  'en': 'en'
}

export function getLangKey(lang: LangType): string {
  return LangMap[lang];
}

export function getDeviceGroupName(userId: string, lang: LangType): string {
  return userId + '_' + getLangKey(lang);
}

export function getBroadcastTopicName(lang: LangType): string {
  return 'broadcast' + '__' + getLangKey(lang);
}

/**
 * Handles the Observable given and sends appropriate response
 * the message will be in device's chosen language
 * @param stream {Observable<any>} the Observable
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function handler(
  stream: Observable<any>,
  req: Request, res: Response, next: NextFunction): void {

  const payload: Payload = {
    status: 'success',
    result: ''
  };

  stream.subscribe(
    (result: {}) => { payload.result = result; },
    (err: any) => {
      payload.status = 'failure';
      payload.result = err;
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}
