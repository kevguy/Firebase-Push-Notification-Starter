import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';

Vue.use(Router);

// route-level code splitting
const TokenView = () => import('../views/TokenView.vue');
const DeviceGroupView = () => import('../views/DeviceGroupView.vue');
const DirectMessageView = () => import('../views/DirectMessageView.vue');
const Authentication = () => import('../views/Authentication.vue');
const TopicView = () => import('../views/TopicView.vue');

export function createRouter (): Router {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
      { path: '/tokens-info', component: TokenView },
      { path: '/device-group-info', component: DeviceGroupView },
      { path: '/direct-message-info', component: DirectMessageView },
      { path: '/topic-info', component: TopicView },
      { path: '/signup', component: Authentication },
      // { path: '/', redirect: '/tokens-info' }
      { path: '/', redirect: '/device-group-info' }
    ]
  } as RouterOptions);
}
