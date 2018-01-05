<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Send to Topic</h1>
      <h2 class="mdc-card__subtitle">Send a message through topic</h2>
    </section>
    <section class="mdc-card__supporting-text" style="font-style: italic;margin-top: 10px;">
      Every token registered is automatically subscribed to the 'test' channel. Use this to send a message and broadcast it to every device.
    </section>
    <hr class="mdc-list-divider separating-line">
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="topic-send-msg-type" type="text" class="mdc-text-field__input" v-model="destType">
              <label for="topic-send-msg-type" class="mdc-text-field__label">
                Type
              </label>
              <div class="mdc-text-field__bottom-line"></div>
            </div>
          </div>
        </div>
      </form>
    </section>
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
              <input id="dtopic-send-msg-msg-title" type="text" class="mdc-text-field__input" v-model="title">
              <label for="topic-send-msg-msg-title" class="mdc-text-field__label">
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
              id="topic-send-msg-msg-message"
              class="mdc-text-field__input"
              rows="8"
              cols="40"
              placeholder="Message Body"></textarea>
          </div>
        </div>
      </form>
    </section>
    <section class="mdc-card__primary" v-show="result || loading">
      <Spinner v-bind:show="loading" />
      <h2 class="mdc-card__subtitle">Result:</h2>
      {{result}}
    </section>
    <section class="mdc-card__actions">
      <button class="mdc-button mdc-button--compact mdc-card__action" v-on:click="sendMessage()">Punch It!</button>
    </section>
  </div>
</template>

<script lang="ts">
import Spinner from '../Spinner.vue';

export default {
  name: 'topic-send-msg',
  components: { Spinner },
  data() {
    return {
      destTopic: '',
      destType: '',
      chosenLang: '',
      title: '',
      message: '',
      result: undefined,

      loading: false,

      chosenDebugUser: ''
    };
  },
  created() {

  },
  mounted() { (<any>window).mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field')); },
  computed: {
    userId() { return this.$store.state.userId; },
    debugUsers () { return this.$store.state.debugUsers; },
    availableLangs() { return this.$store.state.availableLangs; }
  },
  asyncData ({ store }) {
    return store
      .dispatch('FETCH_DEBUG_USERS')
      .dispatch('FETCH_AVAILABLE_LANGS');
  },
  methods: {
    async sendMessage() {
      this.result = undefined;
      this.loading = true;
      // if (!this.chosenLang ||
      //   (!this.destUserId && !this.chosenDebugUser)) {
      //   this.result = 'All fields must be filled!';
      //   return;
      // }
      //
      // if (this.chosenDebugUser) {
      //   this.destUserId = this.chosenDebugUser;
      // }

      const payload = {
        topic: this.destTopic,
        msg: {
          title: this.title,
          body: this.message
        }
      };

      const res = await fetch(`/api/topic-message`, {
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
        this.result = `Success`;
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
