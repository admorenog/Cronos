<template>
	<v-dialog v-model="show"
    persistent
    overlay-color="#111111"
    overlay-opacity="0.8"
    class="mx-auto"
    max-width="50%">
    <Job v-if="show" :job="job" ref="job">
      <template v-slot:title>{{ title }}</template>
      <template v-slot:actions>
        <div v-if="job != null">
          <div v-if="job.schedule">Next execution in: {{ job.schedule }}</div>
          <div v-if="isModified">Not saved*</div>
        </div>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isModified" color="success" @click="saveJob">Save</v-btn>
        <v-btn
          color="red darken-1"
          text
          @click="close"
        >Close</v-btn>
      </template>
    </Job>
    <AreYouSure event="confirmSaveJob">
      <template #new>
        <Job v-if="show" :job="$refs.job.job" :editable="false"></Job>
      </template>
    </AreYouSure>
    <AreYouSure event="confirmUpdateJob">
      <template #old>
        <Job v-if="show" :job="$refs.job.job" :editable="false"></Job>
      </template>
      <template #new>
        <Job v-if="show" :job="$refs.job.job" :editable="false"></Job>
      </template>
    </AreYouSure>
    <AreYouSure event="confirmDiscardJob">
      <template #new>
        <Job v-if="show" :job="$refs.job.job" :editable="false"></Job>
      </template>
    </AreYouSure>
  </v-dialog>
</template>

<script>
import _ from '@/lib/helpers';
import { bus } from '@/App';
import AreYouSure from '@c/modals/AreYouSure';
import Job from '@c/jobs/Job';

export default {
  components: {
    Job,
    AreYouSure
  },
  data: () => ({
    title: "",
    index: null,
    originalJob: null,
    job: null,
    show: false,
	}),
  beforeCreate () {
    var vm = this;

    bus.$on('editJob', function (index, job) {
      if(typeof index != typeof undefined) {
        vm.title = "Edit Job";
        vm.index = index;
        vm.originalJob = _.cloneObj(job);
        vm.job = _.cloneObj(job);
      }
      else {
        vm.title = "New Job";
        vm.originalJob = null;
        vm.job = {};
      }
      vm.show = true;
    });

    bus.$on('saveHooks', function (hooks) {
      vm.$set(vm.job, "hooks", hooks);
    });

    bus.$on('jobSaved', async function (job) {
      vm.$set(vm, "job", job);
      vm.$set(vm, "originalJob", job);
      await vm.axios.post(`jobs`, job);
      bus.$emit("saveJob", vm.index, job);
      vm.show = false;
    });

    bus.$on('jobDiscarted', function () {
      vm.$set(vm, "job", vm.originalJob);
      vm.show = false;
    });

    bus.$on('jobModified', function (job) {
      vm.$set(vm, "job", job);
    });
  },
  watch: {
    job: {
      deep: true,
      handler(job){
        let originalJsonJob = JSON.stringify(this.originalJob || {});
        let currentJsonJob = JSON.stringify(job);
        this.isModified = originalJsonJob != currentJsonJob;
        return job;
      }
    }
  },
  methods: {
    saveJob()
    {
      // bus.$emit('confirmSaveJob', this.originalJob, this.job);

      // if(this.$refs.job.$refs.form.validate()) {
        bus.$emit(
          "confirmSaveJob",
          "jobSaved",
          "Are you sure to save this job?",
          "Save Job",
          "New Job",
          "",
          this.job
        );
      // }
    },
    update()
    {
      if(this.$refs.job.$refs.form.validate()) {
        bus.$emit(
          "confirmUpdateJob",
          "updateJob",
          "Are you sure to update this job?",
          "Update job"
        );
      }
    },
    close()
    {
      if(this.isModified) {
        bus.$emit(
          "confirmDiscardJob",
          "jobDiscarted",
          "Are you sure to discard this changes in job?",
          "Discard unsaved changes"
        );
      }
      else {
        this.show = false;
      }
    }
  }
}
</script>

<style>
.input-monospace input{
  font-family: 'Courier New', Courier, monospace;
}
</style>
