import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';

import customMessage from './firebase-api/custom-message';
import directMessage from './firebase-api/direct-message';
import saveToken from './firebase-api/save-token';
import retrieveTokens from './firebase-api/retrieve-tokens';
// import checkUser from './firebase-api/check-user';
import * as User from './controllers/UserController';

// const handlers: Handlers = {
//   'direct-message': saveToken,
//   'custom-message': customMessage,
//   'token': saveToken,
//   'check-user': checkUser
// };

export default function apiRoutes(app: Application): void {
  /*
   * Handles /api/direct-message
   * sends custom message to a device
   */
  app.post('/api/direct-message', (req: Request, res: Response, next: NextFunction) => {
    const { title, message, token, type }: DirectMsg = req.body;
    const data: DirectMsg = { title, message, token, type };
    directMessage(data, req, res, next);
  });

  /*
   * Handles /api/custom-message
   * sends custom message to individual user member
   */
  app.post('/api/custom-message', (req: Request, res: Response, next: NextFunction) => {
    const { userId, title, message, lang }: CustomMsg = req.body;
    const data: CustomMsg = { userId, title, message, lang };
    customMessage(data, req, res, next);
  });

  /*
   * Handles /api/web-token
   * save web token and userId into Firebase
   */
  app.post('/api/token', (req: Request, res: Response, next: NextFunction) => {
    const { type, lang, token, userId }: TokenRecord = req.body;
    const data: TokenRecord = { type, lang, token, userId };
    saveToken(data, req, res, next);
  });

  app.get('/api/tokens/:userId', (req: Request, res: Response, next: NextFunction) => {
    retrieveTokens(req.params.userId, req, res, next);
  });


  /**
   * User-related API
   */
  app.post('/user/signup', (req: Request, res: Response, next: NextFunction) => {
    User.signupUserHandler(req, res, next);
  });

  app.get('/user/check/:userId', (req: Request, res: Response, next: NextFunction) => {
    User.checkUserHandler(req.params.userId, req, res, next);
  });

  app.post('/user/login', (req: Request, res: Response, next: NextFunction) => {
    User.loginHandler(req, res, next);
  });

  app.post('/user/auth', (req: Request, res: Response, next: NextFunction) => {
    User.authHandler(req, res, next);
  });
}
