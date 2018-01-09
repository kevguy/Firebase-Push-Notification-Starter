import { Application, Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs/Rx';
import * as DeviceGroup from './database/controllers/DeviceGroupController';
import * as Token from './database/controllers/TokenController';
import * as pushNotification from './custom-firebase/push-notification/device-group';

import * as utils from './utils';
import sendCustomMsgStream, { CustomMsg } from './utils/sendDeviceGroup';

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

  utils.handler(DeviceGroup.queryDeviceGroupStream(userId), req, res, next);
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

  utils.handler(DeviceGroup.queryTokenListFromDeviceGroupStream(deviceGroup), req, res, next);
}

/**
 * Handles /api/custom-message
 * @param data {CustomMsg} data that contains userId, title, message, lang
 * @param req {Request} request
 * @param res {Response} response
 * @param next {Next} next
 */
export function customMsgHandler (data: CustomMsg, req: Request, res: Response, next: NextFunction): void {
  utils.handler(sendCustomMsgStream(data), req, res, next);
}

export default function deviceGroupRoutes(app: Application) {
  app.get('/api/device-group/groups/:userId',
    (req: Request, res: Response, next: NextFunction) => {
    queryDeviceGroup(req.params.userId, req, res, next);
  });

  app.get('/api/device-group/tokens/:userId/:lang', (req: Request, res: Response, next: NextFunction) => {
    const langKey = req.params.lang === 'zh-hk' ? 'zh_hk' : 'en';
    const deviceGroup = req.params.userId + '_' + langKey;
    queryTokenList(deviceGroup, req, res, next);
  });

  app.post('/api/custom-message',
    (req: Request, res: Response, next: NextFunction): void => {
    customMsgHandler(<CustomMsg>(req.body), req, res, next);
  });
}
