import 'firebase/messaging';
import * as fetch from 'isomorphic-fetch';
import * as utils from '../../utils';

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
  console.info('[DeviceGroup/createNotificationKey]: createNotificationKey()');
  console.info(record);

  const { userId, token, lang }: Partial<TokenRecord> = record;
  const langKey = utils.getLangKey(lang);
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
    console.error(`[DeviceGroup/createNotificationKey]: failed to create notification key: ${err}`);
    throw new Error(err);
  });

  console.info(`[DeviceGroup/createNotificationKey]: notification key is: ${notificationKey}`);
  return notificationKey['notification_key'];
}

/**
 * Retrieve user's notification key for their device group
 * @param userId {string} user's user id
 * @param lang {string} chosen language ('en' or 'zh-hk')
 * @returns {Promise<any>} retrieved data, undefined if record can't be found
 */
export async function retrieveNotificationKey(record: Partial<TokenRecord>): Promise<any> {
  console.info('[DeviceGroup/retrieveNotificationKey]: retrieveNotificationKey()');
  console.info(record);

  const { userId, lang }: Partial<TokenRecord> = record;
  const langKey = utils.getLangKey(lang);
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
      console.error(`[DeviceGroup/retrieveNotificationKey]: failed to retrieve notification key from userId ${userId}: ${res.error}`);
      // throw new Error(res.error);
      return undefined;
    }
    return res;
  });

  console.info(`[DeviceGroup/retrieveNotificationKey]: notification key is: ${result}`);
  if (result) { return result['notification_key']; }
  return false;
}

/**
 * Token operation to a user's device group
 * @param operator {string} add/remove
 * @param record {TokenRecord} record
 * @returns {Promise<any>} success/fail status
 */
async function tokenOp(operator: 'add' | 'remove', record: TokenRecord): Promise<any> {
  console.info(`[DeviceGroup/tokenOp]: tokenOp(): ${operator}`);
  console.info(record);

  const { userId, token, lang, type }: Partial<TokenRecord> = record;
  const langKey = utils.getLangKey(lang);
  let notificationKey = await retrieveNotificationKey(record);
  console.info(`[DeviceGroup/tokenOp]: trying to retrieve notificationkey: ${notificationKey}`);
  if (!notificationKey) {
    notificationKey = await createNotificationKey(record);
  } else {
    console.info(`[DeviceGroup/tokenOp]: ${operator}ing token to device group`);
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
      console.info(`[DeviceGroup/tokenOp]: response is ${operator}`);
      const response = JSON.parse(res);
      if (response.error) {
        console.error(`[DeviceGroup/retrieveNotificationKey]: failed to ${operator} token ${token} to notification key: ${notificationKey}`);
        throw new Error(res);
      }
      return res;
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

/**
 * Send push notification to a device group
 * @param type {TokenType} the type of the token according to platform
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
export async function sendNotification(notificationKey: string, msg: FirebaseMsg) {
  console.info(`[DeviceGroup/sendNotification]: sendNotification()`);

  const result = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`,
      'project_id': process.env.FIREBASE_SERVER_KEY
    }),
    body: JSON.stringify({
      to: notificationKey,
      notification : msg,
      // data : {
      //   volume : '3.21.15',
      //   contents : 'http://www.news-magazine.com/world-week/21659772'
      // }
    })
  })
  .then((res) => res.json())
  .then((result) => {
    if (result.error) {
      console.error(`[DeviceGroup/sendNotification]: error: ${result.error}`);
      throw new Error(result);
    }
    return result;
  });
  // .catch((err) => { console.error(err); return err; });
  return result;
}
