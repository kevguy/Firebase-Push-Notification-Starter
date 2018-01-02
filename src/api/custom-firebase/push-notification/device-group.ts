import * as Firebase from 'firebase/app';
import 'firebase/messaging';

import * as fetch from 'isomorphic-fetch';

/**
 * Send push notification to a device group
 * @param type {TokenType} the type of the token according to platform
 * @param token {string} the token belong to that device
 * @param msg {FirebaseMsg} the message
 */
export default async function sendNotification(notificationKey: string, msg: FirebaseMsg) {
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
  }).then((res) => res.json())
  .then((result) => {
    if (result.error) { throw new Error(result); }
    return result;
  });
  // .catch((err) => { console.error(err); return err; });
  return result;
}
