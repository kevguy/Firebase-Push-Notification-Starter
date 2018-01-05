<template lang="html">
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large">Send Welcome Message</h1>
      <h2 class="mdc-card__subtitle">Send a welcome message with different languages</h2>
    </section>
    <section class="mdc-card__supporting-text" style="font-style: italic;margin-top: 10px;">
      Send a message to a language group. If a token'e language preference matches,
      the device it's belong to will receive the message.
    </section>
    <section class="mdc-card__actions">
      <button class="mdc-button mdc-button--compact mdc-card__action" v-on:click="sendMessage()">Punch It!</button>
    </section>
  </div>
</template>

<script lang="ts">
import Spinner from '../Spinner.vue';

export default {
  name: 'topic-send-welcome-msg',
  components: { Spinner },
  data() {
    return {
      result: undefined,
      loading: false
    };
  },
  created() {

  },
  mounted() { (<any>window).mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field')); },
  computed: {
    userId() { return this.$store.state.userId; },
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

      const res = await fetch(`/api/welcome-message`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.$store.state.authToken
        }
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
