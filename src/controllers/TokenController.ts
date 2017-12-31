import { Application, Request, Response, NextFunction } from 'express';
import Token from '../models/Token';
import { Observable, Observer } from 'rxjs/Rx';

export function saveTokenStream(data: TokenRecord) {
  const token = new Token({
    userId: data.userId,
    token: data.token,
    lang: data.lang,
    type: data.type
  });

  console.log(data);

  // The upsert = true option creates the object if it doesn't exist. defaults to false.
  // https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
  const stream  = Observable.create((observer: Observer<any>) => {
    Token.findOneAndUpdate({ token: data.token } , token, { upsert: true, new: true }, (err, existingToken) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error' }); }
      observer.next({ status: 'success', msg: 'token saved', result: existingToken });
    });
  });
  return stream;
};

export function findTokensStream(userId: string) {
  const stream = Observable.create((observer: Observer<any>) => {
    Token.find({ userId }, (err, records) => {
      if (err) { observer.error({ status: 'failure', msg: 'database error' }); }
      observer.next({ status: 'success', msg: `data retrieved`, result: records });
    });
  });
  return stream;
}

export function changeLangStream(data: TokenRecord) {
  return saveTokenStream(data);
}

// export function deleteUserStream(userId: string) {
//   const stream = Observable.create((observer: Observer) => {
//     Token.find({ userId }).remove((err) => {
//       if (err) { observer.error({ status: 'failure', msg: 'database error' }); }
//       observer.next({ status: 'success', msg: `data associated with ${userId} is deleted` });
//     });
//   });
//   return stream;
// }
