<template lang="html">
  <aside id="my-mdc-dialog"
    class="mdc-dialog"
    role="alertdialog"
    aria-labelledby="my-mdc-dialog-label"
    aria-describedby="my-mdc-dialog-description">
    <div class="mdc-dialog__surface">
      <header class="mdc-dialog__header">
        <h2 id="my-mdc-dialog-label" class="mdc-dialog__header__title" style="color: black;">
          User Info
        </h2>
      </header>
      <section id="my-mdc-dialog-description" class="mdc-dialog__body">
        <ul class="mdc-list mdc-list--two-line mdc-list--dense demo-list token-list--table-body">
          <li class="mdc-list-item token-list--table-row token--wrap-text">
            <span class="mdc-list-item__text">
              User ID:
              <span class="mdc-list-item__secondary-text">{{this.$store.state.userId}}</span>
            </span>
          </li>
          <li class="mdc-list-item token-list--table-row token--wrap-text">
            <span class="mdc-list-item__text">
              Auth Token:
              <span class="mdc-list-item__secondary-text">{{this.$store.state.authToken}}</span>
            </span>
          </li>
          <li class="mdc-list-item token-list--table-row token--wrap-text">
            <span class="mdc-list-item__text">
              WebPush Token:
              <span class="mdc-list-item__secondary-text">{{this.$store.state.webPushToken}}</span>
            </span>
          </li>
        </ul>
      </section>
      <footer class="mdc-dialog__footer">
        <button type="button" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept" v-on:click="closeDialog()">Close</button>
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

<style lang="scss">
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
