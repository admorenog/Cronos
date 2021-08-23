<template>
	<v-dialog v-model="show">
    <v-card>
      <v-card-title class="justify-center">Backups</v-card-title>
      <v-card-text>
        <v-tabs icons-and-text fixed-tabs>
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#jobs">
            Jobs
            <v-icon>mdi-hammer</v-icon>
          </v-tab>
          <v-tab href="#environment">
            Environment
            <v-icon>mdi-earth</v-icon>
          </v-tab>
          <v-tab-item value="jobs">
            <v-card>
              <v-card-text>
                <v-data-table
                  :headers="backupHeaders"
                  :items="backups"
                  :items-per-page="15"
                  class="elevation-1"
                  >
                </v-data-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="show = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
          <v-tab-item value="environment">
            <v-card>
              <v-card-text>
                <v-data-table
                  :headers="backupHeaders"
                  :items="backups"
                  :items-per-page="15"
                  class="elevation-1"
                  >
                </v-data-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="show = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { bus } from '@/App';

export default {
  data: () => ({
    backupHeaders: [
      {
        text: 'Name',
        sortable: true,
        value: 'name'
      }
    ],
    backups: [],
    show: true
	}),
	async beforeCreate() {
    let backupsResponse = await this.axios.get('backups');
    this.backups = backupsResponse.data;
	},
  created () {
    var vm = this;
    bus.$on('openModal', function (value) {
      vm.show = value;
    });
  }
}
</script>
