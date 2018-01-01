<template>
  <div id="app" class="mdc-typography app-body mdc-drawer-scroll-lock" v-on:click.stop="closeDrawer1()">
    <header class="mdc-toolbar mdc-toolbar--fixed mdc-elevation--z4">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <!-- <span class="catalog-back">
            <a href="/" class="mdc-toolbar__menu-icon"><i class="material-icons">&#xE5C4;</i></a>
          </span> -->
          <button class="app-menu material-icons mdc-toolbar__menu-icon" v-on:click.stop="openDrawer()">menu</button>
          <span class="mdc-toolbar__title catalog-title">Ice Ice Baby: {{$store.state.isAuth}} {{deviceUserId}} - {{deviceToken}}</span>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
          <a href="#" class="material-icons mdc-toolbar__icon" aria-label="Download" alt="Download">file_download</a>
          <a href="#" class="material-icons mdc-toolbar__icon" aria-label="Print this page" alt="Print this page">print</a>
          <a href="#" class="material-icons mdc-toolbar__icon toggle" aria-label="More" alt="More" v-on:click.stop="openThreeDotMenu()">more_vert</a>
          <ThreeDotMenu v-bind:show="showThreeDotMenu"/>
        </section>
      </div>
    </header>
    <Drawer v-bind:show="showMenu" />
    <div class="app-content mdc-toolbar-fixed-adjust" v-on:click="closeDrawer()">
      <main class="app-main">
        <transition name="fade" mode="out-in">
          <router-view class="view"></router-view>
        </transition>
      </main>
    </div>
    <Snackbar />
  </div>
</template>

<script lang="ts">
import Drawer from './components/Drawer.vue';
import ThreeDotMenu from './components/ThreeDotMenu.vue';
import Snackbar from './components/Snackbar.vue';

export default {
  name: 'main-app',
  components: { Drawer, ThreeDotMenu, Snackbar },
  data: () => {
    return {
      showMenu: false,
      showThreeDotMenu: false
    };
  },
  async mounted () {
    console.info('mounted');
    /**
     * First, verify if user has logged in yet
     * If user has logged in, setup Firebase if it hasn't
     *  - then Ask message permission
     *
     */
    if (this.isAuth) {
      console.info('its authenticated!');
    }

    if (this.isFirebaseSetup) {
      console.info('firebase is setup');
    }

    if (this.isAuth && !this.isFirebaseSetup) {
      this.setupFirebase();
      const result = await this.askMsgPermission();
      if (result) {
        this.retrieveToken();
        this.startMessageListener();
      }
    }
  },
  computed: {
    userId() { return this.$store.state.userId; },
    isAuth() { return this.$store.state.isAuth; },
    isFirebaseSetup() { return this.$store.state.isFirebaseSetup; },
    deviceToken() {
      return this.$store.state.deviceToken;
    },
    deviceUserId() {
      return this.$store.state.deviceUserId;
    }
  },
  methods: {
    setupFirebase() {
      const config: any = {
        apiKey: "AIzaSyATXSrM1qq7L-H_xVtF0rwLpPjlbR-7cOo",
        authDomain: "kevchat-a5b6f.firebaseapp.com",
        databaseURL: "https://kevchat-a5b6f.firebaseio.com",
        projectId: "kevchat-a5b6f",
        storageBucket: "kevchat-a5b6f.appspot.com",
        messagingSenderId: "788651942380"
      };
      firebase.initializeApp(config);
    },
    async askMsgPermission() {
      const messaging: any = firebase.messaging();
      try {
        const result = await messaging.requestPermission();
        return true;
      } catch (err) {
        console.error('Unable to get permission to notify.', err);
        return false;
      }
    },
    async retrieveToken() {
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
      await this.$store.dispatch('SAVE_WEB_PUSH_TOKEN', {
        token: currentToken,
        lang: 'en'
      });
      return currentToken;
    },
    startMessageListener() {
      const messaging: any = firebase.messaging();
      messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        this.$store.commit('SET_SHOW_SNACKBAR_MESSAGE', {
          message: `${payload.notification.title} - ${payload.notification.body}`, actionText: ''
        });
        this.$store.commit('SET_SHOW_SNACKBAR', true);
      });
    },
    openDrawer () { this.showMenu = true; },
    closeDrawer () {
      this.showMenu = false;
      this.showThreeDotMenu = false;
      // this.$store.commit('CLOSE_DIALOG');
    },
    closeDrawer1 () {
      this.showMenu = false;
      this.showThreeDotMenu = false;
      // this.$store.commit('CLOSE_DIALOG');
    },
    openThreeDotMenu () { this.showThreeDotMenu = true; }
  }
};
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active{
  opacity: 0
}

/* Ensure layout covers the entire screen. */
html {
  height: 100%;
}

/* Place drawer and content side by side. */
.app-body {
  display: flex;
  // flex-direction: row;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  // height: 100%;
  // max-width: 100%;
}

/* Stack toolbar and main on top of each other. */
.app-content {
  // display: inline-flex;
  // flex-direction: column;
  // flex-grow: 1;
  // height: 100%;
  // box-sizing: border-box;
}

.app-main {
  padding-left: 16px;
  padding-right: 16px;
  overflow: auto;
}
</style>
