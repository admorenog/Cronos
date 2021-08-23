<template>
  <v-card width="100%">
  <v-expansion-panels :value="expanded?0:''" :accordion="false" tile :disabled="!editable">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <span v-if="editedHooks.length">{{ countOfEnabledHooks }} enabled of {{ countOfHooks }} configured</span>
        <span v-else>No hooks configured</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row
          v-for="(hook, idxHook) in editedHooks"
          :key="idxHook">
          <v-col md=1>
            <v-switch v-model="hook.enabled" :disabled="!editable"></v-switch>
          </v-col>
          <v-col>
            <v-text-field
              v-model="hook.name"
              name="hookname"
              label="Name"
              spellcheck="false"
              autocomplete="false"
              class="input-monospace"
              :disabled="!editable"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="hook.command"
              name="command"
              label="Command"
              spellcheck="false"
              autocomplete="false"
              class="input-monospace"
              :disabled="!editable"
            />
          </v-col>
          <v-col md=1>
            <v-btn
              v-if="editable"
              @click="delHook(idxHook)"
              small
              fab
              ><v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col md=11></v-col>
          <v-col md=1>
            <v-btn
              v-if="editable"
              color="success"
              fab
              dark
              small
              @click="addHook"><v-icon>mdi-plus-circle-outline</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </v-card>
</template>

<script>
import _ from '@/lib/helpers';
import { bus } from '@/App';

export default {
  props: {
    hooks : Array,
    expanded: Boolean,
    editable: Boolean,
  },
  data: function () {
    return {
      editedHooks: this.hooks
    };
	},
  computed: {
    countOfEnabledHooks: function() {
      return this.editedHooks.filter(x => x.enabled).length;
    },
    countOfHooks: function() {
      return this.editedHooks.length;
    }
  },
  watch: {
    editedHooks: {
      deep: true,
      handler(editedHooks) {
        bus.$emit('saveHooks', _.cloneObj(editedHooks));
        return editedHooks;
      }
    }
  },
  methods: {
    addHook()
    {
      this.editedHooks = [...this.editedHooks, {name:"", command:"", enabled: false}];
    },
    delHook(idxHook){
      this.editedHooks = this.editedHooks.filter((item, idx) => idx != idxHook);
    }
  }
}
</script>

<style scoped>
.little-switch {
  margin: 0;
  height: 2em;
}
</style>
