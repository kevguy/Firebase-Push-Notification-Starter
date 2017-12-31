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

    const inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
    if (inBrowser) {
      console.log('inBrowser');
      const result = await store.dispatch('UPDATE_AUTH_STATE');
      console.log(store.state.isAuth);
      // console.log(result);
      // if (result) {
      //   // save token to state
      //   store.commit('SET_AUTH');
      //   // this.$router.push({ path: 'device-group-info' });
      // } else {
      //   store.commit('RESET_AUTH');
      // }
    }

    // console.log(store.state);

    // const omg: Promise<boolean> = new Promise((resolve: any, reject: any) => {
    //   jwt.verify(store.state.authToken, 'linkinpark', function(err: any, decoded: any) {
    //     if (err) resolve(false);
    //     resolve(true);
    //   });
    // });

    // const result: any = await new Promise((resolve: any, reject: any) => {
    //   jwt.verify(store.state.authToken, 'linkinpark', function(err: any, decoded: any) {
    //     if (err) resolve(false);
    //     resolve(true);
    //   });
    // });
    // if (result) {
    //   store.commit('SET_AUTH');
    // } else {
    //   store.commit('RESET_AUTH');
    // }

    // console.log(localStorage);
    // const result = await store.dispatch('UPDATE_AUTH_STATE');
    // console.log(result);
    console.log(`auth ${store.state.isAuth} in router`);
    console.log(to.fullPath)

    // if (to.fullPath === '/signup' && !store.state.isAuth) {
    //   next();
    //   return;
    // }
    //
    if (to.fullPath === '/signup' && store.state.isAuth) {
      console.log('redirecting from signup to device-group-info')
      // next({
      //   // redirect: '/device-group-info',
      //   path: '/device-group-info',
      //   replace: true
      // });
      router.push({
        path: '/device-group-info'
      });
      return;
    }
    //
    // if (!store.state.isAuth) {
    //   next({
    //     path: '/signup'
    //   });
    //   return;
    // }

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
