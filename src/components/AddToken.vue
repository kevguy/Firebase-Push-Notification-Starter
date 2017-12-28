<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Add Token</h1>
      <h2 class="mdc-card__subtitle">Add token to the device group belong to the same user</h2>
    </section>
    <section class="mdc-card__primary">
      <form action="#">
        <div class="demo-radio-row">
          <div class="mdc-form-field">
            <div class="mdc-radio" data-demo-no-js="">
              <input class="mdc-radio__native-control" type="radio" id="token-web" value="web" name="ex1-default" v-model="destType">
              <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"></div>
                <div class="mdc-radio__inner-circle"></div>
              </div>
            </div>
            <label id="token-web-label" for="token-web">Web</label>
          </div>
          <div class="mdc-form-field">
            <div class="mdc-radio" data-demo-no-js="">
              <input class="mdc-radio__native-control" type="radio" id="token-ios" value="ios" name="ex1-default" v-model="destType">
              <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"></div>
                <div class="mdc-radio__inner-circle"></div>
              </div>
            </div>
            <label id="token-ios-label" for="token-web">iOS</label>
          </div>
          <div class="mdc-form-field">
            <div class="mdc-radio" data-demo-no-js="">
              <input class="mdc-radio__native-control" type="radio" id="token-android" value="android" name="ex1-default" v-model="destType">
              <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"></div>
                <div class="mdc-radio__inner-circle"></div>
              </div>
            </div>
            <label id="token-android-label" for="token-android">Android</label>
          </div>
        </div>
      </form>
    </section>
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-text-field mdc-text-field--textarea">
            <textarea
              v-model="destToken"
              id="add-token-dest-token"
              class="mdc-text-field__input"
              rows="8"
              cols="40"
              placeholder="Token"></textarea>
          </div>
        </div>
      </form>
    </section>
    <hr class="mdc-list-divider separating-line">
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
            <option v-for="lang in availableLangs" v-bind:value="lang">{{lang}}</option>
          </select>
          <div class="mdc-select__bottom-line"></div>
        </div>
      </form>
    </section>
    <hr class="mdc-list-divider separating-line">
    <section class="mdc-card__primary">
      <h2 class="mdc-card__subtitle">Result:</h2>
      {{result}}
    </section>
    <section class="mdc-card__actions">
      <button class="mdc-button mdc-button--compact mdc-card__action" v-on:click="addToken()">Punch It!</button>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'add-token',
  data() {
    return {
      destUserId: '',
      loading: true,
      chosenDebugUser: '',
      chosenLang: '',
      destToken: '',
      destType: '',
      result: undefined
    };
  },
  created() {

  },
  computed: {
    debugUsers () { return this.$store.state.debugUsers; },
    availableLangs() { return this.$store.state.availableLangs; }
  },
  watch: {
    destUserId(val) { if (val) { this.chosenDebugUser = ''; } },
    chosenDebugUser(val) { if (val) { this.destUserId = ''; } }
  },
  asyncData ({ store }) {
    return store
      .dispatch('FETCH_DEBUG_USERS')
      .dispatch('FETCH_AVAILABLE_LANGS');
  },
  methods: {
    async addToken() {
      if (!this.chosenLang ||
        (!this.destUserId && !this.chosenDebugUser) ||
        !this.destToken ||
        !this.destType) {
        this.result = 'All fields must be filled!';
        return;
      }

      if (this.chosenDebugUser) {
        this.destUserId = this.chosenDebugUser;
      }

      const payload = {
        type: this.destType,
        lang: this.chosenLang,
        token: this.destToken,
        userId: this.destUserId
      };

      this.loading = true;
      const res = await fetch(`/api/web-token`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log(data);
      if (data.status === 'failure') {
        this.result = 'Failure';
        console.log('save web token failure');
      } else {
        this.result = 'Success';
        console.log('save web token success');
      }
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
  .separating-line {
    border-bottom-color: rgba(0, 0, 0, 0.12);
  }
</style>
