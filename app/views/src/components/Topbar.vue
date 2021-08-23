<template>
    <v-app-bar app dark class="mb-12">
      <v-row
        align="center"
        justify="center">
        <v-col cols="5">
          <h1 class="d-flex align-center">
            Cronos
          </h1>
        </v-col>
        <v-col cols="2" class="my-0 py-0">
          <v-img height="140px" width="140px" class="logo-margin mx-auto" src="@a/unnamed.png"></v-img>
        </v-col>
        <v-col cols="5">
          <v-row
            align="center"
            justify="end"
            >
            <v-btn
              class="mx-1"
              v-for="appButton in leftButtons"
              v-bind:key="appButton.name"
              outlined tile
              @click.stop="openModal(appButton.modal);"
              :color="appButton.color"
              ><v-icon left>mdi-{{ appButton.icon }}</v-icon>{{ appButton.name }}</v-btn>
          </v-row>
        </v-col>
      </v-row>
      <component v-bind:is="modal"></component>
    </v-app-bar>
</template>

<style>
.logo-margin {
	margin-top:65px;
}
</style>

<script>
  import { bus } from '@/App';
  export default {
    name: 'Topbar',
    data: () => ({
      modalFile: null,
      showDialog: false,
    }),
    props: { leftButtons: Array },
    computed: {
      modal() {
        if(this.modalFile) {
          return () => import(`./topbar/${this.modalFile}`);
        }
        return null;
      }
    },
    methods: {
      openModal(modal) {
        this.modalFile = modal;
        bus.$emit('openModal', true);
      }
    }
  }
</script>
