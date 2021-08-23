<template>
  <div>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          :headers="jobHeaders"
          :items="jobs"
          :items-per-page="15"
          class="elevation-1"
          >
          <template v-slot:[`header.actions`]>
            <v-btn
              color="accent"
              class="float-right pa-2"
              tile
              @click="newJob"
              >
              <v-icon>mdi-plus-thick</v-icon>new Job
            </v-btn>
          </template>
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
                <v-tooltip id="logs" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-1"
                      elevation=2 icon
                      x-small tile
                      color="white"
                      v-bind="attrs"
                      v-on="on"
                      @click="showLogsJob(row.index, row.item)">
                        <v-icon dark>mdi-text-box-multiple</v-icon>
                    </v-btn>
                  </template>
                  <span>Logs</span>
                </v-tooltip>
                <v-tooltip id="play" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-progress-circular
                      v-if="isExecManual(row.item)"
                      :size="15"
                      :width="3"
                      :value="50"
                      style="padding-right:14px;padding-left:14px"
                      color="primary"
                    ></v-progress-circular>
                    <v-btn v-else
                      class="mx-1"
                      elevation=2 icon
                      x-small tile
                      color="green"
                      v-bind="attrs"
                      v-on="on"
                      @click="playJob(row.index, row.item)">
                        <v-icon dark>mdi-play</v-icon>
                    </v-btn>
                  </template>
                  <span>Run now</span>
                </v-tooltip>
                <v-tooltip id="stop" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mx-1"
                      elevation=2 icon
                      :disabled="row.item.stopped"
                      x-small tile
                      color="yellow"
                      v-bind="attrs"
                      v-on="on"
                      @click="stopJob(row.index, row.item)">
                        <v-icon dark>mdi-stop</v-icon>
                    </v-btn>
                  </template>
                  <span>Disable</span>
                </v-tooltip>
                <v-tooltip id="edit" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="mx-1"
                      elevation=2 icon
                      x-small tile
                      color="blue"
                      v-bind="attrs"
                      v-on="on"
                      @click="editJob(row.index, row.item)">
                        <v-icon dark>mdi-pen</v-icon>
                    </v-btn>
                  </template>
                  <span>Edit</span>
                </v-tooltip>
                <v-tooltip id="delete" bottom>
                  <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mx-1"
                    elevation=2 icon
                    x-small tile
                    color="red"
                    v-bind="attrs"
                    v-on="on"
                    @click="delJob(row.item)">
                      <v-icon dark>mdi-delete</v-icon>
                  </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <EditJob/>
      <AreYouSure event="showLogs">
        <template #new>
          <Logs v-if="currentJob" :job="currentJob" :index="currentJobIndex"></Logs>
        </template>
      </AreYouSure>
    </v-row>
  </div>
</template>

<script>
  import { bus } from '@/App';
  import EditJob from '@c/jobs/Edit'
  import Logs from '@c/jobs/Logs'
  import AreYouSure from '@c/modals/AreYouSure'
  import moment from 'moment';
  import cron from 'cron';
  export default {
    name: 'Index',
    components: {
      EditJob,
      AreYouSure,
      Logs
    },
    data: () => ({
      jobs : [],
      jobHeaders: [
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
      ],
      executions: [
        {
          _id: "O3gpYLOTnbHVF57K",
          exec_time: 1242,
          avg_time: 2602,
          stdout: "",
          stderr: "",
          from: "scheduler",
          status: "in progress",
          created_at: 1625381652325,
          updated_at: 1625381652625,
        },
        {
          _id: "ZVljt7wgELaccPZk",
          exec_time: 1242,
          avg_time: 2602,
          stdout: "",
          stderr: "",
          from: "manual",
          status: "in progress",
          created_at: 1625381652325,
          updated_at: 1625381652625,
        }
      ],
      currentJobIndex: null,
      currentJob: null,
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
    async beforeCreate() {
      let jobsResponse = await this.axios.get('jobs');
      this.jobs = jobsResponse.data;
      this.setExecInJobs();
    },
    created () {
      var vm = this;
      bus.$on('saveJob', function (index, job) {
        if(!index) {
          index = vm.jobs.length;
        }
        vm.$set(vm.jobs, index, job);
      });
    },
    methods: {
      newJob() {
        bus.$emit('editJob');
      },
      showLogsJob(index, job) {
        this.currentJobIndex = index;
        this.currentJob = job;
        bus.$emit('showLogs', "nameEvent",
                              "Logs",
                              "Ok");
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
