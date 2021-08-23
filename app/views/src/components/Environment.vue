<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-card-text>
        <v-textarea
          name="env"
          class="text-mono"
          label="Environment variables"
          :value="env"
          :auto-grow="true"
          :spellcheck="false"
          hint="Here you can set the PATH, MAILTO, MAILFROM, HOME, etc. environment variables"
          v-on:keyup="envChanged"
        ></v-textarea>
        <v-btn
          class="float-right"
          color="green darken-1"
          text
          @click="show = false"
        >
          <v-icon>mdi-content-save-all</v-icon>
          Backup</v-btn>
        <v-btn
            ref="saveBtn"
            class="float-right"
            color="green darken-1"
            text
            :disabled="isSaveDisabled"
            @click="show = false"
        >
          <v-icon>mdi-content-save</v-icon>
          Save</v-btn>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<style>
textarea {
  font-family: 'Courier New', Courier, monospace;
}
</style>

<script>
  export default {
    name: 'Environment',
    data: () => ({
      env: "",
      isSaveDisabled: true,
    }),
    async beforeCreate() {
      let envResponse = await this.axios.get('env');
      this.env = envResponse.data;
    },
    methods: {
      envChanged(event) {
        this.isSaveDisabled = event.currentTarget.value == this.env;
      }
    }
  }
</script>
