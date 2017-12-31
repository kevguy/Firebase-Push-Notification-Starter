import Vue from 'vue';

import { MutationTree } from 'vuex';
import { State , Item, User, SnackBarMsg } from './index';

import * as Cookies from 'js-cookie';

interface SetActiveTypePayload { type: string };

interface SetListPayload { type: string, ids: Array<number> };

interface SetItemsPayload { items: Array<Item> };

interface SetUserPayload { id: number; user: User; };

export default <MutationTree<State>>{
  OPEN_DIALOG: (state: State) => {
    state.showDialog = true;
  },

  CLOSE_DIALOG: (state: State) => {
    state.showDialog = false;
  },

  SAVE_USER_ID: (state: State, userId: string) => {
    state.userId = userId;
    // localStorage.setItem('userId', userId);
    Cookies.set('userId', userId, { expires: 3, secure: true });
    document.cookie = `iceicebaby=${JSON.stringify({ userId: state.userId, authToken: state.authToken })}`;
  },

  SAVE_AUTH_TOKEN: (state: State, authToken: string) => {
    state.authToken = authToken;
    // localStorage.setItem('authToken', token);
    Cookies.set('authToken', authToken, { expires: 3, secure: true });
    document.cookie = `iceicebaby=${JSON.stringify({ userId: state.userId, authToken: state.authToken })}`;
    // state.isAuth = true;
  },

  SET_AUTH: (state: State) => {
    state.isAuth = true;
  },

  RESET_AUTH: (state: State) => {
    state.authToken = '';
    // localStorage.setItem('authToken', '');
    state.isAuth = false;
  },

  SET_FIREBASE_SETUP: (state: State, data: boolean) => {
    state.isFirebaseSetup = data;
  },

  SAVE_MSG_PERMISSION: (state: State) => {
    state.isMsgPermitted = true;
  },

  SET_WEB_PUSH_TOKEN: (state: State, token: string) => {
    state.webPushToken = token;
    state.hasWebPushToken = true;
    localStorage.setItem('webPushToken', token);
  },

  // SET_DEVICE_USER_ID: (state: State, userId: string) => {
  //   state.deviceUserId = userId;
  // },

  SET_SHOW_SNACKBAR: (state: State, show: boolean) => {
    state.showSnackbar = show;
  },

  SET_SHOW_SNACKBAR_MESSAGE: (state: State, payload: SnackBarMsg) => {
    state.snackbarMsg = {
      ...payload,
      actionText: payload.actionText || 'Close'
    };
  },

  RESET_SHOW_SNACKBAR_MESSAGE: (state: State) => {
    state.snackbarMsg = { message: '', actionText: '' };
  },

  SET_ACTIVE_TYPE: (state: State, { type }: SetActiveTypePayload) => {
    state.activeType = type;
  },

  SET_LIST: (state: State, { type, ids }: SetListPayload) => {
    state.lists[type] = ids;
  },

  SET_ITEMS: (state: State, { items }: SetItemsPayload) => {
    items.forEach((item) => {
      if (item) {
        Vue.set(state.items, item.id, item);
      }
    });
  },

  SET_USER: (state: State, { id, user }: SetUserPayload) => {
    Vue.set(state.users, id, user || false); /* false means user not found */
  }
};
