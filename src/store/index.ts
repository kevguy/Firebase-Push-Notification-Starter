import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import { Store } from 'vuex';

Vue.use(Vuex);

export function createStore (): Store<State> {
  return new Vuex.Store({
    state: {
      isAuth: false,
      isMsgPermitted: false,
      isFirebaseSetup: false,
      authToken: '',
      webPushToken: '',
      hasWebPushToken: false,
      userId: '',
      debugUsers: [
        { username: 'Kev', userId: '-999' },
        { username: 'Milton', userId: '-998' },
        { username: 'Indy', userId: '-997'},
        { username: 'Simon', userId: '-996' },
        { username: 'Youseff', userId: '-995'}
      ],
      availableLangs: [ 'zh-hk', 'en' ],
      showSnackbar: false,
      snackbarMsg: {
        message: '',
        actionText: ''
      },
      showDialog: false,

      activeType: null,
      itemsPerPage: 20,
      items: {/* [id: number]: Item */},
      users: {/* [id: string]: User */},
      lists: {
        top: [/* number */],
        new: [],
        show: [],
        ask: [],
        job: []
      }
    },
    actions,
    mutations,
    getters
  });
};

export interface Item {
  by: string;
  descendants: number;
  id: number;
  kids: Array<number>,
  score: number;
  time: number | Date | undefined;
  title: string;
  type: string;
  url: string;
  __lastUpdated: number | Date | undefined;
};

export interface User {
  created: number;
  id: string;
  karma: number;
  submitted: Array<number>;
  __lastUpdated: number;
};

export interface List {
  top: Array<number>;
  new: Array<number>;
  show: Array<number>;
  ask: Array<number>;
  job: Array<number>;
  [key: string]: Array<number>;
};

export interface DebugUser {
  username: string;
  userId: string;
}

export interface SnackBarMsg {
  message: string;
  actionText: string;
};

export interface State {
  isAuth: boolean;
  isMsgPermitted: boolean;
  isFirebaseSetup: boolean;
  authToken: string;
  webPushToken: string;
  hasWebPushToken: boolean;
  userId: string;
  debugUsers: Array<DebugUser>;
  availableLangs: Array<string>;
  showSnackbar: boolean;
  snackbarMsg: SnackBarMsg;
  showDialog: boolean;

  activeType: string | null;
  itemsPerPage: number;
  items: any;
  users: any;
  lists: List;
  route?: any;
};
