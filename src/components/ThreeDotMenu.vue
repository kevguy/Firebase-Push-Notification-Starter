<template lang="html">
  <div class="mdc-menu-anchor">
    <div class="mdc-simple-menu" tabindex="-1" id="demo2-menu" style="transform-origin: right top 0px; right: 0px; top: 0px; transform: scale(0, 0);">
      <ul class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true" style="transform: scale(1, 1);">
        <li class="mdc-list-item" role="menuitem" tabindex="0" style="" v-on:click.prevent="openUserInfo()">Info</li>
        <li class="mdc-list-item" role="menuitem" tabindex="0" style="" v-on:click.prevent="logout()">Logout</li>
        <li class="mdc-list-item" role="menuitem" tabindex="0" style="">Back</li>
        <li class="mdc-list-item" role="menuitem" tabindex="0" style="">Forward</li>
        <li class="mdc-list-item" role="menuitem" tabindex="0" style="">Reload</li>
        <li class="mdc-list-divider" role="separator"></li>
        <li class="mdc-list-item" role="menuitem" tabindex="0" style="">Save As...</li>
      </ul>
    </div>
    <UserInfo />
  </div>
</template>

<script lang="ts">
import UserInfo from './UserInfo.vue';

export default {
  name: 'ThreeDotMenu',
  components: { UserInfo },
  props: [ 'show' ],
  data() {
    return {
      menu: undefined,
    };
  },
  mounted () {
    this.menu = new (<any>window).mdc.menu.MDCSimpleMenu(document.querySelector('.mdc-simple-menu'));
    this.menu.open = false;
  },
  watch: {
    show(val) {
      if (val) {
        console.info('show side menu');
        this.menu.open = true;
      } else {
        this.menu.open = false;
      }
    }
  },
  methods: {
    logout() {
      document.cookie = 'iceicebaby' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this.$store.commit('RESET_AUTH');
      this.$router.push({ path: 'signup' });
    },
    openUserInfo() {
      console.log('three dot open dialog');
      this.$store.commit('OPEN_DIALOG');
    }
  }
}
</script>

<style lang="css">
</style>
