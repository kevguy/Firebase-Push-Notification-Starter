<template lang="html">
  <div class="">
    <input type="text" name="" value="" v-model="numOfTimes">
    <button type="button" name="button" v-on:click="sendRequest()">Punch It</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'performance-test',
  data() {
    return {
      numOfTimes: 0
    }
  },
  methods: {
    async sendRequest() {
      const res = await fetch(`/performance-test/${this.numOfTimes}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.$store.state.authToken
        }
      });

      const data = await res.json();
      console.log(data);
      if (data.status === 'failure') {
        this.result = 'Failure';
        console.log('test failure');
      } else {
        this.result = data.result;
        console.log('test success');
      }
    }
  }
}
</script>

<style lang="css">
</style>
