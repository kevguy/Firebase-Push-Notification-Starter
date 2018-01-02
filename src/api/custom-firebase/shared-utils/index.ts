import * as Firebase from 'firebase/app';
import 'firebase/auth';
import { getConfig, FirebaseConfig } from '../index';

// https://stackoverflow.com/questions/41214625/firebase-node-js-error-the-xmlhttprequest-compatibility-library-was-not-foun
// otherwise firebase.auth().signInWithEmailAndPassword won't work
declare var global: any;
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

/**
 * Setup Firebase Auth for retrieving/deleting data
 * @param config {FirebaseConfig} the firebase config
 * @return {Promise<any>} the signIn result
 */
export function signIn(config: FirebaseConfig): Promise<any> {
  if (Firebase.apps.length === 0) {
    Firebase.initializeApp(config);
  }
  const firebaseAuth = Firebase.auth();
  return firebaseAuth.signInWithEmailAndPassword(
    process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD)
    .catch((error: any) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(error);
      console.error(`Sign in failed (${errorCode}): ${errorMessage}`);
      return error;
    });
}
