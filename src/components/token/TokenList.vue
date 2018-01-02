<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Get List of Tokens</h1>
      <h2 class="mdc-card__subtitle">Retrieve list of tokens depending on User ID</h2>
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
      fetch('https://iceicebaby.com/api/tokens/{{destUserId || chosenDebugUser}}')
    </section>
    <section class="mdc-card__supporting-text" v-show="tokenList.length > 0 || loading">
      <Spinner v-bind:show="loading" />
      <ul class="mdc-list mdc-list--two-line mdc-list--dense demo-list token-list--table-body">
        <li
          class="mdc-list-item token-list--table-row token--wrap-text"
          v-for="item in tokenList">
          <span class="mdc-list-item__text">
            {{item.type}} ({{item.lang}})
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
  components: {
    Spinner
  },
  data: () => {
    return {
      tokenList: [],
      destUserId: '',
      loading: false,
      chosenDebugUser: ''
    }
  },
  created() {
    // this.sendRequest();
  },

  computed: {
    debugUsers () {
      return this.$store.state.debugUsers;
    }
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
    sendRequest() {
      if (this.chosenDebugUser) {
        this.destUserId = this.chosenDebugUser;
      }
      console.log('retrieving token');
      const finalUrl = `/api/tokens/${this.destUserId}`;
      this.loading = true;
      fetch(finalUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.$store.state.authToken
        }
      })
      .then(res => res.json())
      .then((data) => {
        this.loading = false;
        console.log(data)
        if (data.status === 'failure') {
          this.tokenList = [];
        } else {
          this.tokenList = data.result;
          // this.tokenList = Object.keys(data.result).map((key) => {
          //   return {
          //     token: key,
          //     type: data.result[key].type,
          //     lang: data.result[key].lang
          //   }
          // });
          console.log(data);
        }
      })
      .catch((err) => {
        this.loading = false;
        console.error(err);
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

    span {
      max-width: 100%;
    }
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
