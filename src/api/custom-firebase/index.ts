export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

export function getConfig() {
  return {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_DOMAIN_KEY,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };
}

export function getServiceAccountInfo() {
  return {
    "type": "service_account",
    "project_id": "kevchat-a5b6f",
    "private_key_id": "dc4806e84c1c43064e683884b9e62a2bb12e3319",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDU4J75tKyjWSQX\nWL4qww8i6xW51NTEdxxZXmYt3WuYpCpfFzpYU40KggPsTGl55cqzoOY3Py7g1mjm\nbTwCAujc7w2ceQnoAodZmQy9V8q3ygb+1rtNjjQF0SIAN3eoYbrXBfNYAhlrZS3G\n8mTJdvbsBsfYXn+NbazXzIvEuI2RZyRZkMtLNd+LklCfF9dIGX9Z/hyRIikqYt49\npanK8iTBI/ux6W62RPIfpuPWvUCdabVOJTfZ19qJLsi3S5kzqRTwzeTFU+fa3SUv\n9cUBdnmWEgfmWo9I8/6s+Hdt5R+QkrrMgfn0DOd0HD5x5zkwAdS+Sk87eVCOtUny\nb9zlofFNAgMBAAECggEAXFJwT95eEte5kdCAZN5EpcGrofTeM7humImaqeCB5eio\noaXavWy62ehKGESJZ/7TOrUYsrQZuhPy2aBdKoglgo/AaPCLbc4O8jowrrsw5SVe\nhE4PXFLEWBN7efmUUPfVhqSDhVMfwBZY1JPSRxdrfjBwonNVQTpkABErOq1JZFm6\nt2qHNFDMspwhYrbChYZN9Ijbvpv64XiejYM/rP/+Dpb5o1LwpyL6vJ8Z0xj9g65l\ncQZcITXgdi+lQDzbCR9sQ+2n/xlMiutFTsFqhL6giuQcNU/eD0l6wp4wPj8PqRMr\n3fLgPdErdTlB7rYPo1No3fuGAoz8yo9UpwLykjhCdwKBgQD3EmrJ6CHueyNqj7ek\nlHivjdSbyxjCeMwur5M1w+dqKBwDXAOtQ+sBm0IZ8fZHLCxJFhlAM6ejlCZiF0O2\nij2r2lr4X8/IW2ESeOTXJx8mvuLIA0T7865GupLM6hYoztodVTUsdv3uTz2/wmlR\nPWZecz7TTVd6QvPfsaOtY2wccwKBgQDckeGkP2D6XDSo538G1vtlD+aK+EDA4XcN\nmrXrLHbaMFxwjr5/w0g14h3x6gxIJwvGe5d2CwVk4zUEcihO1d+tfgePr4vKiuAp\nKQGrO0bu0FC9smIN/1GUjHYhzIqUWHeryA8CQQTbHs0OVm5hIfhKW7RGPl24oZBK\nC7I8XnoLPwKBgQCVhEOzpBLEqygnmIldw6u1MXN0RFfbeBa4OfAwHTmx+EvbjJd9\nBxj0g+xgnxiWwZibMhBd1eShDUqdGc8UbFwd36olnHW1nfcEorx5p2cmn2XF/JSG\nlFTm4IluEEsQrv03uxTOr8PDr5iCrzfkve9xQPTIEonZpyLGQE34463NGQKBgFkb\nZjjgkeES1wNVYm/08eLGJbEG0cIaU+pfEhdMA0fqOa4PPM6Iqed6zfYpQ4TyoUMy\nMuIxWaCEWarOI5KVvKNuQse9d4//wsdeFZqDfAiGh9fa9NoKx35nsGG/LEz54H65\nd7bFZZzQOK8OI9GB07jWi2HFWD96pbwENaFF2bApAoGBANUnVJxW0fJMh/9sYwQH\nmedP7aV7nLIFdG988p53wdvQN7CF40wCOckvW/bG/I83a7dibSj274EYSIa1deWb\nCWS+UsiNqMKgQgtzk4Id4AmLF0AVksJKH36+cP2PLexNdocL4Ku9T71IqsZn0JvC\nWaIK9klqvoH0aLg5XOJw5Zyg\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-7fhc2@kevchat-a5b6f.iam.gserviceaccount.com",
    "client_id": "112694782557192835677",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7fhc2%40kevchat-a5b6f.iam.gserviceaccount.com"
  };
}
