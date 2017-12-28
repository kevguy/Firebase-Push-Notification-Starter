// https://firebase.google.com/docs/web/setup
// https://firebase.google.com/docs/cloud-messaging/js/topic-messaging
// https://firebase.googleblog.com/2016/08/sending-notifications-between-android.html

// https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
// https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native

import * as Firebase from 'firebase/app';
import 'firebase/messaging';
import { getAccessTokenPromise } from './utils';

import * as fetch from 'isomorphic-fetch';

/**
 * Send web push notification to an individual user device
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
export async function sendWebNotification(token: string, msg: FirebaseMsg) {
  const accessToken = await getAccessTokenPromise();
  console.log(accessToken);
  const result = fetch(process.env.FIREBASE_PUSH_NOTIFICATION_WEB, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }),
    body: JSON.stringify({
      message: {
        token : token,
        notification : msg
      }
    })
  })
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
    if (result.error) { throw new Error(result); }
  })
  .catch((err) => { console.error(err); });
  return result;
}

/**
 * Send Android push notification to an individual user device
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
export async function sendAndroidNotification(token: string, msg: FirebaseMsg) {
  // TODO:
  return 'foo';
}

/**
 * Send iOS push notification to an individual user device
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
export async function sendIOSNotification(token: string, msg: FirebaseMsg) {
  // TODO:
  return 'foo';
}

/**
 * Send push notification to an individual user device
 * @param type {TokenType} the type of the token according to platform
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
export default async function sendNotification(type: TokenType, token: string, msg: FirebaseMsg): Promise<any> {
  switch (type) {
    case 'web':
      return await sendWebNotification(token, msg);
    case 'android':
      return await sendAndroidNotification(token, msg);
    case 'ios':
      return await sendIOSNotification(token, msg);
  }
}
