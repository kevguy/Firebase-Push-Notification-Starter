<template lang="html">
  <div class="mdc-snackbar"
     aria-live="assertive"
     aria-atomic="true"
     aria-hidden="true">
     <div class="mdc-snackbar__text"></div>
     <div class="mdc-snackbar__action-wrapper">
       <button type="button" class="mdc-snackbar__action-button"></button>
     </div>
   </div>
</template>

<script lang="ts">
export default {
  name: 'snack-bar',
  data() {
    return {
      snackbar: undefined
    };
  },
  mounted() {
    this.snackbar = new (<any>window).mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
  },
  computed: {
    showSnackBar() { return this.$store.state.showSnackbar; },
    msgData() { return this.$store.state.snackbarMsg; }
  },
  watch: {
    showSnackBar(val) {
      if (val) {
        const dataObj: any = {
          message: this.msgData.message,
          actionText: this.msgData.actionText,
          actionHandler() {
            console.info('show notification');
          }
        };
        this.snackbar.show(dataObj);
        this.$store.commit('SET_SHOW_SNACKBAR', false);
      }
    }
  }
}
</script>

<style lang="css">
</style>
