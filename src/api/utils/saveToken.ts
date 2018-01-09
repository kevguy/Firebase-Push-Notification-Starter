import { Observable } from 'rxjs/Rx';

import * as Token from '../database/controllers/TokenController';
import * as DeviceGroup from '../database/controllers/DeviceGroupController';

import * as utils from './index';

import { subscribeTopicStream, unsubscribeTopicStream } from './topicSubscription';
import { createNotificationKeyStream } from './notificationKey';
import * as pushNotification from '../custom-firebase/push-notification/device-group';

/**
 * Create Observable for subscribing token to the `test` topic
 * and the broadcast topic for corresponding language
 * @param token {string} user's token
 * @param lang {LangType} user's chosen language
 * @returns {Observable} the Observable
 */
export function topicsSubscriptionStream(token: string, lang: LangType) {
  const topicName = utils.getBroadcastTopicName(lang);

  return Observable.merge(
    subscribeTopicStream(token, 'test'),
    subscribeTopicStream(token, topicName))
    .last()
    .do((res: any) => {
      console.info(`[saveToken/topicsSubscriptionStream]: token subscribed to test and ${topicName}`);
    });
}

export function addTokenStream(record: TokenRecord) {
  const { userId, token, lang }: Partial<TokenRecord> = record;
  const deviceGroupName = utils.getDeviceGroupName(record.userId, record.lang);

  // since token doesn't exist in database
  // find notification key for the device group and save the token to Firebase
  // save the token to MongoDB (both Token and DeviceGroup)
  const saveTokenStream = Token.saveTokenStream(record)
    .do((res: any) => {
      console.info(`[saveToken/addTokenStream]: token saved to token database`);
    });

  const addTokenToDeviceGroupStream = DeviceGroup.addTokenToDeviceGroupStream({
      deviceGroup: deviceGroupName,
      userId: record.userId,
      token: record.token
    })
    .do((res: any) => {
      console.info(`[saveToken/addTokenStream]: token saved to device group database`);
    });

  return createNotificationKeyStream(record)
    .flatMap((result: any) => Observable.merge(
      saveTokenStream,
      addTokenToDeviceGroupStream
    ))
    .last()
    .flatMap((result: any) => topicsSubscriptionStream(token, lang));
}

export function removeTokenStream(record: TokenRecord) {
  const deviceGroupName = utils.getDeviceGroupName(record.userId, record.lang);
  const topicName = utils.getBroadcastTopicName(record.lang);

  return Observable
    // remove token from the device group
    .fromPromise(pushNotification.removeToken(record))
    .flatMap((result: any) => unsubscribeTopicStream(record.token, topicName))
    // remove token in the database
    .flatMap((res: any) => DeviceGroup.removeTokenFromDeviceGroupStream({
      deviceGroup: deviceGroupName,
      userId: record.userId,
      token: record.token
    }));
}

export default function saveTokenStream(record: TokenRecord) {
  const { userId, token, lang }: Partial<TokenRecord> = record;

  const stream = Token.queryTokenStream(token)
    .do((res: any) => {
      console.info(`[saveToken]: queried if token exists in database`);
    })
    .flatMap((res: any) => {
      console.log(res);
      if (!res || !res.hasOwnProperty('token')) { return addTokenStream(record); }
      // token is found in MongoDb, see if need to change lang
      return Observable.of(1); // dummy value indicating token is found in MongoDb
    })
    // .flatMap((result: any) => {
    //   // for testing purpose
    //   return Observable.fromPromise(topics.sendMsgToTopic({
    //     body: 'qwerty',
    //     title: 'qwerty'
    //   }, 'test'));
    // })
    .do((res: any) => {
      console.info(`[saveToken]: token updated/created`);
    })
    .map((result: any) => ({
      status: 'success',
      msg: 'successfully saved/created token'
    }));
  return stream;
}
