import * as Firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { getConfig, FirebaseConfig } from '../index';

/**
 * Setup Firebase Real-time database
 * @param config {FirebaseConfig} the firebase config
 * @return {Database} the firebase database
 */
export function setupDatabase(config: FirebaseConfig) {
  if (Firebase.apps.length === 0) {
    console.log(config);
    Firebase.initializeApp(config);
  }
  return Firebase.database();
}
