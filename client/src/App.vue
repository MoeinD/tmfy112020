<template>
  <div>
    <create-project v-if="getCommonInformation().showProjectModal"></create-project>
    <create-ticket v-if="getCommonInformation().showTicketModal"></create-ticket>
    <create-component v-if="getCommonInformation().showComponentModal"></create-component>

    <toast></toast>
    <navbar></navbar>
    <modal v-if="getModalInfo.show" :cancelMethod="callingCloseModal" :deletePrompt="deletePrompt"></modal>
    <tmfy-modal v-if="getCommonInformation().showModal"></tmfy-modal>
    <div class="main-section">
      <router-view></router-view>
    </div>
    <loader v-if="getLoader().counter >0"></loader>
  </div>
</template>

<script>
import Vue from "vue";
import * as mockupData from "./assets/mockupData";
import commonMethod from "./components/commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  computed: {},
  methods: {
    callingCloseModal() {
      this.setModalInfo({ show: false });
    },
    /**get the list of the selected item using the grid id and delerte them */
    deletePrompt() {
      console.log("deleting the sprint ", this.getModalInfo.gridId);
      this.deleteContainerRow({
        fillContainer: this.getModalInfo.gridId,
        Row: this.getSelectedProjects(this.getModalInfo.gridId)
      });
      this.callingCloseModal();
    }
  },
  mounted() {
    // this.addingContainerBuilder(
    //   mockupData.PROJECTS_NAME,
    //   mockupData.PROJECT_DATA
    // );
    // this.addingContainerBuilder(mockupData.TASK_NAME, mockupData.TASK_DATA);
    // this.addingContainerBuilder(
    //   mockupData.COMMENT_NAME,
    //   mockupData.COMMENT_DATA
    // );
    // this.addingContainerBuilder(
    //   mockupData.COMPONENT_NAME,
    //   mockupData.COMPONENT_DATA
    // );
    // this.addingContainerBuilder(mockupData.SPRINT_NAME, mockupData.SPRINT_DATA);
    /**create the drop down */
    this.createCustomDropDown();
  }
});
</script>


<style lang="scss">
@import "./styles/main.scss";
</style>
