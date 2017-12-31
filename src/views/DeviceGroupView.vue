<template lang="html">
  <div class="demo-grid mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <AddToken />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <DeviceGroupMessage />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AddToken from '../components/AddToken.vue';
import DeviceGroupMessage from '../components/DeviceGroupMessage.vue';

export default {
  name: 'device-group-page',

  mounted() {
    console.log('device-group-page mounted');
  },

  components: {
    AddToken, DeviceGroupMessage
  }

}
</script>

<style lang="scss">
</style>
