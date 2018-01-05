declare interface Handlers {
  'direct-message': Function;
  'custom-message': Function;
  'token': Function;
}

declare type TokenType = 'web' | 'android' | 'ios';
declare type LangType = 'zh-hk' | 'en';

declare interface TokenRecord {
  type: TokenType;
  lang: LangType;
  token: string;
  userId: string;
}

declare interface DeviceGroupRecord {
  deviceGroup: string;
  userId: string;
  token: string;
}

declare interface Payload {
  status: 'success' | 'failure' | 'unknown';
  result?: any;
}

declare interface ChangeLangType {
  userId: string;
  token: string;
  targetLang: LangType;
}

declare interface DirectMsg {
  title: string;
  message: string;
  token: TokenType;
  type: string;
}

declare interface CustomMsg {
  userId: string;
  title: string;
  message: string;
  lang: LangType;
}

declare interface FirebaseMsg {
  title: string;
  body: string;
}

declare interface TopicMsg {
  topic: string,
  msg: FirebaseMsg
}

declare interface BroadcastMsg {
  lang: string,
  msg: FirebaseMsg
}

declare var MyUntypedLibrary: any;

declare var browser: any;

declare module '@material/drawer';


declare var firebase: any;
// declare var process: {
//   env: {
//     FIREBASE_API_KEY: string;
//     FIREBASE_DOMAIN_KEY: string;
//     FIREBASE_DATABASE_URL: string;
//     FIREBASE_PROJECT_ID: string;
//     FIREBASE_STORAGE_BUCKET: string;
//     FIREBASE_MESSAGING_SENDER_ID: string;
//   }
// }
