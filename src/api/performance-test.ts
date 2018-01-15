import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs';

import { handler } from './utils';
import directMessageStream, { DirectMsg } from './utils/directMessage';

import * as fs from 'fs';

export declare interface DirectMsg {
  title: string;
  message: string;
  token: string;
  type: TokenType;
}

/**
 * Sends a direct message through a token
 * @param data {DirectMsg} data
 * @param req {Request} the Request
 * @param res {Response} the Response
 * @param next {Next} the Next
 */
export default function testPerformanceTest (data: DirectMsg, time: number, req: Request, res: Response, next: NextFunction): void {
  let streams = [];
  const performance: Array<any> = [];

  for (let i = 0; i < time; i++) {
    streams.push(directMessageStream(data));
  }

  const stream = Observable.merge(...streams);

  const payload: Payload = {
    status: 'success',
    result: ''
  };

  res.send(JSON.stringify({status: 'success', 'msg': 'started'}));
  console.log('performance test started');

  stream.subscribe(
    (result: any) => {
      console.info(`sent ${performance.length + 1}th message`);
      const prevTotal: number = performance.length >= 1 ? (performance[performance.length-1]).total : 0;
      const total: number = result.perf.duration + prevTotal;
      console.info(`took: ${result.perf.duration}, total: ${total}`);
      performance.push({
        duration: <number>result.perf.duration,
        total
      });
      payload.result = result;
    },
    (err: any) => {
      payload.status = 'failure';
      payload.result = err;
      // res.send(JSON.stringify(payload));
    },
    () => {
      let file = fs.createWriteStream('./mika.txt');
      file.on('error', function(err) { console.error(err); });
      performance.forEach((v: any, idx: number) => { file.write(`idx: ${idx}, duration: ${v.duration}, totel: ${v.total}\n`); });
      file.end();
      // res.send(JSON.stringify(payload));
    }
  );
}
