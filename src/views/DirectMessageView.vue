<template lang="html">
  <div class="demo-grid mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <DirectMessage />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DirectMessage from '../components/DirectMessage.vue';

export default {
  name: 'direct-message-page',

  // async beforeMount() {
  //   const authToken = localStorage.getItem('authToken');
  //   const userId = localStorage.getItem('userId');
  //   const result = await store.dispatch('UPDATE_AUTH_STATE', { authToken , userId });
  // },

  mounted() {
    console.log('direct-message-page mounted');
  },

  components: {
    DirectMessage
  }

}
</script>

<style lang="css">
</style>
