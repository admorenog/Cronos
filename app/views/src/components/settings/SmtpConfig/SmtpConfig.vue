<template>
  <v-form ref="form">
    <v-list-item id="name">
      <v-list-item-icon>
        <v-icon>mdi-mail</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        <v-text-field
          name="name"
          spellcheck="false"
          class="input-monospace"
          label="Name"
          v-model="smtpConfig.name"
          :disabled="!editable"
          :rules="rules.name"
        />
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item id="host">
      <v-list-item-icon>
        <v-icon>mdi-desktop-classic</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        <v-text-field
          name="host"
          label="Host"
          spellcheck="false"
          class="input-monospace"
          v-model="smtpConfig.host"
          :disabled="!editable"
          :rules="rules.host"
        />
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item id="port">
      <v-list-item-icon>
        <v-icon>mdi-ship-wheel</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        <v-text-field
          name="port"
          label="Port"
          spellcheck="false"
          class="input-monospace"
          v-model="smtpConfig.port"
          :disabled="!editable"
          type="number"
          :rules="rules.port"
        />
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item id="secure">
      <v-list-item-icon>
        <v-icon>mdi-lock</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        <v-col md="1">
          <v-switch
          label="Secure"
          class="little-switch"
          v-model="smtpConfig.secure"
          :disabled="!editable"></v-switch>
        </v-col>
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item id="username">
      <v-list-item-icon>
        <v-icon>mdi-account</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        <v-text-field
          name="username"
          label="Auth username"
          spellcheck="false"
          class="input-monospace"
          v-model="smtpConfig.auth.user"
          :disabled="!editable"
        />
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item id="password">
      <v-list-item-icon>
        <v-icon>mdi-key</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        <v-text-field
          name="password"
          label="Password"
          spellcheck="false"
          class="input-monospace"
          counter
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          v-model="smtpConfig.auth.password"
          :disabled="!editable"
        />
      </v-list-item-subtitle>
    </v-list-item>
  </v-form>
</template>

<script>
import _ from '@/lib/helpers';
export default {
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    config: Object
  },
  data: () => ({
    showPassword: false,
    smtpConfig: {
      name: "",
      host: "",
      port: 465,
      secure: true,
      auth: {
        user: "",
        password: ""
      },
    },
    defaultSmtpConfig: {
      name: "",
      host: "",
      port: 465,
      secure: true,
      auth: {
        user: "",
        password: ""
      },
    },
    rules: {}
	}),
  async created() {
    let smtpConfig = this.config ? _.cloneObj(this.config) : _.cloneObj(this.defaultSmtpConfig);
    this.smtpConfig = smtpConfig;
    this.rules = {};
    let componentResponse = await this.axios.get('__component/definition/SmtpConfig');
    let rules = _.getRulesFromDefinition(componentResponse.data[0]);
    this.rules = {...this.rules, ...rules};
  },
}
</script>

<style scoped>
.input-monospace input{
  font-family: 'Courier New', Courier, monospace;
}
.little-switch {
  margin: 0;
  height: 2em;
}
</style>
