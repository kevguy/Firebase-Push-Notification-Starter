<template lang="html">
  <aside class="mdc-temporary-drawer mdc-typography">
    <nav class="mdc-temporary-drawer__drawer">
      <header class="mdc-temporary-drawer__header">
        <div class="mdc-temporary-drawer__header-content">
          Header here
        </div>
      </header>
      <div class="mdc-list-group">
      <nav id="icon-with-text-demo" class="mdc-temporary-drawer__content mdc-list">
        <router-link class="mdc-list-item" active-class="mdc-temporary-drawer--selected" tag="a" to="/tokens-info" exact>
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Tokens
        </router-link>
        <router-link class="mdc-list-item" active-class="mdc-temporary-drawer--selected" tag="a" to="/device-group-info" exact>
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Device Groups
        </router-link>
        <router-link class="mdc-list-item" active-class="mdc-temporary-drawer--selected" tag="a" to="/direct-message-info" exact>
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Direct Message
        </router-link>

        <a class="mdc-list-item mdc-temporary-drawer--selected" href="#">
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
        </a>
        <a class="mdc-list-item" href="#">
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
        </a>
      </nav>
      <hr class="mdc-list-divider">
      <nav id="icon-with-text-demo1" class="mdc-temporary-drawer__content mdc-list">

        <a class="mdc-list-item mdc-temporary-drawer--selected" href="#">
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
        </a>
        <a class="mdc-list-item" href="#">
          <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
        </a>
      </nav>
    </div>
    </nav>
  </aside>


</template>

<script lang="ts">
export default {
  name: 'drawer',
  props: [ 'show' ],
  data: () => {
    return {
      drawer: undefined
    };
  },
  mounted () {
    this.drawer = new (<any>window).mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
    this.drawer.open = false;
  },
  watch: {
    show(val) {
      if (val) {
        this.drawer.open = true;
      } else {
        this.drawer.open = false;
      }
    }
  }
}
</script>

<style lang="scss">
</style>
