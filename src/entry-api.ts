import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';

import changeLang from './api/change-lang';
import * as User from './api/database/controllers/UserController';

import * as jwt from 'jsonwebtoken';
import deviceGroupRoutes from './api/device-group';
import directMsgRoutes from './api/direct-message';
import topicRoutes from './api/topic-op';
import tokenRoutes from './api/token-op';

import performanceTest from './api/performance-test';

// verifyAuthToken
// -1 no token provided
// 1 ok
// -1 failed to authenticate token
export async function verifyAuthToken(req: Request) {
  const token: string = <string>(req.headers['x-access-token']);
  if (!token) return -1;

  const jwtPromise = new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
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
        jwt.verify(token, process.env.JWT_SECRET, function(err: any, decoded: any) {
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


  // Device-Group-related API
  deviceGroupRoutes(app);

  /*
   * Handles /api/device-group/change-lang
   * changes chosen language of a language to another
   */
  app.post('/api/device-group/change-lang', (req: Request, res: Response, next: NextFunction) => {
    changeLang(req, res, next);
  });

  // Direct-Message-related API
  directMsgRoutes(app);

  // Topic-related API
  topicRoutes(app);

  // Token-related API
  tokenRoutes(app);

  app.get('/performance-test/:time', (req: Request, res: Response, next: NextFunction) => {
    // const msg: FirebaseMsg = {
    //   title: 'Test',
    //   body: 'Message'
    // };

    const tmp = {
      title: 'Test',
      message: 'Message',
      token: 'fBFtm56fJoY:APA91bEwS3k9R0y30QoosOyPuugzr0ee-OihYE3-N9p1TL-K4aX3r4WQdD2oMAu2wDqGQIWfWYOomZ3Ad4ChbGAupfhREH42erfvAuOgOWmNaJxg0XH6W6ZDOMJZnaR_CEG9jTaxofJQ',
      type: <TokenType>'web'
    };

    performanceTest(tmp, parseInt(req.params.time), req, res, next);
  });

  /********************
   * User-related API *
   ********************/
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
