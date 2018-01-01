import { Application, Request, Response, NextFunction } from 'express';
import { queryDeviceGroupStream } from '../controllers/DeviceGroupController';

export function queryDeviceGroup(
  userId: string,
  req: Request, res: Response, next: NextFunction): void {

  const payload: Payload = {
    status: 'success',
    result: []
  };

  const stream = queryDeviceGroupStream(userId);
  stream.subscribe(
    (result: {}) => { payload.result.push(result); },
    (err: Error) => {
      payload.status = 'failure';
      payload.result.push({ status: 'failure', result: err });
      res.send(JSON.stringify(payload));
    },
    () => { res.send(JSON.stringify(payload)); }
  );
}
