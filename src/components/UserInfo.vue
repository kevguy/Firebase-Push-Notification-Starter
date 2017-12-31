<template lang="html">
  <aside id="my-mdc-dialog"
    class="mdc-dialog"
    role="alertdialog"
    aria-labelledby="my-mdc-dialog-label"
    aria-describedby="my-mdc-dialog-description">
    <div class="mdc-dialog__surface">
      <header class="mdc-dialog__header">
        <h2 id="my-mdc-dialog-label" class="mdc-dialog__header__title">
          Use Google's location service?
        </h2>
      </header>
      <section id="my-mdc-dialog-description" class="mdc-dialog__body">
        Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
      </section>
      <footer class="mdc-dialog__footer">
        <button type="button" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel" v-on:click="closeDialog()">Decline</button>
        <button type="button" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept" v-on:click="closeDialog()">Accept</button>
      </footer>
    </div>
    <div class="mdc-dialog__backdrop"></div>
  </aside>
</template>

<script lang="ts">
export default {
  name: 'UserInfo',
  data() {
    return {
      dialog: undefined
    };
  },
  computed: {
    show() { return this.$store.state.showDialog; }
  },
  mounted () {
    this.dialog = new (<any>window).mdc.dialog.MDCDialog(document.querySelector('#my-mdc-dialog'));
    // this.dialog.show();
  },
  watch: {
    show(val) {
      if (val) {
        console.info('show dialog');
        this.dialog.show();
      } else {
        this.dialog.close();
      }
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit('CLOSE_DIALOG');
    }
  }
}
</script>

<style lang="css">
</style>
