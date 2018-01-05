// https://firebase.google.com/docs/cloud-messaging/js/topic-messaging

/**
 * success => {}
 * fail => { error: '...' }
 */
export function subscribeTokenToTopic(token: string, topic: string) {
  const url = `https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`;
  const result = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`
    }
  })
  .then((res) => res.json());
  return result;
}

// https://stackoverflow.com/questions/42947506/unsubscribe-from-a-topic-in-fcm-web
export function unsubscribeFromTopic(token: string, topic: string) {
  const url = `https://iid.googleapis.com/iid/v1:batchRemove`;
  const result = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`
    },
    body: JSON.stringify({
      to: `/topics/${topic}`,
      registration_tokens: [token]
    })
  })
  .then((res) => res.text());
  return result;
}

/**
 * //Success example:
 * {
 *   "message_id": "1023456"
 * }
 *
 * //failure example:
 * {
 *   "error": "TopicsMessageRateExceeded"
 * }
 */
export function sendMsgToTopic(msg: FirebaseMsg, topic: string) {
  const url = `https://fcm.googleapis.com/fcm/send`;
  const result = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${process.env.FIREBASE_SERVER_KEY}`
    },
    body: JSON.stringify({
      to: `/topics/${topic}`,
      // priority: 'high',
      notification : msg
    })
  })
  .then((res) => res.json());
  return result;
}
