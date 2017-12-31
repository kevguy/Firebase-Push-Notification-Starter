<template lang="html">
  <div class="demo-grid mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet" v-show="!hasToken">
        <Token />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <TokenList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TokenList from '../components/TokenList.vue';
import Token from '../components/Token.vue';


export default {
  name: 'token-page',

  mounted() {
    console.log('token page mounted');
  },

  computed: {
    hasToken() { return this.$store.state.deviceToken !== ''; }
  },

  components: {
    Token, TokenList
  }

}
</script>

<style lang="css">
</style>
