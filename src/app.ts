import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'
import * as jwt from 'jsonwebtoken';

// mixin for handling title
Vue.mixin(titleMixin)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as any)[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  router.beforeEach(async (to, from, next) => {

    console.log('beforeEach');
    console.log('verifying token');

    // keyword: real-auth
    // client side has to rely on this is get the true state of isAuth
    // it will get the correct state afterwards,
    // but not before running router.beforeEach
    const inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
    if (inBrowser) {
      console.log('inBrowser');
      const result = await store.dispatch('UPDATE_AUTH_STATE');
      if (store.state.isAuth) {
        const result2 = await store.dispatch('INIT_FIREBASE');
      }
    }

    if (to.fullPath === '/signup' && store.state.isAuth) {
      next({
        path: '/device-group-info'
      });
      return;
    } else if (to.fullPath !== '/signup' && !store.state.isAuth) {
      next({
        path: '/signup'
      });
      return;
    }

    // if (store.state.deviceToken === '') {
    //   // user doesn't have a token for push notification yet
    //   next({
    //     path: '/'
    //   });
    //   return;
    // }
    next();
  });

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: (h: any) => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
