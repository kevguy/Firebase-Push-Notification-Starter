import { Observable } from 'rxjs/Rx';

import * as pushNotification from '../custom-firebase/push-notification/device-group';

/**
 * Create Observable for adding token to a the user's device group
 * and creating notification key for a user's group.
 * It doesn't matter a device group already exists or not,
 * notification key changes all the time
 * @param record {TokenRecord} user's token record
 * @returns {Observable} the Observable
 */
export function createNotificationKeyStream(record: TokenRecord) {
  return Observable
    .fromPromise(pushNotification.addToken(record))
    .do((result: any) => {
      console.info(`[notificationKey/createNotificationKeyStream]: created notification key (${result.notification_key})`)
    });
}

export function retrieveNotificationKeyStream(record: TokenRecord) {
  return Observable
    .fromPromise(pushNotification.retrieveNotificationKey(record))
    .do((result: any) => {
      console.info(`[notificationKey/retrieveNotificationKey]: retrieved notification key ${result}`)
    });
}
