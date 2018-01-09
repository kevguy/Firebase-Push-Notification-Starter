import { Observable } from 'rxjs/Rx';

import * as pushNotification from '../custom-firebase/push-notification/device-group';
import { retrieveNotificationKeyStream } from './notificationKey';


export declare interface CustomMsg {
  userId: string;
  title: string;
  message: string;
  lang: LangType;
}

/**
 * Create Observable that sends a custom message to a device group
 * @param data {CustomMsg} data that contains userId, title, message, lang
 * @returns {Observable} the observable
 */
export default function sendCustomMsgStream(data: CustomMsg) {
  const customMessage: FirebaseMsg = {
    title: data.title,
    body: data.message
  };

  const record: Partial<TokenRecord> = {
    userId: data.userId,
    lang: data.lang
  };

  return retrieveNotificationKeyStream(<TokenRecord>record)
    .flatMap((notificationId: string) =>
      Observable.fromPromise(pushNotification.sendNotification(notificationId, customMessage)))
    .do((result: any) => {
      console.info(`[sendDeviceGroupStream]: sent message to ${data.userId} ${data.lang}`);
    })
    .map((result: any) => ({
      ...result,
      status: 'success'
    }));
}
