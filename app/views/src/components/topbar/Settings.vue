<template>
	<v-dialog
      v-model="show"
      overlay-color="#111111"
      overlay-opacity="0.8"
    >
    <v-card>
      <v-card-title>
        <span class="headline">Settings</span>
      </v-card-title>
      <v-card-text>
        <SmtpConfigIndex></SmtpConfigIndex>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary darken-2"
          outlined tile
          @click="show = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { bus } from '@/App';
import SmtpConfigIndex from '@c/settings/SmtpConfig/Index.vue'

export default {
  components: {
    SmtpConfigIndex
  },
  data: () => ({
    show: true
	}),
  created () {
    var vm = this;
    bus.$on('openModal', function (value) {
      vm.show = value;
    });
  }
}
</script>
