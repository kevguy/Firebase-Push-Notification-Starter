<template lang="html">
  <div class="demo-grid mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <DeviceGroupMessage />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <ChangeLang />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <DeviceGroupList />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <TokenList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DeviceGroupMessage from '../components/deviceGroup/DeviceGroupMessage.vue';
import DeviceGroupList from '../components/deviceGroup/DeviceGroupList.vue';
import TokenList from '../components/deviceGroup/TokenList.vue';
import ChangeLang from '../components/deviceGroup/ChangeLang.vue';

export default {
  name: 'device-group-page',
  components: {
    DeviceGroupMessage, DeviceGroupList,
    TokenList, ChangeLang
  }
}
</script>

<style lang="scss">
</style>
