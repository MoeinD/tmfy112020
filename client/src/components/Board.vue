<template>
  <div class="project-container">
    <div class="board-header">
      <p>{{capitalizeFirstLetter(PROJECTS_NAME)}} / {{currentProject.name}} /{{currentProject.target}} {{$route.name}}</p>
      <h3>{{capitalizeFirstLetter(currentProject.name)}} {{capitalizeFirstLetter($route.name)}}</h3>
    </div>
    <div class="search-input">
      <input type="text" />
      <i class="fa fa-search"></i>
    </div>
    <div class="task-section common-project">
      <div
        v-for="(taskSection,index) in getTaskSectionList(currentProject)"
        :key="index+'tasksection'"
        class="task-common"
        @drop="drop_handler($event)"
        @dragover="dragover_handler($event)"
        @dragleave="dragend_handler($event)"
        @dragend="dragend_handler($event)"
        @dragenter="dragenter_handler($event)"
        :id="taskSection.id"
      >
        <h4>{{taskSection.header}} {{(getLitOfTaskInSection(taskSection)||[]).length}}</h4>

        <task
          v-for="(todo,index1) in getLitOfTaskInSection(taskSection)"
          :key="index+index1+'todo'"
          :dragStart="dragStart"
          :draggable="true"
          :taskData="Object.assign(todo,{index:allProject.indexOf(todo)+1,target:currentProject.target })"
        ></task>
        <div v-if="taskSection.creating" class="task-create">
          <button v-if="!updateMode" @click="createTask" class="create-button">
            <i class="fa fa-plus"></i>Create
          </button>
          <div v-if="updateMode">
            <input type="text" v-model="inputText" id="taskInput" />
            <div class="button-area">
              <button
                class="button"
                :class="{'disable':!inputText}"
                @click="saveTask"
                :disabled="!inputText"
              >Save</button>
              <button class="button default" @click="updateMode=false">Cancel</button>
            </div>
          </div>
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
      TASK_NAME: mockupData.TASK_NAME,
      PROJECTS_NAME: mockupData.PROJECTS_NAME,
      updateMode: false,
      inputText: null,
      taskSectionList: []
    };
  },
  methods: {
    /**drag start handler */
    dragStart(ev) {
      ev.dataTransfer.setData("text/plain", ev.target.id);
      //  ev.dataTransfer.dropEffect = "copy";
      ev.dataTransfer.effectAllowed = "copy";
      /**adding the dragging class to the parent of the other section */
      this.toggleDraggingClass(ev.target.parentNode.id, "dragging", true);
    },
    /**drop event */
    drop_handler(ev, index) {
      ev.preventDefault();
      // Get the id of the target and add the moved element to the target's DOM
      const data = ev.dataTransfer.getData("text/plain");
      this.toggleDraggingClass(data, "dragging");
      this.toggleClass(data, "dragover");
      this.toggleClass(ev.target.id, "dragover");
      let containerObject = null;
      if (
        data &&
        this.checkForTaskArea(
          ev.target.id,
          this.getTaskSectionList(this.currentProject)
        )
      ) {
        containerObject = { id: data, type: ev.target.id };
      } else {
        /**getting the info of the dorp item */

        const dropItem = this.getContainerWithFilterNew({ id: ev.target.id });
        if (dropItem.length > 0) {
          const dropIndex = this.allProject.indexOf(dropItem[0]);
          containerObject = {
            id: data,
            type: dropItem[0].type,
            newIndex: dropIndex + 1
          };
        }
      }

      if (containerObject) {
        this.addOrUpdateItemInStoreAndLS(mockupData.TASK_NAME, containerObject);
      }
    },
    /**drag over handlder */
    dragover_handler(ev) {
      ev.preventDefault();
      /**add the section for adding the droggoing style */
      if (ev.target.getAttribute("id")) ev.target.classList.add("dragover");
    },
    /**drag end handler */
    dragend_handler(ev) {
      ev.target.classList.remove("dragover");
    },
    dragenter_handler(ev) {},
    /**open the section for creatig the task */
    createTask() {
      this.updateMode = true;
      setTimeout(() => {
        this._id("taskInput").focus();
      }, 50);
    },
    saveTask() {
      this.updateMode = false;
      this.addOrUpdateItemInStoreAndLS(mockupData.TASK_NAME, {
        id: this.createUUID(),
        type: "todo",
        description: this.inputText,
        projectId: this.currentProject.id
      });
    },
    getLitOfTaskInSection(taskSection) {
      const isScrum =
        (this.getCommonInformation().currentProject || {}).type === "scrum";
      if (!isScrum)
        return this.getContainerWithFilterNew({ type: taskSection.id });
      else {
        if (this.getActiveSprint) {
          return this.getContainerWithFilterNew({
            type: taskSection.id,
            sprintId: this.getActiveSprint.id
          });
        }
      }
    }
  },
  computed: {},
  mounted() {
    this.loadingProjectOnMountOfChild();
  }
});
</script>
<style lang="stylus" scoped></style>