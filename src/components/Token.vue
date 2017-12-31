<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Get Token for Device</h1>
      <h2 class="mdc-card__subtitle">Get token for your device (web only)</h2>
    </section>
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="token-dest-user-id" type="text" class="mdc-text-field__input" v-model="destUserId">
              <label for="token-dest-user-id" class="mdc-text-field__label">
                User ID
              </label>
              <div class="mdc-text-field__bottom-line"></div>
            </div>
          </div>
        </div>
      </form>
    </section>
    <section class="mdc-card__primary">
      <form action="#">
        OR pick a debug User ID:
        <div class="mdc-select">
          <select class="mdc-select__surface" v-model="chosenDebugUser">
            <option value="">Choose...</option>
            <option v-for="user in debugUsers" v-bind:value="user.userId">{{user.username}}</option>
          </select>
          <div class="mdc-select__bottom-line"></div>
        </div>
      </form>
    </section>
    <hr class="mdc-list-divider separating-line">
    <section class="mdc-card__primary">
      <form action="#">
        Choose Language:
        <div class="mdc-select">
          <select class="mdc-select__surface" v-model="chosenLang">
            <option value="">Choose...</option>
            <option v-for="lang in availableLang" v-bind:value="lang">{{lang}}</option>
          </select>
          <div class="mdc-select__bottom-line"></div>
        </div>
      </form>
    </section>
    <hr class="mdc-list-divider separating-line">
    <section class="mdc-card__supporting-text" v-show="tokenList.length > 0">
      <ul class="mdc-list token-list--table-body">
        <li
          class="mdc-list-item token-list--table-row token--wrap-text"
          v-for="token in tokenList">
          {{token}}
        </li>
      </ul>
    </section>
    <section class="mdc-card__actions">
      <button class="mdc-button mdc-button--compact mdc-card__action" v-on:click="retrieveToken()">Punch It!</button>
    </section>
  </div>
</template>

<script lang="ts">

export default {
  data: () => {
    return {
      tokenList: [],
      destUserId: '',
      loading: true,
      chosenDebugUser: '',
      chosenLang: '',
      availableLang: ['zh-hk', 'en'],
      hasToken: false
    }
  },
  created() {
    // this.sendRequest();
  },

  computed: {
    debugUsers () { return this.$store.state.debugUsers; }
  },

  watch: {
    destUserId(val) {
      if (val) { this.chosenDebugUser = ''; }
    },
    chosenDebugUser(val) {
      if (val) { this.destUserId = ''; }
    }
  },

  asyncData ({ store }) {
    return store.dispatch('FETCH_DEBUG_USERS');
  },

  methods: {
    retrieveToken() {

      const finalUrl = `/api/token`;
      const messaging: any = firebase.messaging();

      if (!this.chosenLang || (!this.destUserId && !this.chosenDebugUser)) {
        return;
      }

      if (this.chosenDebugUser) {
        this.destUserId = this.chosenDebugUser;
      }
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          messaging.useServiceWorker(registration);
          messaging.getToken()
            .then((currentToken) => {
              if (currentToken) {
                console.log('get token!');
                console.log(currentToken);
                const payload = {
                  token: currentToken,
                  userId: this.destUserId,
                  lang: this.chosenLang,
                  type: 'web'
                };
                fetch(finalUrl, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(payload)
                })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data)
                  if (data.status === 'failure') {
                    console.log('save web token failure');
                  } else {
                    console.log('save web token success');
                    this.hasToken = true;
                    this.$store.commit('SET_DEVICE_TOKEN', currentToken);
                    this.$store.commit('SET_DEVICE_USER_ID', this.destUserId);
                    localStorage.setItem('userId', this.destUserId);
                    localStorage.setItem('token', currentToken);
                  }
                })
              } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
              }
            })
            .catch(function(err) {
              console.log('An error occurred while retrieving token. ', err);
            });
        });

    }
  }
}
</script>

<style lang="scss">
.separating-line {
  border-bottom-color: rgba(0, 0, 0, 0.12);
}

.token--wrap-text {
  overflow-wrap: break-word;
}

.token-list--table-body {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 300px;
  display: grid;
  max-width: 100%;
}

.token-list--table-row {
  display: inline-block;
  white-space: normal;
  margin-bottom: 8px;
}
</style>
