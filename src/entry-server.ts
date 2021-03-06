import { createApp } from './app'
import * as jwt from 'jsonwebtoken';

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default (context: any) => {
  return new Promise(async (resolve, reject) => {
    const s: any = isDev && Date.now()
    const { app, router, store } = createApp()

    // keyword: real-auth
    // server side relies on this to update the state
    //https://forum.vuejs.org/t/accessing-current-request-context-through-vue-instance-for-server-side-rendering-to-be-able-to-access-cookies-for-initial-user-authentication/48/11
    if (context.cookies.iceicebaby) {
      const data = JSON.parse(context.cookies.iceicebaby)
      store.state.userId = data.userId
      store.state.authToken = data.authToken
    }

    const result: any = await new Promise((resolve: any, reject: any) => {
      jwt.verify(store.state.authToken, 'linkinpark', function(err: any, decoded: any) {
        if (err) resolve(false);
        resolve(true);
      });
    });
    if (result) {
      store.state.isAuth = true;
    } else {
      store.state.isAuth = false;
    }

    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location
    router.push(url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(matchedComponents.map(({ asyncData }: any) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
