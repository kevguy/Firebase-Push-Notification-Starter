<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Change Language</h1>
      <h2 class="mdc-card__subtitle">Change Language</h2>
    </section>
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="change-lang-dest-user-id" type="text" class="mdc-text-field__input" v-model="destUserId">
              <label for="change-lang-dest-user-id" class="mdc-text-field__label">
                User ID
              </label>
              <div class="mdc-text-field__bottom-line"></div>
            </div>
          </div>
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
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-text-field mdc-text-field--textarea">
            <textarea
              v-model="destToken"
              id="change-lang-token"
              class="mdc-text-field__input"
              rows="8"
              cols="40"
              placeholder="Token"></textarea>
          </div>
        </div>
      </form>
    </section>
    <section class="mdc-card__primary">
      <pre class="prettyprint lang-js">
fetch('https://iceicebaby.com/api/device-group/change-lang',{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': '{{$store.state.authToken}}'
  },
  body: JSON.stringify({
    userId: '{{destUserId}}',
    token: '{{destToken}}',
    targetLang: '{{chosenLang}}'
  })
});
      </pre>
    </section>
    <section class="mdc-card__primary" v-show="result || loading">
      <h2 class="mdc-card__subtitle">Result:</h2>
      {{result}} <Spinner v-bind:show="loading" />
    </section>
    <section class="mdc-card__actions">
      <button class="mdc-button mdc-button--compact mdc-card__action" v-on:click="sendRequest()">Punch It!</button>
    </section>
  </div>
</template>

<script lang="ts">
import Spinner from '../Spinner.vue';

export default {
  name: 'change-lang',
  components: { Spinner },
  created() {},
  data() {
    return {
      chosenLang: 'en',
      availableLang: ['zh-hk', 'en'],
      destUserId: 'test',
      destToken: this.$store.state.webPushToken,
      loading: false,
      result: ''
    };
  },
  methods: {
    async sendRequest() {
      this.result = undefined;
      const payload = {
        userId: this.destUserId,
        token: this.destToken,
        targetLang: this.chosenLang
      };

      const url = `/api/device-group/change-lang`;
      this.loading = true;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.$store.state.authToken
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      this.loading = false;

      console.log(data);

      if (data.status === 'failure') {
        this.result = `Failure`;
      } else {
        this.result = `Success: ${data.result.msg}`;

        if (this.$store.state.webPushToken === this.destToken) {
          const orgLang = localStorage.getItem('chosen_lang');
          if (orgLang !== this.chosenLang) {
            localStorage.setItem('chosen_lang', this.chosenLang);
          }
        }
      }
    }
  }
}
</script>

<style lang="css">
</style>
