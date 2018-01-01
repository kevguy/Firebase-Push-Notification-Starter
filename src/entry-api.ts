import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';

import customMessage from './firebase-api/custom-message';
import directMessage from './firebase-api/direct-message';
import saveToken from './firebase-api/save-token';
import retrieveTokens from './firebase-api/retrieve-tokens';
import { queryDeviceGroup } from './firebase-api/device-group';
import * as User from './controllers/UserController';
import * as jwt from 'jsonwebtoken';

// verifyAuthToken
// -1 no token provided
// 1 ok
// -1 failed to authenticate token
export async function verifyAuthToken(req: Request) {
  const token: string = <string>(req.headers['x-access-token']);
  if (!token) return -1;

  const jwtPromise = new Promise((resolve, reject) => {
    jwt.verify(token, 'linkinpark', (err: any, decoded: any) => {
      if (err) resolve(-1);
      resolve(1);
    })
  });
};


export default function apiRoutes(app: Application): void {

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    // if (<string>(req.url).startsWith('/user/') || <string>(req.url).startsWith('/api/')) {
		if ((req.url.indexOf('/user/') >= 0 ||
			req.url.indexOf('/api/') >= 0) &&
			req.url.indexOf('/user/login') < 0 &&
			req.url.indexOf('/user/signup') < 0) {
      // verify token
      console.log('verifying token');
      const token: string = <string>(req.headers['x-access-token']);
      if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

      const result = await new Promise((resolve, reject) => {
        jwt.verify(token, 'linkinpark', function(err: any, decoded: any) {
          if (err) resolve(false);

          // res.status(200).send(decoded);
          // res.status(200).send({ auth: true, message: 'Authenticated with token.' });
          resolve(true);
        });
      });
      console.log('finishing verifying token');
      if (result) {
        next();
      } else {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
    } else {
      next();
    }
  });

  app.get('/api/device-group/:userId', (req: Request, res: Response, next: NextFunction) => {
    queryDeviceGroup(req.params.userId, req, res, next);
  });

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
    console.log('handling api/token');
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
