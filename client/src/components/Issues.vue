<template>
  <div class="project-container">
    <div class="board-header">
      <p>{{capitalizeFirstLetter(PROJECTS_NAME)}} / {{currentProject.name}} /{{currentProject.target}} {{$route.name}}</p>
      <h3>{{capitalizeFirstLetter(currentProject.name)}} {{capitalizeFirstLetter($route.name)}}</h3>
      <toggle-icon-drop-down></toggle-icon-drop-down>
    </div>
    <div class="issue-container common-project">
      <div class="task-section issue-task-section">
        <div class="task-common">
          <task
            v-for="(todo,index1) in getContainerWithFilterNew({parentId:undefined})"
            :key="index1+'todo'"
            :taskData="Object.assign(todo,{index:allProject.indexOf(todo)+1,target:currentProject.target })"
            :isIssue="true"
            :selectIssue="selectIssue"
          ></task>
        </div>
      </div>
      <div class="issue-details" v-if="currentIssue">
        <issue-tabs :currentIssue="currentIssue"></issue-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import * as mockupData from "../assets/mockupData";
import { PROJECTS_NAME } from "../assets/mockupData";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";

export default mixins(commonMethod).extend({
  data() {
    return {
      TASK_NAME: mockupData.TASK_NAME,
      PROJECTS_NAME: PROJECTS_NAME,
      currentIssue: null,
      ISSUE_TAB_LIST: mockupData.ISSUE_TAB_LIST,
      gridId: mockupData.COMMENT_NAME,
      startAddingComment: false
    };
  },
  methods: {
    selectIssue(taskData) {
      this.commonReset();
      // this.selectedTab = mockupData.ISSUE_TAB_LIST[0];
      setTimeout(() => {
        this.currentIssue = taskData;
        this.setCommonInformation({ currentIssue: this.currentIssue });
      }, 50);
    },

    commonReset() {
      this.currentIssue = null;
      this.setCommonInformation({ currentIssue: null });
      this.setCommonInformation({ lastSelectedRow: null });
    }
  },
  mounted() {
    console.log("mounting the issue component", this.$route.params.id);
    this.loadingProjectOnMountOfChild();
  }
});
</script>
<style lang="scss" scoped>
</style>