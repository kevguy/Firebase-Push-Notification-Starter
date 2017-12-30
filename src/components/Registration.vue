<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Sign Up</h1>
      <h2 class="mdc-card__subtitle">Sign up for an user account</h2>
    </section>
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="token-dest-user-id" type="text" class="mdc-text-field__input" v-model="userId">
              <label for="token-dest-user-id" class="mdc-text-field__label">
                User ID
              </label>
              <div class="mdc-text-field__bottom-line"></div>
            </div>
          </div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="token-dest-user-id" type="text" class="mdc-text-field__input" v-model="password">
              <label for="token-dest-user-id" class="mdc-text-field__label">
                Password
              </label>
              <div class="mdc-text-field__bottom-line"></div>
            </div>
          </div>
        </div>
      </form>
    </section>
    <hr class="mdc-list-divider separating-line">
    <section class="mdc-card__actions">
      <button class="mdc-button mdc-button--compact mdc-card__action" v-on:click="signUp()">Sign Up</button>
      <button class="mdc-button mdc-button--compact mdc-card__action" v-on:click="login()">Log in</button>
      <button class="mdc-button mdc-button--compact mdc-card__action" v-show="isAuth" v-on:click="testAuth()">Test Auth</button>
    </section>
  </div>
</template>

<script lang="ts">

export default {
  name: 'registration',
  data: () => {
    return {
      userId: '',
      password: ''
    }
  },
  created() {
    // this.sendRequest();
  },

  computed: {
    isAuth() { return this.$store.state.isAuth; }
  },

  watch: {
  },

  methods: {
    async signUp() {
      if (!this.userId || !this.password) {
        return;
      }

      const payload = {
        userId: this.userId,
        password: this.password
      };

      const url = `/user/signup`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      this.result = await res.json();
      console.log(this.result);
      if (this.result.auth) {
        // save token to state
        this.$store.commit('SAVE_AUTH_TOKEN', this.result.token);
        this.$store.commit('SAVE_USER_ID', this.userId);
      }
    },
    async login() {
      if (!this.userId || !this.password) {
        return;
      };

      const payload = {
        userId: this.userId,
        password: this.password
      };

      const url = `/user/login`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      this.result = await res.json();
      console.log(this.result);
      if (this.result.auth) {
        // save token to state
        this.$store.commit('SAVE_AUTH_TOKEN', this.result.token);
        this.$store.commit('SAVE_USER_ID', this.userId);
      }
    },
    async testAuth() {
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
      this.result = await res.json();
      console.log(this.result);
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
