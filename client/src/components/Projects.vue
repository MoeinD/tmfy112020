<template>
  <div class="projects-section">
    <div class="project-header">
      <h2>Projects</h2>
      <div>
        <button class="button" @click="openProjectModal">Create project</button>
        <button
          class="button danger"
          :class="{'disable':((getSelectedProjects(gridId))||[]).length===0}"
          :disable="(getSelectedProjects(gridId)||[]).length===0"
          @click="deleteContainerRows(gridId)"
        >Delete</button>
      </div>
    </div>
    <div class="project-search">
      <div class="search-input">
        <span></span>
        <input type="text" />
        <i class="fa fa-search"></i>
      </div>
      <multi-select-checkbox :filterList="filterList"></multi-select-checkbox>
    </div>
    <grid :gridId="gridId" :gridRowClick="selectTarget" :filterObject="{fillContainer:gridId }"></grid>
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
      gridId: mockupData.PROJECTS_NAME,
      filterList: [
        { id: 1, text: "one", value: 1 },
        {
          id: 2,
          text: "two",
          vlaue: 2
        },
        {
          id: 3,
          text: "three",
          value: 3
        },
        {
          id: 4,
          text: "four",
          value: 4
        },
        {
          id: 5,
          text: "five",
          value: 5
        }
      ]
    };
  },
  methods: {},
  mounted() {
    /**save the local project data to the local storage
     * and while we do not have the real data from the server
     * we can use this logic for mockup for development time
     */
    /**adding the task to the local storage and store as well
     * so we can have access to it in the board of the project
     */

    this.fetchContainer({
      fillContainer: mockupData.PROJECTS_NAME
    });
  },
  computed: {}
});
</script>

<style lang="scss" scoped>
</style>