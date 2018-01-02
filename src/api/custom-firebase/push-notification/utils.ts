// https://firebase.google.com/docs/web/setup
// https://firebase.google.com/docs/cloud-messaging/js/topic-messaging
// https://firebase.googleblog.com/2016/08/sending-notifications-between-android.html

// https://stackoverflow.com/questions/38156239/how-to-set-the-content-type-of-request-header-when-using-fetch-api
// https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native

import * as Firebase from 'firebase/app';
import 'firebase/messaging';
import { FirebaseConfig, getServiceAccountInfo } from '../index';

const google = require('googleapis');

/**
 * Setup Firebase Real-time database
 * @param config {FirebaseConfig} the firebase config
 * @return {Messaging} the firebase database
 */
export function setupMessaging(config: FirebaseConfig) {
  if (Firebase.apps.length === 0) {
    console.log(config);
    Firebase.initializeApp(config);
  }
  return Firebase.messaging();
}

// https://firebase.google.com/docs/cloud-messaging/auth-server
const SCOPES = 'https://www.googleapis.com/auth/firebase.messaging';

export function getAccessTokenPromise(): Promise<any> {
  return new Promise(function(resolve, reject) {
    const key = getServiceAccountInfo();
    const jwtClient = new google.auth.JWT(
      key.client_email,
      undefined, // null,
      key.private_key,
      SCOPES,
      undefined, // null
    );
    jwtClient.authorize(function(err: any, tokens: any) {
      if (err) {
        reject(err);
        return;
      }
      console.log('fuck');
      console.log(tokens);
      resolve(tokens.access_token);
    });
  });
}
