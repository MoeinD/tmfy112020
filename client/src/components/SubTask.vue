<template>
  <div class="subtask-container">
    <div>
      <span>{{subtask.target}}-{{subtask.newIndex}}</span>
      <div>
        <span>{{subtask.summary}}</span>
      </div>
    </div>
    <div>
      <i class="fa" :class="{[getListProp(priorityList,subtask.priority,'class')]:true}"></i>
      <tmfy-select
        :selectOptions="currentStageList"
        :selectNewOption="selectNewSubtaskStage"
        :currentObject="currentStageOptionSub"
        :keyvalueprop="{id:'id',text:'header'}"
        :subSection="true"
      ></tmfy-select>
    </div>
  </div>
</template>
<script>
import * as mockupData from "../assets/mockupData";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
import Vue from "vue";
export default mixins(commonMethod).extend({
  data() {
    return {
      priorityList: mockupData.PRIORIPTY_LIST,
      currentStageOptionSub: {}
    };
  },
  props: {
    subtask: Object,
    currentStageList: Array
  },
  methods: {
    selectNewSubtaskStage(option) {
      console.log("this is the new option ", option);
      this.currentStageOptionSub = Object.assign(
        this.currentStageOptionSub,
        option
      );
      /**we need to save the value in the store as well
       * and use the task id and new value as the type pass
       * to the store that will update the state.
       */
      this.saveTicketCommon({
        id: this.subtask.id,
        type: option.id
      });
    }
  },
  mounted() {
    this.currentStageOptionSub = Object.assign(
      this.currentStatgeObjectBuilder(`${this.subtask.id}stageOption`),
      this.filterArrayByProp(this.currentStageList, "id", this.subtask.type)
    );
  }
});
</script>
<style lang="scss" scoped>
</style>