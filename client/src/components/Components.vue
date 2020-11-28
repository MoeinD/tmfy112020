<template>
  <div class="component-container">
    <div class="board-header">
      <p>{{capitalizeFirstLetter(PROJECTS_NAME)}} / {{currentProject.name}} /{{currentProject.target}} {{$route.name}}</p>
      <h3>{{capitalizeFirstLetter(currentProject.name)}} {{capitalizeFirstLetter($route.name)}}</h3>
    </div>
    <div>
      <div
        class="grid-header-buttons"
        v-if="(getContainerLocal({fillContainer:gridId, projectId: currentProject.id})||[]).length>0"
      >
        <button class="button" @click="createComponent">Create Component</button>
        <button
          class="button danger"
          :class="{'disable':((getSelectedProjects(gridId))||[]).length===0}"
          :disable="(getSelectedProjects(gridId)||[]).length===0"
          @click="deleteContainerRows(gridId)"
        >Delete</button>
      </div>
      <grid
        :gridId="gridId"
        :filterObject="{fillContainer:gridId , projectId: currentProject.id}"
        :gridRowClick="createComponent"
      ></grid>

      <div
        class="no-componet-section"
        v-if="(getContainerLocal({fillContainer:gridId, projectId: currentProject.id })||[]).length===0"
      >
        <div class="no-component-section-main">
          <img src="../assets/component.svg" alt />
          <h3>This project doesn't have any components, yet</h3>
          <p>Components are subsections of a project. Use them to group issues within a project into smaller parts.</p>
          <button class="button dark" @click="createComponent">Create Component</button>
        </div>
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
      PROJECTS_NAME: mockupData.PROJECTS_NAME,
      gridId: mockupData.COMPONENT_NAME
    };
  },
  methods: {
    /**create a new ticket */
    createComponent(row) {
      this.setCommonInformation({
        showComponentModal: true,
        lastSelectedRow: row
      });
    }
  },
  mounted() {
    this.loadingProjectOnMountOfChild();
  }
});
</script>
<style lang="scss" scoped>
</style>