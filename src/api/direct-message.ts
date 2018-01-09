import { Application, Request, Response, NextFunction } from 'express';

import { handler } from './utils';
import directMessageStream, { DirectMsg } from './utils/directMessage';

/**
 * Sends a direct message through a token
 * @param data {DirectMsg} data
 * @param req {Request} the Request
 * @param res {Response} the Response
 * @param next {Next} the Next
 */
export function directMsgHandler (data: DirectMsg, req: Request, res: Response, next: NextFunction): void {
  const stream = directMessageStream(data)
  handler(stream, req, res, next);
}

export default function directMsgRoutes(app: Application) {
  app.post('/api/direct-message', (req: Request, res: Response, next: NextFunction) => {
    directMsgHandler(<DirectMsg>req.body, req, res, next);
  });
}
