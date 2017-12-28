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

  components: {
    DirectMessage
  }

}
</script>

<style lang="css">
</style>
