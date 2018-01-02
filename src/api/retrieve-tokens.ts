import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import { setupDatabase } from './custom-firebase/database/utils';
import * as users from './custom-firebase/database/users';
import * as userGroups from './custom-firebase/database/userGroups';
import { getConfig } from './custom-firebase/index';
import * as Token from './database/controllers/TokenController';


// export default async function retrieveTokensHandler(userId: string,
//     req: Request, res: Response, next: NextFunction) {
//   let payload: Payload;
//
//   const database = setupDatabase(getConfig());
//   const result = await users.retrieveUser(database, userId);
//   payload = { status: 'success', result };
//   res.send(JSON.stringify(payload));
// }


export default function retrieveTokensHandler(userId: string,
    req: Request, res: Response, next: NextFunction) {

  console.log('retrieveTokensHandler');
  const payload: Payload = {
    status: 'success',
    result: ''
  };

  const stream = Token.findTokensStream(userId);

  stream.subscribe(
    (result: {}) => { payload.result = result; },
    (err: Error) => {
      payload.status = 'failure';
      payload.result = { status: 'failure', result: err };
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}
