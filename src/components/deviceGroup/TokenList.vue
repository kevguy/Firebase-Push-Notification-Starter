<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Query List of Tokens</h1>
      <h2 class="mdc-card__subtitle">Retrieve list of tokens from a specific device group</h2>
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
    <section class="mdc-card__supporting-text" v-show="tokenList.length > 0 || loading">
      <Spinner v-bind:show="loading" />
      <ul class="mdc-list mdc-list--two-line mdc-list--dense demo-list token-list--table-body">
        <li
          class="mdc-list-item token-list--table-row token--wrap-text device-group-token-list--list-item"
          v-for="item in tokenList">
          <span class="mdc-list-item__text">
            {{item.type}} - {{item.lang}}
            <span class="mdc-list-item__secondary-text">{{item.token}}</span>
          </span>
        </li>
      </ul>
    </section>
    <section class="mdc-card__actions">
      <button class="mdc-button mdc-button--compact mdc-card__action" v-on:click="sendRequest()">Punch It!</button>
    </section>
  </div>
</template>

<script lang="ts">
import Spinner from '../Spinner.vue';

export default {
  name: 'device-group-token-list',
  components: { Spinner },
  created() {},
  data() {
    return {
      chosenLang: '',
      availableLang: ['zh-hk', 'en'],
      destUserId: '',
      loading: false,
      tokenList: [],
      result: ''
    };
  },
  methods: {
    async sendRequest() {
      const url = `/api/device-group/tokens/${this.userId}/${this.chosenLang}`;
      this.loading = true;
      const res = await fetch(`/api/device-group/tokens/${this.destUserId}/${this.chosenLang}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.$store.state.authToken
        }
      });
      await res.json()
        .then((result) => {
          console.log(result);
          if (result.status === 'success') {
            console.log(result);
            this.tokenList = result.result
            this.destUserId = '';
            this.chosenLang = '';
            this.result = 'Success';
          } else {
            this.result = result.status;
          }
        })
        .catch((err) => {
          this.result = err;
        });
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">

li.mdc-list-item.token-list--table-row.token--wrap-text.device-group-token-list--list-item {
  height: auto;
}


</style>
