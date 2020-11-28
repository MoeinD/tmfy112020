<template>
  <div>
    <div class="modal tmfy-modal">
      <div class="tmfy-modal-header">
        <div class="tmfy-title">Time tracking</div>
        <i class="fa fa-close" @click="cancelMethod"></i>
      </div>
      <time-tracking-bar :timeTracking="timeTracking"></time-tracking-bar>
      <div class="time-tacking-input">
        <div class="time-tacking-control">
          <label for class>Time spent</label>
          <input
            type="text"
            v-model="timeTracking.spend"
            class="input-control-tracking"
            @keyup="checkTimeTracking"
          />
        </div>
        <div class="time-tacking-control">
          <label for class>Time remaining</label>
          <input
            type="text"
            v-model="timeTracking.remain"
            class="input-control-tracking"
            @keyup="checkTimeTracking"
          />
        </div>
      </div>
      <div class="top-button-group">
        <button
          class="button"
          :class="{'disable' : ! timeTracking.isValid}"
          :disabled="!timeTracking.isValid"
          @click="saveTimeTrack"
        >Save</button>
        <button class="button default" @click="cancelMethod">Cancel</button>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>
<script>
import Vue from "vue";
import * as mockupData from "../assets/mockupData";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  props: {},
  data() {
    return {
      timeTracking: {
        spend: "",
        remain: "",
        isValid: false,
        timeTrackingSpend: {},
        timeTrackingRemain: {},
        timeTrackingSpendId: "time-tracking-spend",
        timeTrackingRemainId: "time-tracking-remain"
      },
      destinationObject: {}
      //  timeTrackinSpend: {},
      //  timeTrackingRemain: {}
    };
  },
  methods: {
    saveTimeTrack() {
      /**we need to save the current log work in the DB
      and then we need to save the current date/time */
      let timeTrackingObject = {};
      timeTrackingObject.timeTrackingStart = this.moment()
        .subtract(
          this.timeTracking.timeTrackingSpend.resultInMin || 0,
          "minutes"
        )
        .toISOString();
      if (this.timeTracking.timeTrackingRemain.resultInMin > 0)
        timeTrackingObject.timeTrackingEnd = this.moment()
          .add(this.timeTracking.timeTrackingRemain.resultInMin, "minutes")
          .toISOString();

      /**save the timeTracking start/end */
      this.saveTicketCommon({
        id: this.getCommonInformation().currentIssueId,
        ...timeTrackingObject
      });
      this.cancelMethod();
    },
    cancelMethod() {
      this.setCommonInformation({
        showModal: false
      });
    },
    checkTimeTracking() {
      if (
        this.checkTimeTrackCommon(this.timeTracking.spend) &&
        this.checkTimeTrackCommon(this.timeTracking.remain)
      ) {
        this.timeTracking.isValid = true;
        this.timeTrackingBuilder();
      } else {
        this.timeTracking.isValid = false;
      }
    },
    timeTrackingBuilder() {
      this.timeTracking.timeTrackingSpend = this.helperMethodForGettingWorkLog(
        this.timeTracking.spend
      );
      this.timeTracking.timeTrackingRemain = this.helperMethodForGettingWorkLog(
        this.timeTracking.remain
      );
      setTimeout(() => {
        this.timeTrackingLoaderBuilder(this.timeTracking);
      }, 50);
    },
    checkTimeTrackCommon(tracking) {
      const regex = mockupData.TIME_TRACKING_REGEX;
      return regex.test(tracking) || !tracking;
    }
  },
  mounted() {
    const currentTicket = this.getContainerLocal({
      fillContainer: mockupData.TASK_NAME,
      id: this.getCommonInformation().currentIssueId
    });
    console.log("crrent ticket ", currentTicket);

    if ((currentTicket || []).length > 0) {
      this.destinationObject = currentTicket[0];
      if (this.destinationObject.timeTrackingStart) {
        this.timeTrackingMainBuilder(
          this.destinationObject,
          this.timeTracking.timeTrackingSpendId,
          this.timeTracking.timeTrackingRemainId
        );
        this.timeTracking = this.destinationObject.timeTracking;
        /**create the value for the remain and spend input modal */
        this.timeTracking.spend = this.timeTracking.timeTrackingSpend.timeTrackResult.replace(
          / /g,
          ""
        );
        this.timeTracking.remain = this.timeTracking.timeTrackingRemain.timeTrackResult.replace(
          / /g,
          ""
        );
      }
    }
  }
});
</script>
<style lang="scss" scoped>
</style>