import { Observable } from 'rxjs/Rx';

import * as topics from '../custom-firebase/push-notification/topic';

/**
 * Create Observable for subscribing token to a topic
 * @param token {string} user's token
 * @param topicName {string} topic name
 * @returns {Observable} the Observable
 */
export function subscribeTopicStream(
  token: string, topicName: string): Observable<any> {

  return Observable.fromPromise(topics.subscribeTokenToTopic(token, topicName));
  // TODO: save result to database
}

/**
 * Create Observable for unsubscribing token from a topic
 * @param token {string} user's token
 * @param topicName {string} topic name
 * @returns {Observable} the Observable
 */
export function unsubscribeTopicStream(
  token: string, topicName: string): Observable<any> {

  return Observable.fromPromise(topics.unsubscribeFromTopic(token, topicName));
  // TODO: remove result from database
}
