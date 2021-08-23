<template>
  <v-card width="100%">
  <v-expansion-panels  :value="expanded?0:''" :accordion="false" tile :disabled="!editable">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-row
          justify="start"
        >
          <v-col md="1">
            <v-switch class="little-switch" :value="enabled" :disabled="!editable"></v-switch>
          </v-col>
          <v-col align="start">
            <span v-if="enabled">mail config</span>
            <span v-else>No mail configured</span>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card>
          <v-card-title>
            SMTP configuration
          </v-card-title>
          <v-select
            name="mail"
            label="Mail"
            :items="mailConfigs"
            value=""
            :disabled="!editable"
          >
            <template v-slot:item="{ item, attrs, on }">
              <v-list-item
                v-bind="attrs"
                v-on="on"
              >
                <v-list-item-title
                  :id="attrs['aria-labelledby']"
                  v-text="item.name"
                ></v-list-item-title>
              </v-list-item>
            </template>
          </v-select>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-card>
</template>

<script>

export default {
  props: {
    expanded: Boolean,
    editable: Boolean,
    mailConfig: null,
    enabled: Boolean,
  },
  data: () => ({
    mailConfigs: [],
  }),
  async created() {
    let responseMailConfigs = await this.axios.get('smtp-config');
    this.mailConfigs = responseMailConfigs.data;
  },
}
</script>

<style scoped>
.little-switch {
  margin: 0;
  height: 2em;
}
</style>
