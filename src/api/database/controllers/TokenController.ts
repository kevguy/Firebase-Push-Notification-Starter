import { Application, Request, Response, NextFunction } from 'express';
import Token from '../models/Token';
import { Observable, Observer } from 'rxjs/Rx';

export function saveTokenStream(data: TokenRecord) {
  // const token = new Token({
  //   userId: data.userId,
  //   token: data.token,
  //   lang: data.lang,
  //   type: data.type
  // });

  // The upsert = true option creates the object if it doesn't exist. defaults to false.
  // https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
  const stream  = Observable.create((observer: Observer<any>) => {
    Token.findOneAndUpdate({ token: data.token } , data, { upsert: true, new: true }, (err, existingToken) => {
      if (err) { console.log(err); observer.error({ status: 'failure', msg: 'database error' }); }
      observer.next({ status: 'success', msg: 'token saved', result: existingToken });
      observer.complete();
    });
  });
  return stream;
};

export function queryTokenStream(token: string) {
  const stream = Observable.create((observer: Observer<any>) => {
    Token.findOne({ token }, (err, result) => {
      if (err) { console.log(err); observer.error({ status: 'failure', msg: 'database error' }); }
      observer.next(result);
      observer.complete();
    });
  });
  return stream;
}

export function findTokensStream(userId: string) {
  const stream = Observable.create((observer: Observer<any>) => {
    Token.find({ userId }, (err, records) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error' }); }
      if (records) {
        observer.next(records);
      } else {
        observer.next([]);
      }
      observer.complete();
    });
  });
  return stream;
}

export function changeLangStream(data: TokenRecord) {
  return saveTokenStream(data);
}
