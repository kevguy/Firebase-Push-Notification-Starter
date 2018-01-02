import { Application, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt-nodejs';

export function signupUserHandler(req: Request, res: Response, next: NextFunction) {
  const user = new User({
    userId: req.body.userId,
    password: req.body.password
  });

  User.findOne({ userId: req.body.userId }, (err, existingUser) => {
    if (err) {
      res.send({ status: 'failure', msg: 'database error'});
    }
    if (existingUser) {
      res.send({ status: 'failure', msg: `Account with that userId ${req.body.userId} already exists.`});
      return;
    }
    user.save((err) => {
      if (err) { return next(err); }
      const token = jwt.sign({ id: user._id }, 'linkinpark', {
        expiresIn: 86400 // expires in 24 hours
      });
      res
        // .cookie('iceicebaby' , JSON.stringify({ userId: req.body.userId, authToken: token }))
        .send({ status: 'success', auth: true, token });
    });
  });
}

export function loginHandler(req: Request, res: Response, next: NextFunction) {
  User.findOne({ userId: req.body.userId }, (err: any, user: any) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    const token = jwt.sign({ id: user._id }, 'linkinpark', {
      expiresIn: 86400 // expires in 24 hours
    });
    res
      // .cookie('iceicebaby' , JSON.stringify({ userId: req.body.userId, authToken: token }))
      .status(200)
      .send({ auth: true, token: token });
  });
}

export function authHandler(req: Request, res: Response, next: NextFunction) {
  const token: string = <string>(req.headers['x-access-token']);
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, 'linkinpark', function(err: any, decoded: any) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    res.status(200).send({ auth: true, message: 'Authenticated with token!', decoded });
  });
}

export function checkUserHandler(userId: string, req: Request, res: Response, next: NextFunction) {
  User.findOne({ userId }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      res.send({ status: 'found', msg: 'Account with that user id already exists.'});
    } else {
      res.send({ status: 'not found', msg: 'Account with that user id is available.'});
    }
  });
}
