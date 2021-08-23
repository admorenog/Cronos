<template>
  <div width="100%">
    SMTPs
    <v-data-table
      :headers="listOfsmtpSettingsHeaders"
      :items="listOfsmtpSettings"
      :items-per-page="15"
      class="elevation-1"
    >
      <template v-slot:[`header.actions`]>
        <v-btn
          color="accent"
          class="float-right pa-2"
          tile
          @click="newSmtpConfig"
          >
          <v-icon>mdi-plus-thick</v-icon>new SMTP config
        </v-btn>
      </template>
      <template v-slot:item="row">
        <tr>
          <td align="start">{{row.item.name}}</td>
          <td align="start">{{row.item.host}}</td>
          <td align="start">{{row.item.port}}</td>
          <td align="start">{{row.item.secure}}</td>
          <td align="start">{{ row.item.auth.user }}</td>
          <td align="end">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-1"
                  elevation=2 icon
                  x-small tile
                  color="blue"
                  v-bind="attrs"
                  v-on="on"
                  @click="editSmtpConfig(row.index, row.item)">
                    <v-icon dark>mdi-pen</v-icon>
                </v-btn>
              </template>
              <span>Edit</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
              <v-btn class="mx-1"
                elevation=2 icon
                x-small tile
                color="red darken-2"
                v-bind="attrs"
                v-on="on"
                @click="delSmtpConfig(row.index, row.item)">
                  <v-icon dark>mdi-delete</v-icon>
              </v-btn>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </td>
        </tr>
      </template>
    </v-data-table>
    <EditSmtpConfig></EditSmtpConfig>
    <AreYouSure event="confirmDeleteSmtpConfig">
      <template #new>
        <SmtpConfig :config="smtpConfigToDelete" :editable="false"></SmtpConfig>
      </template>
    </AreYouSure>
  </div>
</template>

<script>
import { bus } from '@/App';
import AreYouSure from '@c/modals/AreYouSure';
import SmtpConfig from '@c/settings/SmtpConfig/SmtpConfig';
import EditSmtpConfig from '@c/settings/SmtpConfig/Edit';

export default {
  components: {
    AreYouSure,
    SmtpConfig,
    EditSmtpConfig
  },
  props: {
    mailing : {
      mailOptions: {
        from: "\"${ hostname.toUpperCase() } 🖥\" <user@example.com>",
        to: "user@example.com",
        subject: "Cron ${ job.name } Executed ${ job.output.exitCode==0?\"🙌\":\"🤬❗️\" }",
        text: "${ job.name } ${ job.output.exitCode==0?\"everything ok\":\"something went wrong\" }",
        html: "<b>${ job.name } 🐴</b> ${ job.output.exitCode==0?\"🟢\":\"🔴\" }",
        template: "results.html",
        attach_error: true,
        attach_output: true
      },
      transporter: {
        host: "smtp.example.com",
        port: 465,
        secure: true,
        auth: { user: "user@example.com", pass: "yourpassword" }
      }
    },
    expanded: Boolean,
    editable: Boolean,
  },
  data: () => ({
    listOfsmtpSettingsHeaders: [
      {
        text: 'Name',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Host',
        sortable: true,
        value: 'host'
      },
      {
        text: 'Port',
        sortable: true,
        value: 'port'
      },
      {
        text: 'Secure',
        sortable: true,
        value: 'secure'
      },
      {
        text: 'auth',
        sortable: true,
        value: 'auth',
      },
      {
        sortable: false,
        value: 'actions'
      },
    ],
    listOfsmtpSettings : [],
    smtpConfigToDelete: null,
  }),
  async created () {
    let respListOfSmtpSettings = await this.axios.get('smtp-config');
    this.listOfsmtpSettings = respListOfSmtpSettings.data;

    let vm = this;
    bus.$on('addOnListSmtpConfig', async (smtpConfig) => {
      vm.listOfsmtpSettings.push(smtpConfig);
    });
    bus.$on('updateOnListSmtpConfig', async (index, smtpConfig) => {
      vm.listOfsmtpSettings.splice(index, 1);
      vm.listOfsmtpSettings.splice(index, 0, smtpConfig);
    });
    bus.$on('deleteSmtpConfig', async (data) => {
      await vm.axios.delete(`smtp-config/${data.smtpConfig._id}`);
      vm.listOfsmtpSettings.splice(data.index, 1);
      vm.show = false;
    });
  },
  methods: {
    newSmtpConfig() {
      bus.$emit('editSmtpConfig');
    },
    editSmtpConfig(index, smtpConfig) {
      bus.$emit('editSmtpConfig', index, smtpConfig);
    },
    delSmtpConfig(index, smtpConfig) {
      this.smtpConfigToDelete = smtpConfig;
      bus.$emit(
        "confirmDeleteSmtpConfig",
        "deleteSmtpConfig",
        "Are you sure to delete this smtp configuration?",
        "Delete Smtp configuration",
        null,
        null,
        {index, smtpConfig}
      );
    }
  }
}
</script>
