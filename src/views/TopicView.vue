<template lang="html">
  <div class="demo-grid mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <SendMsg />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <BroadcastMsg />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <WelcomeMsg />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SendMsg from '../components/topic/SendMsg.vue';
import BroadcastMsg from '../components/topic/BroadcastMsg.vue';
import WelcomeMsg from '../components/topic/WelcomeMsg.vue';


export default {
  name: 'topic-page',

  mounted() {
    console.log('topic page mounted');
  },

  components: {
    SendMsg, BroadcastMsg, WelcomeMsg
  }

}
</script>

<style lang="scss">
</style>
