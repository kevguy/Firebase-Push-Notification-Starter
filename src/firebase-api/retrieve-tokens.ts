import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import { setupDatabase } from './custom-firebase/database/utils';
import * as users from './custom-firebase/database/users';
import * as userGroups from './custom-firebase/database/userGroups';
import { getConfig } from './custom-firebase/index';


export default async function retrieveTokensHandler(userId: string,
    req: Request, res: Response, next: NextFunction) {
  let payload: Payload;

  const database = setupDatabase(getConfig());
  const result = await users.retrieveUser(database, userId);
  payload = { status: 'success', result };
  res.send(JSON.stringify(payload));
}
