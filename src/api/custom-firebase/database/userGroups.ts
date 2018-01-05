import * as Firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { getConfig, FirebaseConfig } from '../index';
import { signIn } from '../shared-utils';
import { setupDatabase } from './utils';

import * as fetch from 'isomorphic-fetch';

const google = require('googleapis');

// import * as LRU from 'lru-cache'

/**
 * Create notification key for a user's group
 * @param userId {string} user's user id
 * @param token {string} user's token for firebase
 * @param lang {string} chosen language ('en' or 'zh-hk')
 * @returns {Promise<any>} success/fail status
 * note that this needs at least one token to work
 * https://firebase.google.com/docs/cloud-messaging/js/device-group
 */
async function createNotificationKey(record: TokenRecord): Promise<any> {
  const { userId, token, lang }: Partial<TokenRecord> = record;
  console.log('createNotificationKey ');
  const langKey = lang === 'zh-hk' ? 'zh_hk' : 'en';
  const notificationKey: any = await fetch('https://android.googleapis.com/gcm/notification', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`,
      'project_id': process.env.FIREBASE_MESSAGING_SENDER_ID
    }),
    body: JSON.stringify({
      'operation': 'create',
      'notification_key_name': `${userId}_${langKey}`,
      'registration_ids': [ token ]
    })
  })
  .then((res) => res.json())
  .catch((err: any) => {
    console.error(`userGroups: failed to create notification key: ${err}`);
  });
  console.log(`notification key is: ${notificationKey}`);
  console.log(notificationKey);
  console.log(`${userId}_${langKey}`);
  return notificationKey['notification_key'];
}

/**
 * Retrieve user's notification key for their device group
 * @param userId {string} user's user id
 * @param lang {string} chosen language ('en' or 'zh-hk')
 * @returns {Promise<any>} retrieved data, undefined if record can't be found
 */
export async function retrieveNotificationKey(record: Partial<TokenRecord>): Promise<any> {
  const { userId, lang }: Partial<TokenRecord> = record;
  console.log(`inside retrieveNotificationKey`);
  const langKey = lang === 'zh-hk' ? 'zh_hk' : 'en';
  const result: any = await fetch(`https://android.googleapis.com/gcm/notification?notification_key_name=${userId}_${langKey}`, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`,
      'project_id': process.env.FIREBASE_MESSAGING_SENDER_ID
    }),
    body: JSON.stringify({})
  })
  .then((res) => res.json())
  .then((res) => {
    if (res.error) {
      throw new Error(res.error);
    }
    return res;
  })
  .catch((err: any) => {
    console.error(`userGroups: failed to retrieve notification key from userId ${userId}: ${err}`);
  });
  console.info(result);

  if (result) {
    return result['notification_key'];
  }
  return false;
}

/**
 * Token operation to a user's device group
 * @param operator {string} add/remove
 * @param record {TokenRecord} record
 * @returns {Promise<any>} success/fail status
 */
async function tokenOp(operator: 'add' | 'remove', record: TokenRecord): Promise<any> {
  const { userId, token, lang, type }: Partial<TokenRecord> = record;
  console.log(token);
  const langKey = lang === 'zh-hk' ? 'zh_hk' : 'en';
  let notificationKey = await retrieveNotificationKey(record);
  console.log(`retrieveNotificationKey: ${notificationKey}`);
  if (!notificationKey) {
    notificationKey = await createNotificationKey(record);
  } else {
    console.log(`${operator}ing token to device group`);
    notificationKey = await fetch('https://android.googleapis.com/gcm/notification', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`,
        'project_id': process.env.FIREBASE_MESSAGING_SENDER_ID
      }),
      body: JSON.stringify({
        'operation': operator,
        'notification_key_name': `${userId}_${langKey}`,
        'notification_key': notificationKey,
        'registration_ids': [ token ]
      })
    })
    .then((res) => res.text())
    .then((res) => {
      console.log(res);
      const response = JSON.parse(res);
      if (response.error) throw new Error(res);
      return res;
    })
    .catch((err: any) => {
      console.error(`userGroups: failed to ${operator} token ${token} to notification key: ${notificationKey}`);
      console.log(err);
    });
  }


  // if (notificationKey) {
  //   console.log('saving stuff to database');
  //   const database = setupDatabase(getConfig());
  //   const signInResult = await signIn(getConfig());
  //   console.log('signed in');
  //   // save to database
  //   const newChildRef = database.ref(`deviceGroup/${userId}_${langKey}`).push();
  //   // console.log(`new key is ${newChildRef.key}`)
  //
  //   // this should work too
  //   // return newChildRef.set({ type, token });
  //   console.log('saving stuff to database');
  //   await database.ref(`deviceGroup/${userId}_${langKey}/${newChildRef.key}`).set({ type, token });
  // }

  return notificationKey;
}

/**
 * Add token to a user's device group
 * @param record {TokenRecord} record
 * @returns {Promise<any>} success/fail status
 */
export async function addToken(record: TokenRecord): Promise<any> {
  return await tokenOp('add', record);
}

/**
 * Remove token from user's device group
 * @param record {TokenRecord} record
 * @returns {Promise<any>} retrieved data, undefined if record can't be found
 */
 export async function removeToken(record: TokenRecord): Promise<any> {
   return await tokenOp('remove', record);
 }
