<template>
  <div class="component-container">
    <div class="board-header">
      <p>{{capitalizeFirstLetter(PROJECTS_NAME)}} / {{currentProject.name}} /{{currentProject.target}} {{$route.name}}</p>
      <h3>{{capitalizeFirstLetter(currentProject.name)}} {{capitalizeFirstLetter($route.name)}}</h3>
    </div>
    <div class="search-input">
      <input type="text" />
      <i class="fa fa-search"></i>
    </div>
    <div class="backlog-main-area">
      <div>
        <button class="button dark" @click="createSprint">Create sprint</button>
      </div>
      <div class="sprint-roolup-selected-ticket">
        <div class="backlog-rollup-container">
          <div
            class="rollup-section"
            v-for="(backlog,index) in [...(getCurrnetSprintList||[]),...[{id:'backlog',name:'Backlog'}]]"
            :key="index"
          >
            <div
              :id="backlog.id"
              @drop="dropHandler($event)"
              @dragover="dragOverHandler"
              @dragend="dragEndHandler"
              @dragleave="dragEndHandler"
              class="rollup-header"
              @click="toggleRollup(backlog.id)"
            >
              <div>
                <i :id="backlog.id +'icon'" class="fa fa-caret-right rollupIcon"></i>
                <div class="sprint-name">{{backlog.name}}</div>
                <div
                  class="sprint-issue-number"
                >{{`${(getContainerWithFilterNew({sprintId: backlog.id, parentId:undefined})||[]).length} issue`}}</div>
                <span v-if="(getActiveSprint||{}.id) ===backlog.id">(Active)</span>
              </div>
              <div>
                <button
                  class="button dark"
                  :class="{'disable':getActiveSprint || (getContainerWithFilterNew({sprintId: backlog.id, parentId:undefined})||[]).length===0}"
                  @click="activeSprint(backlog.id)"
                  v-if="(isSprintReadyToStart||{}).id ===backlog.id"
                  :disabled="getActiveSprint || (getContainerWithFilterNew({sprintId: backlog.id, parentId:undefined})||[]).length===0"
                >Start Sprint</button>
                <i @click="createTicketForSprint(backlog.id)" class="fa fa-plus-circle"></i>
                <toggle-icon-drop-down
                  v-if="backlog.id !=='backlog'"
                  icon="fa-ellipsis-h"
                  :backlog="backlog"
                  :toggleIconDropDown="toggleIconDropDownCaller"
                  :list="sprintDropDownlist(backlog.id)"
                ></toggle-icon-drop-down>
              </div>
            </div>
            <div :id="backlog.id + 'internal'" class="rollup-internal">
              <div
                v-for="(ticket,index2) in getContainerWithFilterNew({sprintId: backlog.id, parentId:undefined})"
                :key="index2"
                @click="selecteSprintTicket(ticket)"
              >
                <div
                  :class="{'selected-task':ticket.id ===(currentIssue||{}).id,'selected-flagged-ticket':(ticket.id ===(currentIssue||{}).id)&&ticket.flagged , 'flagged-ticket':ticket.flagged}"
                  class="rollup-ticket-section"
                  :id="ticket.id"
                  draggable
                  @dragstart="dragStart"
                  @drop="dropHandler($event,true)"
                  @dragover="dragOverHandler"
                  @dragend="dragEndHandler"
                  @dragleave="dragEndHandler"
                >
                  <div>
                    <i
                      class="fa"
                      :class="{[getListProp(issueTypes,ticket.issueType,'class')]:true}"
                    ></i>
                    <span>{{ticket.summary}}</span>
                  </div>
                  <div>
                    <i
                      class="fa"
                      :class="{'fa-flag flag-icon':ticket.flagged, [getListProp(priorityList,ticket.priority,'class')]:!ticket.flagged}"
                    ></i>
                    <span>{{ticket.target}}-{{ticket.index}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="selected-sprint-ticket" v-if="currentIssue">
            <issue-tabs :currentIssue="currentIssue"></issue-tabs>
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
      PROJECTS_NAME: mockupData.PROJECTS_NAME,
      SPRINT_NAME: mockupData.SPRINT_NAME,
      sprintInfo: {},
      currentIssue: null,
      issueTypes: mockupData.ISSUE_TYPES,
      priorityList: mockupData.PRIORIPTY_LIST,
      sprintDropDownlistOriginal: mockupData.SPRINT_DROP_DOWN_LIST
    };
  },
  methods: {
    dragOverHandler(ev) {
      ev.preventDefault();
      if (ev.target.getAttribute("id")) ev.target.classList.add("dragover");
    },
    dragEndHandler(ev) {
      ev.target.classList.remove("dragover");
    },
    dropHandler(ev, same) {
      ev.preventDefault();
      this.toggleClass(ev.target.id, "dragover");
      const dropId = ev.target.id;
      // Get the id of the target and add the moved element to the target's DOM
      const dragId = ev.dataTransfer.getData("text/plain");
      if (dragId && dropId && !same)
        this.saveTicketCommon({ id: dragId, sprintId: dropId });
      else if (same && dragId && dropId) {
        const dropItem = this.getContainerWithFilterNew({ id: dropId });
        const dropIndex = this.allProject.indexOf(dropItem[0]);
        const containerObject = {
          id: dragId,
          sprintId: dropItem[0].sprintId,
          newIndex: dropIndex + 1
        };
        this.saveTicketCommon(containerObject);
      }
    },
    dragStart(ev) {
      ev.dataTransfer.setData("text/plain", ev.target.id);
      //  ev.dataTransfer.dropEffect = "copy";
      ev.dataTransfer.effectAllowed = "copy";
      /**adding the dragging class to the parent of the other section */
      this.toggleDraggingClass(ev.target.parentNode.id, "dragging", true);
    },
    activeSprint(id) {
      this.activeStopper();
      this.addOrUpdateItemInStoreAndLS(mockupData.SPRINT_NAME, {
        id: id,
        iActive: true
      });
    },

    createTicketForSprint(sprintId) {
      this.activeStopper();
      this.currentIssue = null;
      setTimeout(() => {
        this.currentIssue = {
          id: this.createUUID(),
          projectId: this.currentProject.id,
          sprintId: sprintId,
          type: this.getTaskSectionList(this.currentProject)[0].id
        };
        this.setCommonInformation({
          currentIssue: this.currentIssue
        });
      }, 50);
    },

    selecteSprintTicket(ticket) {
      console.log("this is the ticket ", ticket);
      this.currentIssue = null;
      setTimeout(() => {
        this.currentIssue = Object.assign({}, ticket);
      }, 50);
    },
    createSprint() {
      /**we need to pass the row id so we can track the position of the spring in the list  */
      const lastItem =
        this.getCurrnetSprintList[this.getCurrnetSprintList.length - 1] || {};
      this.addOrUpdateItemInStoreAndLS(mockupData.SPRINT_NAME, {
        id: this.createUUID(),
        createdDate: new Date(),
        projectId: this.currentProject.id,
        name: `SCRM Sprint ${(lastItem.rowid || 0) + 1}`,
        rowid: (lastItem.rowid || 0) + 1,
        iActive: false
      });
    },
    toggleRollup(id) {
      /**check if we have set the stopper */
      if (this.checkStopper()) return;
      if (this.getContainerWithFilterNew({ sprintId: id }).length === 0) return;
      /**toggle the section */
      this.toggleItem(id + "internal");
      /**toggle the icon */
      this.toggleItem(id + "icon");
    },
    sprintDropDownlist(id) {
      if ((this.getActiveSprint || {}).id === id)
        return this.sprintDropDownlistOriginal.filter(x => !x.flag);
      const result = this.isFirstOrLastOrReadyToStart(id);
      if (result === "notDown")
        return this.sprintDropDownlistOriginal.filter(x => x.flag !== "down");
      if ((this.isSprintReadyToStart || {}).id === id)
        return this.sprintDropDownlistOriginal.filter(x => x.flag !== "up");
      return this.sprintDropDownlistOriginal;
    }
  },
  computed: {
    getNotActiveSprintList() {
      return this.getContainerLocal({
        fillContainer: this.SPRINT_NAME,
        projectId: this.currentProject.id,
        iActive: false
      });
    },

    isSprintReadyToStart() {
      if ((this.getNotActiveSprintList || []).length > 0) {
        return this.getNotActiveSprintList[0];
      }
    }
  },
  mounted() {
    this.loadingProjectOnMountOfChild();
  }
});
</script>
<style lang="sass" scoped>
</style>