<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Send to Multiple Topics</h1>
      <h2 class="mdc-card__subtitle">Send a message through topics</h2>
    </section>
    <hr class="mdc-list-divider separating-line">
    <section class="mdc-card__primary">
      <form action="#">
        <div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="topics-send-msg-type" type="text" class="mdc-text-field__input" v-model="destTopics">
              <label for="topics-send-msg-type" class="mdc-text-field__label">
                Topic
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
        <div>
          <div class="mdc-form-field">
            <div class="mdc-text-field" data-mdc-auto-init="MDCTextField">
              <input id="topics-send-msg-msg-title" type="text" class="mdc-text-field__input" v-model="title">
              <label for="topics-send-msg-msg-title" class="mdc-text-field__label">
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
              id="topics-send-msg-msg-message"
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
  name: 'topics-send-msg',
  components: { Spinner },
  data() {
    return {
      destTopics: 'welcome__zh_hk,welcome__en,test',
      title: '',
      message: '',
      result: undefined,

      loading: false
    };
  },
  created() {},
  mounted() { (<any>window).mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field')); },
  computed: {
    userId() { return this.$store.state.userId; }
  },
  methods: {
    async sendMessage() {
      this.result = undefined;
      this.loading = true;

      const topics = this.destTopics.split(',');
      console.log(this.destTopics);
      console.log(topics);

      const payload = {
        topics,
        msg: {
          title: this.title,
          body: this.message
        }
      };

      const res = await fetch(`/api/multi-topics`, {
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
