import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';

import * as Token from './database/controllers/TokenController';
import * as utils from './utils';

import saveTokenStream from './utils/saveToken';

/**
 * Retrieve all the tokens associated to the user from MongoDB
 * @param userId {string} user's id
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function retrieveTokens(userId: string,
    req: Request, res: Response, next: NextFunction) {

  utils.handler(Token.findTokensStream(userId), req, res, next);
}

/**
 * Register tokens to Firebase's device group and
 * Saves token to MongoDb along with the device group it's associated to
 * @param record {TokenRecord} user's token record
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function saveToken(
    record: TokenRecord,
    req: Request, res: Response, next: NextFunction): void {

  utils.handler(saveTokenStream(record), req, res, next);
}

export default function tokenRoutes(app: Application) {
  app.post('/api/token', (req: Request, res: Response, next: NextFunction) => {
    saveToken(<TokenRecord>req.body, req, res, next);
  });

  app.get('/api/tokens/:userId', (req: Request, res: Response, next: NextFunction) => {
    retrieveTokens(req.params.userId, req, res, next);
  });
}
