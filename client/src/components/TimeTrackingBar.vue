<template>
  <div class="time-tracker-holder" v-if="timeTracking">
    <div class="time-tracker-container" v-if="timeTracking.isValid">
      <div class="timer-icon">
        <i class="fa fa-clock-o"></i>
      </div>
      <div class="time-tracker">
        <div :id="timeTracking.timeTrackingSpendId" class="time-tracker-spend"></div>
        <div :id="timeTracking.timeTrackingRemainId" class="time-tracker-remain"></div>
      </div>
      <div class="time-tracking-result">
        <div>{{timeTracking.timeTrackingSpend.timeTrackResult}} logged</div>
        <div
          v-if="(timeTracking.timeTrackingRemain ||{}).timeTrackResult"
        >{{timeTracking.timeTrackingRemain.timeTrackResult}} remaining</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import * as mockupData from "../assets/mockupData";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  props: {
    timeTracking: Object
  }
});
</script>
<style lang="scss" scoped>
</style>