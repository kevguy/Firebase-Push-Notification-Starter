<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Send to Device Group</h1>
      <h2 class="mdc-card__subtitle">Send a message to the device group the user belongs to</h2>
    </section>
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="device-group-dest-user-id" type="text" class="mdc-text-field__input" v-model="destUserId">
              <label for="device-group-dest-user-id" class="mdc-text-field__label">
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
      <form action="#">
        <div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="device-group-msg-title" type="text" class="mdc-text-field__input" v-model="title">
              <label for="device-group-msg-title" class="mdc-text-field__label">
                Title
              </label>
              <div class="mdc-text-field__bottom-line"></div>
            </div>
          </div>
        </div>
        <div>
          <div class="mdc-text-field mdc-text-field--textarea">
            <textarea
              v-model="message"
              id="device-group-msg-message"
              class="mdc-text-field__input"
              rows="8"
              cols="40"
              placeholder="Message Body"></textarea>
          </div>
        </div>
      </form>
    </section>
    <section class="mdc-card__primary">
      <h2 class="mdc-card__subtitle">Result:</h2>
      {{result}}
    </section>
    <section class="mdc-card__actions">
      <button class="mdc-button mdc-button--compact mdc-card__action" v-on:click="sendMessage()">Punch It!</button>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'device-group-msg',
  data() {
    return {
      destUserId: '',
      loading: true,
      chosenDebugUser: '',
      chosenLang: '',
      title: '',
      message: '',
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
    async sendMessage() {
      if (!this.chosenLang ||
        (!this.destUserId && !this.chosenDebugUser)) {
        this.result = 'All fields must be filled!';
        return;
      }

      if (this.chosenDebugUser) {
        this.destUserId = this.chosenDebugUser;
      }

      const payload = {
        userId: this.destUserId,
        title: this.title,
        message: this.message,
        lang: this.chosenLang
      };

      const res = await fetch(`/api/custom-message`, {
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
        this.result = data.result;
        console.log('save web token success');
      }
    }
  }
}
</script>

<style lang="scss">
  .separating-line {
    border-bottom-color: rgba(0, 0, 0, 0.12);
  }
</style>
