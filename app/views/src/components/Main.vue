<template>
    <v-container class="mt-10">
        <Topbar :leftButtons="appButtons" />
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
                <JobIndex />
            </v-tab-item>
            <v-tab-item value="environment">
                <Environment />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import Topbar from "@c/Topbar";
import JobIndex from "@c/jobs/Index";
import Environment from "@c/Environment";
export default {
    name: "Main",
    title: "🖥",
    components: {
      Topbar,
      JobIndex,
      Environment,
    },
    data: () => ({
      appButtons: [
        {
          name: "Backups",
          modal: "Backups",
          icon: "cloud-lock",
          color: "orange darken-1",
        },
        {
          name: "Settings",
          modal: "Settings",
          icon: "cog",
          color: "orange darken-1",
        },
      ],
    }),
};
</script>
