<template>
  <v-dialog v-model="show"
      persistent
      overlay-color="#111111"
      overlay-opacity="0.8"
      class="mx-auto"
      max-width="80%">
    <v-card>
      <v-card-title primary-title>
        {{ title }}
      </v-card-title>
      <v-card-text>
        <SmtpConfig v-if="show" ref="smtpConfig" :config="config" :editable="editable"></SmtpConfig>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!config"
          color="primary darken-1"
          tile
          @click="save">Save</v-btn>
        <v-btn v-else
          color="primary darken-1"
          tile
          @click="update">Update</v-btn>
        <v-btn
          color="primary darken-2"
          outlined tile
          @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
    <AreYouSure event="confirmSaveSmtpConfig">
      <template #new>
        <SmtpConfig v-if="show" :config="$refs.smtpConfig.smtpConfig" :editable="false"></SmtpConfig>
      </template>
    </AreYouSure>
    <AreYouSure event="confirmUpdateSmtpConfig">
      <template #old>
        <SmtpConfig v-if="show" :config="config" :editable="false"></SmtpConfig>
      </template>
      <template #new>
        <SmtpConfig v-if="show" :config="$refs.smtpConfig.smtpConfig" :editable="false"></SmtpConfig>
      </template>
    </AreYouSure>
    <AreYouSure event="confirmDiscardSmtpConfig">
      <template #new>
        <SmtpConfig v-if="show" :config="$refs.smtpConfig.smtpConfig" :editable="false"></SmtpConfig>
      </template>
    </AreYouSure>
  </v-dialog>
</template>

<script>
import _ from '@/lib/helpers';
import { bus } from '@/App';
import AreYouSure from '@c/modals/AreYouSure';
import SmtpConfig from '@c/settings/SmtpConfig/SmtpConfig';

export default {
  components: {
    AreYouSure,
    SmtpConfig
  },
  data: () => ({
    title: "",
    index: null,
    config: null,
    editable: true,
    show: false,
	}),
  async beforeCreate () {
    var vm = this;
    bus.$on('editSmtpConfig', function(index, smtpConfig) {
      if(typeof index != typeof undefined) {
        vm.title = "Edit Smtp config";
        vm.index = index;
        vm.config = _.cloneObj(smtpConfig);
      }
      else {
        vm.title = "New Smtp config";
        vm.config = null;
      }
      vm.show = true;
    });

    bus.$on('saveSmtpConfig', async function () {
      let smtpConfig = vm.$refs.smtpConfig.smtpConfig;
      let responseSmtpConfig = await this.axios.post('smtp-config', smtpConfig);
      smtpConfig = responseSmtpConfig.data;

      bus.$emit("addOnListSmtpConfig", smtpConfig);

      vm.config = null;
      vm.show = false;
    });
    bus.$on('updateSmtpConfig', async function () {
      let smtpConfig = vm.$refs.smtpConfig.smtpConfig;
      let responseSmtpConfig = await this.axios.put(`smtp-config/${smtpConfig._id}`, smtpConfig);
      smtpConfig = responseSmtpConfig.data;

      bus.$emit("updateOnListSmtpConfig", vm.index, smtpConfig);

      vm.config = null;
      vm.show = false;
    });
    bus.$on('discardSmtpConfig', async function () {
      vm.config = null;
      vm.show = false;
    });
  },
  methods: {
    save()
    {
      if(this.$refs.smtpConfig.$refs.form.validate()) {
        bus.$emit(
          "confirmSaveSmtpConfig",
          "saveSmtpConfig",
          "Are you sure to save this smtp configuration?",
          "Save Smtp configuration"
        );
      }
    },
    update()
    {
      if(this.$refs.smtpConfig.$refs.form.validate()) {
        bus.$emit(
          "confirmUpdateSmtpConfig",
          "updateSmtpConfig",
          "Are you sure to update this smtp configuration?",
          "Update Smtp configuration"
        );
      }
    },
    close()
    {
      if(this.isModified()) {
        bus.$emit(
          "confirmDiscardSmtpConfig",
          "discardSmtpConfig",
          "Are you sure to discard this changes in smtp configuration?",
          "Discard unsaved changes"
        );
      }
      else {
        this.show = false;
      }
    },
    isModified() {
      let config = this.config || this.$refs.smtpConfig.defaultSmtpConfig;
      let configAsJson = JSON.stringify(config);
      let smptConfigAsJson = JSON.stringify(this.$refs.smtpConfig.smtpConfig);
      return configAsJson != smptConfigAsJson;
    }
  }
}
</script>

