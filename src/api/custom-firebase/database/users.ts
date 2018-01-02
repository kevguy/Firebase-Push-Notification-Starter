import * as Firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { getConfig, FirebaseConfig } from '../index';
import { signIn } from '../shared-utils';
import { setupDatabase } from './utils';

// import { Database } from '@firebase/database'
// import * as LRU from 'lru-cache'

/**
 * Retrieve user's data in database
 * @param database {Database} the firebase database
 * @param userId {string} user's user id
 * @returns {Promise<any>} retrieved data, undefined if record can't be found
 */
export async function retrieveUser(database: any, userId: string): Promise<any> {
  const signInResult = await signIn(getConfig());
  const result = await database.ref(`/users/${userId}`).once('value');
  return result.val();
}

/**
 * Update user's userId and token to database
 * If record exists, it'll overwrite old data
 * If record doesn't exists, it'll add the record
 * @param database {Database} the firebase database
 * @param record {TokenRecord} record
 * @returns {Promise<any>} success/fail status
 */
export async function updateUser(database: any, record: TokenRecord): Promise<any> {
  const { userId, token, type, lang }: TokenRecord = record;
  const signInResult = await signIn(getConfig());
  return await database.ref(`users/${userId}/${token}`).set({ lang, type });

  /*
  const newChildRef = database.ref(`users/${userId}`).push();
  // console.log(`new key is ${newChildRef.key}`)

  // this should work too
  // return newChildRef.set({ type, token });
  return database.ref(`users/${userId}/${newChildRef.key}`).set({
    [type]: token,
    lang
  });
  */
}

/**
 * Delete user's data in database
 * @param database {Database} the firebase database
 * @param userId {string} user's user id
 * @returns {Promise<any>} success/fail status
 */
export async function deleteUser(database: any, userId: string): Promise<any> {
  const signInResult = await signIn(getConfig());
  return database.ref(`users/${userId}`).remove()
    .catch((error: any) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(error);
      console.error(`Deletion failed (${errorCode}): ${errorMessage}`);
      return error;
    });
}
