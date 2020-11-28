<template>
  <div
    class="task-item"
    :class="{'task-grabble':!isIssue, 'task-issue':isIssue,'selected-task':taskData.id===(getCommonInformation().currentIssue||{}).id}"
    :draggable="draggable"
    @dragstart="dragStart"
    :id="taskData.id"
    :tabindex="isIssue? 0 : false"
    @click="selectIssue(taskData)"
  >
    <p>{{taskData.summary}}</p>
    <div class="task-footer">
      <div class="issue-priority">
        <i class="fa" :class="{[getListProp(issueTypes,taskData.issueType,'class')]:true}"></i>
        <i
          v-if="!isIssue"
          class="fa"
          :class="{[getListProp(priorityList,taskData.priority,'class')]:true}"
        ></i>
        <span v-if="isIssue">{{taskData.target}}-{{taskData.index}}</span>
      </div>
      <div>
        <span v-if="!isIssue">{{taskData.target}}-{{taskData.index}}</span>
        <i v-if="isIssue" class="fa fa-user-circle"></i>
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
  data() {
    return {
      issueTypes: mockupData.ISSUE_TYPES,
      priorityList: mockupData.PRIORIPTY_LIST
    };
  },
  props: {
    taskData: Object,
    dragStart: { type: Function, default: () => ({}) },
    draggable: Boolean,
    isIssue: Boolean,
    selectIssue: { type: Function, default: () => {} }
  },
  methods: {}
});
</script>
<style lang="sass" scoped>
</style>