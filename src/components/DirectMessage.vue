<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Send to Single Device</h1>
      <h2 class="mdc-card__subtitle">Send a message to a single device the token belongs to</h2>
    </section>
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-text-field mdc-text-field--textarea">
            <textarea
              v-model="destToken"
              id="direct-message-dest-token"
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
        <div class="demo-radio-row">
          <div class="mdc-form-field">
            <div class="mdc-radio" data-demo-no-js="">
              <input class="mdc-radio__native-control" type="radio" id="direct-message-web" value="web" name="ex1-default" v-model="destType">
              <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"></div>
                <div class="mdc-radio__inner-circle"></div>
              </div>
            </div>
            <label id="direct-message-web-label" for="direct-message-web">Web</label>
          </div>
          <div class="mdc-form-field">
            <div class="mdc-radio" data-demo-no-js="">
              <input class="mdc-radio__native-control" type="radio" id="direct-message-ios" value="ios" name="ex1-default" v-model="destType">
              <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"></div>
                <div class="mdc-radio__inner-circle"></div>
              </div>
            </div>
            <label id="direct-message-ios-label" for="direct-message-web">iOS</label>
          </div>
          <div class="mdc-form-field">
            <div class="mdc-radio" data-demo-no-js="">
              <input class="mdc-radio__native-control" type="radio" id="direct-message-android" value="android" name="ex1-default" v-model="destType">
              <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"></div>
                <div class="mdc-radio__inner-circle"></div>
              </div>
            </div>
            <label id="direct-message-android-label" for="direct-message-android">Android</label>
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
              <input id="direct-message-msg-title" type="text" class="mdc-text-field__input" v-model="title">
              <label for="direct-message-msg-title" class="mdc-text-field__label">
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
              id="direct-message-msg-message"
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
  name: 'direct-message',
  data() {
    return {
      destToken: '',
      destType: '',
      loading: false,
      title: '',
      message: '',
      result: undefined
    };
  },
  watch: {
    destToken(val) { console.log(val); },
    destType(val) { console.log(val); }
  },
  methods: {
    async sendMessage() {
      if (!this.destToken ||
        !this.destType) {
        this.result = 'All fields must be filled!';
        return;
      }

      const payload = {
        title: this.title,
        message: this.message,
        token: this.destToken,
        type: this.destType
      };

      const res = await fetch(`/api/direct-message`, {
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
