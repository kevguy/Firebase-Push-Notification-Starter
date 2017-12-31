<template lang="html">
  <div class="demo-grid mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">
        <Registration />
      </div>
      <div class="demo-cell mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-8-tablet">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Registration from '../components/Registration.vue';

export default {
  name: 'authentication-page',

  mounted() {
    console.info('authentication page mounted');
  },

  computed: {
    hasToken() { return this.$store.state.deviceToken !== ''; }
  },

  components: {
    Registration
  }

}
</script>

<style lang="css">
</style>
