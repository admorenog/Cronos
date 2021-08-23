<template>
	<v-dialog v-model="show"
      persistent
      overlay-color="#111111"
      overlay-opacity="0.8"
      class="mx-auto"
      max-width="80%">
    <v-card>
      {{ title }}
      <v-row>
        <v-col md="6" v-if="hasOldSlot()">
          {{ oldObjLabel }}
          <slot name="old"></slot>
        </v-col>
        <v-col :md="hasOldSlot()?6:12">
          {{ newObjLabel }}
          <slot name="new"></slot>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="action">{{ btnText }}</v-btn>
        <v-btn color="red darken-1" text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { bus } from '@/App';
export default {
  props: {
    event: {
      type: String,
      default: "confirm",
    },
  },
  data: () => ({
    show: false,
    nameEvent: '',
    title: "",
    btnText: "",
    newObjLabel: "",
    oldObjLabel: "",
    data: null,
	}),
  created () {
    var vm = this;
    bus.$on(this.event, function (nameEvent,
                                  title,
                                  textButton,
                                  labelNew = "",
                                  labelOld = "",
                                  data = null) {
      vm.nameEvent = nameEvent;
      vm.title = title;
      vm.btnText = textButton;
      vm.newObjLabel = labelNew;
      vm.oldObjLabel = labelOld;
      vm.data = data;
      vm.show = true;
    });
  },
  methods: {
    action()
    {
      this.show = false;
      bus.$emit(this.nameEvent, this.data);
    },
    close()
    {
      this.show = false;
    },
    hasOldSlot() {
      return !!this.$slots.old;
    }
  }
}
</script>

<style>
.input-monospace input{
  font-family: 'Courier New', Courier, monospace;
}
</style>
