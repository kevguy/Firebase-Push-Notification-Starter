// import {
//   fetchUser,
//   fetchItems,
//   fetchIdsByType
// } from '../api'

import { State } from './index';
import { ActionTree, ActionContext, Dispatch, Commit } from "vuex";

// type Partial<T> = {
//     [P in keyof T]?: T[P];
// }

// type PartialActionContext<S, R> = Partial<ActionContext<S, R>>

// interface PartialActionContext<S, R> {
//   dispatch?: Dispatch;
//   commit?: Commit;
//   state?: S;
//   getters?: any;
//   rootState?: R;
//   rootGetters?: any;
// }

function setupFirebase() {
  const config: any = {
    apiKey: "AIzaSyATXSrM1qq7L-H_xVtF0rwLpPjlbR-7cOo",
    authDomain: "kevchat-a5b6f.firebaseapp.com",
    databaseURL: "https://kevchat-a5b6f.firebaseio.com",
    projectId: "kevchat-a5b6f",
    storageBucket: "kevchat-a5b6f.appspot.com",
    messagingSenderId: "788651942380"
  };
  firebase.initializeApp(config);
}

async function askMsgPermission() {
  const messaging: any = firebase.messaging();
  try {
    const result = await messaging.requestPermission();
    return true;
  } catch (err) {
    console.error('Unable to get permission to notify.', err);
    return false;
  }
}

async function retrieveToken() {
  const messaging: any = firebase.messaging();
  const url = `/api/token`;

  const registration = await navigator.serviceWorker.register('/service-worker.js');
  messaging.useServiceWorker(registration);
  const currentToken = await messaging.getToken();
  if (!currentToken) {
    console.error('An error occurred while retrieving token.');
    return;
  };
  console.log('get token!');
  console.log(currentToken);
  return currentToken;
}

function startMessageListener(commit: any) {
  const messaging: any = firebase.messaging();
  messaging.onMessage((payload) => {
    console.log("Message received. ", payload);
    commit('SET_SHOW_SNACKBAR_MESSAGE', {
      message: `${payload.notification.title} - ${payload.notification.body}`, actionText: ''
    });
    commit('SET_SHOW_SNACKBAR', true);
  });
}

export default <ActionTree<State, any>>{
  INIT_FIREBASE: async ({ commit, state, dispatch }: any) => {
    if (state.isAuth) { console.log('its authenticated'); }

    if (state.isFirebaseSetup) {
      console.info('firebase is setup');
    }

    if (state.isAuth && !state.isFirebaseSetup) {
      setupFirebase();
      const result = await askMsgPermission();
      if (result) {
        const token = await retrieveToken();
        await dispatch('SAVE_WEB_PUSH_TOKEN', {
          token: token,
          lang: 'en'
        });
        startMessageListener(commit);
        commit('SET_FIREBASE_SETUP', true);
      }
    }
  },

  UPDATE_AUTH_STATE: async ({ commit, state }: any) => {
    // const authToken = localStorage ? localStorage.getItem('authToken') : '';
    // const currentUserId = localStorage ? localStorage.getItem('userId') : '';
    if (!state.authToken || !state.userId) { commit('RESET_AUTH'); }
    if (state.authToken) {
      const url = `/user/auth`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': state.authToken
        },
        body: JSON.stringify({})
      });
      const result = await res.json();
      if (result.auth) {
        // commit('SAVE_AUTH_TOKEN', authToken);
        // commit('SAVE_USER_ID', userId);
        commit('SET_AUTH');
      } else {
        commit('RESET_AUTH');
      }
    }
  },

  SAVE_WEB_PUSH_TOKEN: async ({ commit, state }: any, { token, lang }: any) => {
    console.log('trying SAVE_WEB_PUSH_TOKEN');
    const url = `/api/token`;

    const payload = {
      token: token,
      userId: state.userId,
      lang: lang,
      type: 'web'
    };

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': state.authToken
      },
      body: JSON.stringify(payload)
    });
    const data = await result.json();
    console.log(data);
    if (data.status === 'failure') {
      return Promise.reject({
        status: 'failure',
        msg: 'save web token failure'
      });
    } else {
      commit('SET_WEB_PUSH_TOKEN', token);
      return Promise.resolve({
        status: 'success',
        msg: 'save web token success'
      });
    }
  },

  FETCH_DEBUG_USERS: ({ commit, state }: any) => {
    return Promise.resolve(state.debugUsers);
  },

  FETCH_AVAILABLE_LANGS: ({ commit, state }: any) => {
    return Promise.resolve(state.availableLangs);
  },

  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({ commit, dispatch, state }: any, { type }: any) => {
    commit('SET_ACTIVE_TYPE', { type })
    // return fetchIdsByType(type)
    //   .then(ids => commit('SET_LIST', { type, ids }))
    //   .then(() => dispatch('ENSURE_ACTIVE_ITEMS'))
    return Promise.resolve('');
  },

  // ensure all active items are fetched
  ENSURE_ACTIVE_ITEMS: ({ dispatch, getters }: any) => {
    return dispatch('FETCH_ITEMS', {
      ids: getters.activeIds
    })
  },

  FETCH_ITEMS: ({ commit, state }: any, { ids }: any) => {
    // on the client, the store itself serves as a cache.
    // only fetch items that we do not already have, or has expired (3 minutes)
    const now = Date.now()
    ids = ids.filter((id: any) => {
      const item = state.items[id]
      if (!item) {
        return true
      }
      if (now - item.__lastUpdated > 1000 * 60 * 3) {
        return true
      }
      return false
    })
    // if (ids.length) {
    //   return fetchItems(ids).then(items => commit('SET_ITEMS', { items }))
    // } else {
    //   return Promise.resolve()
    // }
    return Promise.resolve('');
  },

  FETCH_USER: ({ commit, state }: any, { id }: any) => {
    // return state.users[id]
    //   ? Promise.resolve(state.users[id])
    //   : fetchUser(id).then(user => commit('SET_USER', { id, user }))
    return Promise.resolve('');
  }
}
