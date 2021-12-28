<template>
  <v-dialog v-model="showLogs">
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          :headers="logHeaders"
          :items="logs"
          :items-per-page="15"
          class="elevation-1"
          >
          <template v-slot:item="row">
            <tr>
              <td align="start">{{ row.item.name }}</td>
              <td align="start">{{ row.item.schedule }}</td>
              <td align="start">
                <span>{{ row.item.schedule | nextExec | formatDate('DD/MM/YYYY hh:mm') }}</span>
                <v-progress-linear
                  v-if="isExecByScheduler(row.item)"
                  :size="20"
                  :width="5"
                  :value="70"
                  color="primary"
                ></v-progress-linear>
              </td>
              <td align="start">{{ row.item.command }}</td>
              <td align="centered">{{ row.item.updated_at | moment | formatDate }}</td>
              <td align="end">

              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
  import { bus } from '@/App';
  import moment from 'moment';
  import cron from 'cron';
  export default {
    name: 'Logs',
    components: {
    },
    props: {
      job: Object,
      index: Number,
    },
    data: () => ({
      showLogs: false,
      logs : [],
      logHeaders: [
        {
          text: 'Name',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Schedule',
          sortable: true,
          value: 'schedule',
          width: "9em",
        },
        {
          text: 'Next execution',
          sortable: true,
          value: 'nextexec',
          width: "13em",
        },
        {
          text: 'Command',
          sortable: true,
          value: 'command'
        },
        {
          text: 'Updated at',
          sortable: true,
          value: 'timestamp',
          width: "15em",
        },
        {
          text: 'actions',
          sortable: false,
          value: 'actions',
          width: "15em",
        },
      ]
    }),
    filters: {
      moment(timestamp) {
        return moment(new Date(timestamp));
      },
      formatDate: function (moment, format = 'DD/MM/YYYY hh:mm:ss') {
        return moment.format(format);
      },
      nextExec(cronExecutionTime) {
        return (new cron.CronJob(cronExecutionTime)).nextDates();
      },
    },
    async created () {
      var vm = this;
      bus.$on('showLogs', async function (job) {
        let logs = await vm.getLogs(job);
        vm.$set(vm.logs, logs);
        vm.showLogs = true;
      });
      bus.$on('saveJob', function (index, job) {
        if(!index) {
          index = vm.jobs.length;
        }
        vm.$set(vm.jobs, index, job);
      });
      this.logs = await this.getLogs(vm.job);
    },
    methods: {
      showLogsJob(index, job) {
        console.log(index, job);
      },
      playJob(index, job) {
        console.log(index, job);
      },
      stopJob(index, job) {
        console.log(index, job);
      },
      editJob(index, job) {
        bus.$emit('editJob', index, job);
      },
      delJob(job) {
        console.log("deleting", job)
        // TODO: show confirm
      },
      async getLogs(job = null) {
        let url = "logs/jobs";
        if(job){
          url = `${url}/${job._id}`;
        }
        let logsResponse = await this.axios.get(url);
        return logsResponse.data;
      },
      isExecByScheduler(job) {
        return job.executions && job.executions.filter(item =>
          item._id == job._id && item.from == "scheduler"
        ).length > 0;
      },
      isExecManual(job) {
        return job.executions && job.executions.filter(item =>
          item._id == job._id && item.from == "manual"
        ).length > 0;
      },
      setExecInJobs() {
        this.jobs = this.jobs.map(job => {
          job.executions = this.executions.filter(exec => exec._id == job._id);
          return job;
        });
      },
    }
  }
</script>
