<template>
  <v-card v-if="modifiedJob != null">
    <v-card-title>
      <slot name="title"></slot>
    </v-card-title>
    <v-list-item id="name">
      <v-list-item-icon>
        <v-icon>mdi-calendar-check</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        <v-text-field
          name="name"
          spellcheck="false"
          class="input-monospace"
          v-model="modifiedJob.name"
          :disabled="!editable"
          :rules="rules.name"
        />
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item id="command">
      <v-list-item-icon>
        <v-icon>mdi-console-line</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        <v-text-field
          name="command"
          label="Command"
          spellcheck="false"
          class="input-monospace"
          v-model="modifiedJob.command"
          :disabled="!editable"
        />
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item id="schedule">
      <v-list-item-icon>
        <v-icon>mdi-calendar-clock</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>
        <v-text-field
          name="schedule"
          label="Schedule"
          spellcheck="false"
          class="input-monospace"
          v-model="modifiedJob.schedule"
          :disabled="!editable"
        />
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item id="mail">
      <v-list-item-icon><v-icon>mdi-email</v-icon></v-list-item-icon>
      <Email :mailing="modifiedJob.mailing" :expanded="mailExpanded" :editable="editable"/>
    </v-list-item>
    <v-list-item id="hooks">
      <v-list-item-icon>
        <v-icon>mdi-hook</v-icon>
      </v-list-item-icon>
      <Hooks :hooks="modifiedJob.hooks || []" :expanded="hooksExpanded" :editable="editable"/>
    </v-list-item>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import _ from '@/lib/helpers';
import { bus } from '@/App';
import Email from '@c/jobs/Email';
import Hooks from '@c/jobs/Hooks';
export default {
  props: {
    job: {
      type: Object,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    mailExpanded: {
      type: Boolean,
      default: false,
    },
    hooksExpanded: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    index: null,
    modifiedJob: null,
    rules: {
      name: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ]
    }
	}),
  created() {
    this.setJobs(this.job);
    var vm = this;
    bus.$on('saveHooks', function (hooks) {
      vm.$set(vm.modifiedJob, 'hooks', hooks);
    });
  },
  watch: {
    modifiedJob: {
      deep: true,
      handler(modifiedJob) {
        bus.$emit("jobModified", modifiedJob);
        return modifiedJob;
      }
    },
    job: {
      handler(job) {
        let jobAsJson = JSON.stringify(job);
        let modifiedJobAsJson = JSON.stringify(this.modifiedJob);
        // Update the modifiedJob just when is different to avoid a loop between watchers-events
        if(jobAsJson != modifiedJobAsJson)
        {
          this.setJobs(job)
        }
      }
    }
  },
  methods: {
    setJobs(job = {})
    {
      this.originalJob = _.cloneObj(job);
      this.modifiedJob = _.cloneObj(job);
    }
  },
  components: {
    Email,
    Hooks
  },
}
</script>

<style>
.input-monospace input{
  font-family: 'Courier New', Courier, monospace;
}
</style>
