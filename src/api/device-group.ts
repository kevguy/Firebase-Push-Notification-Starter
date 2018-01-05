import { Application, Request, Response, NextFunction } from 'express';
import * as DeviceGroup from './database/controllers/DeviceGroupController';
import * as Token from './database/controllers/TokenController';
import { Observable, Observer } from 'rxjs/Rx';
import { createNotificationKeyStream } from './save-token';
import * as userGroups from './custom-firebase/database/userGroups';

/**
 * Handles /api/device-group/groups/:userId
 * @param userId {string} User ID
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function queryDeviceGroup(
  userId: string,
  req: Request, res: Response, next: NextFunction): void {

  const payload: Payload = {
    status: 'success',
    result: []
  };

  const stream = DeviceGroup.queryDeviceGroupStream(userId);
  stream.subscribe(
    (result: {}) => { payload.result = result; },
    (err: Error) => {
      payload.result = { status: 'failure', result: err };
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}

/**
 * Handles /api/device-group/tokens/:userId/:lang
 * @param deviceGroup {string} the device group name
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function queryTokenList(
  deviceGroup: string,
  req: Request, res: Response, next: NextFunction): void {

  const payload: Payload = {
    status: 'success',
    result: ''
  };

  const stream = DeviceGroup.queryTokenListFromDeviceGroupStream(deviceGroup);
  stream.subscribe(
    (result: {}) => { payload.result = result; },
    (err: Error) => {
      payload.status = 'failure';
      payload.result = err;
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}
