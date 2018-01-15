// https://firebase.google.com/docs/web/setup
// https://firebase.google.com/docs/cloud-messaging/js/topic-messaging
// https://firebase.googleblog.com/2016/08/sending-notifications-between-android.html

// https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
// https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native

import * as Firebase from 'firebase/app';
import 'firebase/messaging';
import { getAccessTokenPromise } from './utils';

import * as fetch from 'isomorphic-fetch';

const { performance } = require('perf_hooks');

function clock(start?: any): any {
  if ( !start ) return process.hrtime();
  let end: number[] = process.hrtime(start);
  return Math.round((end[0]*1000) + (end[1]/1000000));
}

class Benchmark {

    private start = process.hrtime();

    public elapsed(): number {
        const end = process.hrtime(this.start);
        return Math.round((end[0] * 1000) + (end[1] / 1000000));
    }
}

/**
 * Send web push notification to an individual user device
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
export async function sendWebNotification(token: string, msg: FirebaseMsg) {
  // const startTime = clock();
  // const benchmark = new Benchmark();
  const startTime = performance.now();
  const accessToken = await getAccessTokenPromise();
  // console.log(accessToken);
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
    // console.log(result);
    if (result.error) { throw new Error(result); }
  })
  .catch((err) => { console.error(err); });
  // const duration: number = clock(startTime);
  // const duration: number = benchmark.elapsed();
  const duration = performance.now() - startTime;
  console.log(duration);
  return {
    result,
    duration
  };
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
