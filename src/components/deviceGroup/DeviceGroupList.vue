<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Query Device Group</h1>
      <h2 class="mdc-card__subtitle">Find available device groups from User ID</h2>
    </section>
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="device-group-list-dest-user-id" type="text" class="mdc-text-field__input" v-model="destUserId">
              <label for="device-group-list-dest-user-id" class="mdc-text-field__label">
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
      fetch('https://iceicebaby.com/api/device-group/groups/{{destUserId}}',{<br>
      &ensp;method: 'GET',<br>
      &ensp;headers: {<br>
      &ensp;&ensp;'Accept': 'application/json',<br>
      &ensp;&ensp;'Content-Type': 'application/json',<br>
      &ensp;&ensp;'x-access-token': {{$store.state.authToken}}<br>
      &ensp;}<br>
      });<br>
    </section>
    <hr class="mdc-list-divider separating-line">
    <section class="mdc-card__supporting-text" v-show="groupList.length > 0 || loading">
      <Spinner v-bind:show="loading" />
      <h2 class="mdc-card__subtitle">Result: {{result}}</h2>
      <ul class="mdc-list mdc-list--dense demo-list token-list--table-body">
        <li
          class="mdc-list-item token-list--table-row token--wrap-text"
          v-for="item in groupList">
          <span class="mdc-list-item__text">
            {{item[0]}}
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
  name: 'device-group-list',
  components: { Spinner },
  created() {},
  data() {
    return {
      destUserId: '',
      loading: false,
      groupList: [],
      result: ''
    };
  },
  methods: {
    async sendRequest() {
      const url = `/api/device-group/groups/${this.destUserId}`;
      this.loading = true;
      const res = await fetch(`/api/device-group/groups/${this.destUserId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.$store.state.authToken
        }
      });
      await res.json()
        .then((result) => {
          if (result.status === 'success') {
            console.log(result.result);
            this.groupList = result.result
            this.destUserId = '';
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

<style lang="css">
</style>
