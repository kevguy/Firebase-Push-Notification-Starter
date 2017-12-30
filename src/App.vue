<template>
  <div id="app" class="mdc-typography app-body mdc-drawer-scroll-lock" v-on:click="closeDrawer()">
    <header class="mdc-toolbar mdc-toolbar--fixed mdc-elevation--z4">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <!-- <span class="catalog-back">
            <a href="/" class="mdc-toolbar__menu-icon"><i class="material-icons">&#xE5C4;</i></a>
          </span> -->
          <button class="app-menu material-icons mdc-toolbar__menu-icon" v-on:click.stop="openDrawer()">menu</button>
          <span class="mdc-toolbar__title catalog-title">Ice Ice Baby: {{deviceUserId}} - {{deviceToken}}</span>
        </section>
        <section class="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
          <a href="#" class="material-icons mdc-toolbar__icon" aria-label="Download" alt="Download">file_download</a>
          <a href="#" class="material-icons mdc-toolbar__icon" aria-label="Print this page" alt="Print this page">print</a>
          <a href="#" class="material-icons mdc-toolbar__icon toggle" aria-label="More" alt="More">more_vert</a>
          <div class="mdc-menu-anchor">
            <div class="mdc-simple-menu" tabindex="-1" id="demo-menu" style="transform-origin: right top 0px; right: 0px; top: 0px; transform: scale(0, 0);">
              <ul class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true" style="transform: scale(1, 1);">
                <li class="mdc-list-item" role="menuitem" tabindex="0" style="">Back</li>
                <li class="mdc-list-item" role="menuitem" tabindex="0" style="">Forward</li>
                <li class="mdc-list-item" role="menuitem" tabindex="0" style="">Reload</li>
                <li class="mdc-list-divider" role="separator"></li>
                <li class="mdc-list-item" role="menuitem" tabindex="0" style="">Save As...</li>
              </ul>
            </div>
          </div>
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
import Snackbar from './components/Snackbar.vue';

export default {
  name: 'main-app',
  components: { Drawer, Snackbar },
  data: () => {
    return {
      showMenu: false
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


    // await this.verifyAuth();

    if (this.$store.state.isFirebaseSetup) {
      this.setupFirebase();
      this.retrieveDeviceToken();
    }

    if (this.$store.state.isAuth && !this.$store.state.isMsgPermitted) {


      if (!this.$store.state.userId && !this.$store.state.token) {
        await this.askMsgPermission();
      }
      this.startMessageListener();
    }

  },
  computed: {
    deviceToken() {
      return this.$store.state.deviceToken;
    },
    deviceUserId() {
      return this.$store.state.deviceUserId;
    }
  },
  methods: {
    async verifyAuth() {
      const authToken = localStorage.getItem('authToken');
      const currentUserId = localStorage.getItem('userId');

      if (!authToken || !currentUserId) { this.$store.commit('RESET_AUTH'); }
      if (authToken) {
        const url = `/user/auth`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': this.$store.state.authToken
          },
          body: JSON.stringify({})
        });
        const result = await res.json();
        if (result.auth) {
          this.$store.commit('SAVE_AUTH_TOKEN', authToken);
          this.$store.commit('SAVE_USER_ID', currentUserId);
        } else {
          this.$store.commit('RESET_AUTH');
        }
      }
    },
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
        const result = await messaging.requestPermission()
        return result;
      } catch (err) {
        console.error('Unable to get permission to notify.', err);
      }
    },
    // retrieveToken() {
    //   const messaging: any = firebase.messaging();
    //   const finalUrl = `/api/token`;
    //   if (!this.chosenLang || (!this.destUserId && !this.chosenDebugUser)) {
    //     return;
    //   }
    //   if (this.chosenDebugUser) {
    //     this.destUserId = this.chosenDebugUser;
    //   }
    //   const registration = await navigator.serviceWorker.register('/service-worker.js');
    //   messaging.useServiceWorker(registration);
    //   const currentToken = await messaging.getToken();
    //   if (!currentToken) {
    //     console.error('An error occurred while retrieving token.');
    //     return;
    //   };
    //   console.log('get token!');
    //   console.log(currentToken);
    //   const payload = {
    //     token: currentToken,
    //     userId: this.destUserId,
    //     lang: this.chosenLang,
    //     type: 'web'
    //   };
    //   const result = await fetch(finalUrl, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(payload)
    //   });
    //   const data = await result.json();
    //   console.log(data)
    //   if (data.status === 'failure') {
    //     console.log('save web token failure');
    //   } else {
    //     console.log('save web token success');
    //     this.hasToken = true;
    //     this.$store.commit('SET_DEVICE_TOKEN', currentToken);
    //     this.$store.commit('SET_DEVICE_USER_ID', this.destUserId);
    //     localStorage.setItem('userId', this.destUserId);
    //     localStorage.setItem('token', currentToken);
    //   }
    //
    //   return currentToken;
    // },
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
    retrieveDeviceToken() {
      const token: string = localStorage.getItem('token');
      if (token) {
        this.$store.commit('SET_DEVICE_TOKEN', token);
      }
    },
    openDrawer () { this.showMenu = true; },
    closeDrawer () { this.showMenu = false; }
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
