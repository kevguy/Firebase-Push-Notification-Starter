<template lang="html">
  <div class="demo-grid mdc-layout-grid">
    - Query tokens from a specific device group (choose from available languages), should also the types of the tokens too
    - add token to a specific language group
    - remove token from a specific language group
    - send msg to chosen device group
    - query device group associated to user
    - assign token to another device group
    - regarding choosing device group, let user choose user id and language
    <div class="mdc-layout-grid__inner">
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <DeviceGroupMessage />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <DeviceGroupList />
        <TokenList />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <AddToken />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        Change Token from One Device Group to another
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        Remove Token? Is it too complicated?
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AddToken from '../components/deviceGroup/AddToken.vue';
import DeviceGroupMessage from '../components/deviceGroup/DeviceGroupMessage.vue';
import DeviceGroupList from '../components/deviceGroup/DeviceGroupList.vue';
import TokenList from '../components/deviceGroup/TokenList.vue';

export default {
  name: 'device-group-page',

  mounted() {
    console.log('device-group-page mounted');
  },

  components: {
    AddToken, DeviceGroupMessage,
    DeviceGroupList, TokenList
  }

}
</script>

<style lang="scss">
</style>
