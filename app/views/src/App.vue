<template>
  <v-app dark>
    <Topbar :leftButtons="[]"/>
    <v-main>
      <Main/>
    </v-main>
  </v-app>
</template>

<script>
import Main from '@c/Main';
import Topbar from '@c/Topbar';
import Vue from 'vue';

export default {
  name: 'App',
  components: {
    Main,
    Topbar
  }
};
export const bus = new Vue();
</script>
<style>
.v-application {
    background-color: var(--v-background-base) !important;
}
</style>
