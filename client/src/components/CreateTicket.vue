<template>
  <div>
    <div :class="{'overlay':!isForm}"></div>
    <div class="create-ticket" :class="{'create-tiket-modal': !isForm}">
      <h2 v-if="!isForm">{{isForm? 'Update': 'Create'}} issue</h2>
      <time-tracking-bar :timeTracking="ticketInfo.timeTracking"></time-tracking-bar>

      <div class="form-control">
        <label for class="label-control">Stage:</label>
        <tmfy-select
          :selectOptions="currentStageList"
          :selectNewOption="selectNewStage"
          :currentObject="currentStageOption"
          :keyvalueprop="{id:'id',text:'header'}"
        ></tmfy-select>
      </div>
      <div class="form-control">
        <label for class="label-control">Project:</label>
        <tmfy-select
          :selectOptions="getContainerLocal({fillContainer:PROJECTS_NAME})"
          :currentObject="projectObject"
          :selectNewOption="selectProject"
          :keyvalueprop="{id:'id',text:'name'}"
        ></tmfy-select>
      </div>
      <div class="form-control form-control-relative">
        <label for class="label-control">Issue type:</label>
        <div>
          <tmfy-select
            :selectOptions="issueTypes"
            :currentObject="issueObject"
            :selectNewOption="selectIssue"
          ></tmfy-select>
          <p
            class="help-text"
          >Some issue types are unavailable due to incompatible field configuration and/or workflow associations.</p>
        </div>
      </div>

      <div class="form-control">
        <label for class="label-control">Summary:</label>
        <input type="text" v-model="ticketInfo.summary" class="input-control" />
      </div>
      <div class="form-control" v-if="componentList">
        <label for class="label-control">Components:</label>
        <multi-select-checkbox
          :selectOptions="selectComponentItem"
          textProp="name"
          :selectedItems="selectedComponentList"
          :filterList="componentList"
        ></multi-select-checkbox>
      </div>

      <div class="form-control" v-if="ticketInfo.ListOfChild">
        <label for class="label-control">Subtasks:</label>

        <div class="subtask-section">
          <div class="subtask-header">
            <div class="subtask-bar"></div>
            <toggle-icon-drop-down></toggle-icon-drop-down>
            <i class="fa fa-plus"></i>
          </div>
          <div v-for="(subtask,index) in ticketInfo.ListOfChild" :key="index">
            <sub-task :currentStageList="currentStageList" :subtask="subtask"></sub-task>
          </div>
        </div>
      </div>
      <div class="form-control">
        <label class="label-control">Attachment:</label>
        <div
          class="drop-section"
          @drop="dropHandler($event)"
          @dragover="dragOverHandler"
          @dragend="dragEndHandler"
          id="dropSection"
        >
          <p>
            <i class="fa fa-cloud-upload"></i> one or more files to this Drop Zone ...
          </p>
        </div>
      </div>
      <attachment
        v-for="(attachment,index) in attachamntList"
        :key="index"
        :fileObject="Object.assign(attachment,{index:index})"
        :removeAttachment="removeAttachment"
      ></attachment>
      <div class="form-control">
        <label for class="label-control">Desciption:</label>
        <text-editor editor="descriptionEditor" ß></text-editor>
      </div>

      <div class="form-control">
        <label for class="label-control">Priority:</label>
        <tmfy-select
          :selectOptions="priorityList"
          :currentObject="priorityObject"
          :selectNewOption="selectPriority"
        ></tmfy-select>
      </div>

      <div class="top-button-group ticket-button-group" v-if="!isForm">
        <button
          class="button"
          :disabled="!ticketInfo.projectId"
          :class="{'disable': !ticketInfo.projectId}"
          @click="saveTicket"
        >{{isForm? 'Update': 'Create'}}</button>
        <button class="button default" @click="closeCreateTicket">Cancel</button>
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
      ticketInfo: { issueType: "task", priority: "low" },
      PROJECTS_NAME: mockupData.PROJECTS_NAME,
      issueTypes: mockupData.ISSUE_TYPES,
      attachamntList: [],
      priorityList: mockupData.PRIORIPTY_LIST,
      priorityObject: { selectId: "priority", ...mockupData.PRIORIPTY_LIST[0] },
      issueObject: { selectId: "issue", ...mockupData.ISSUE_TYPES[0] },
      currentStageList: [],
      currentStageOption: {},
      projectObject: {},
      componentObject: {},
      componentList: [],
      selectedComponentList: [],
      masked: true,
      maskValue: "",
      customInput: ""
    };
  },
  props: {
    isForm: Boolean,
    selecteTicket: Object
  },

  methods: {
    saveTicketLocaly(assignObject) {
      this.ticketInfo = Object.assign(this.ticketInfo, assignObject);
      this.setCommonInformation({
        lastUpdateTicket: this.createDeepCopyOfObject(this.ticketInfo)
      });
    },
    selectComponentItem(selectedItemList) {
      this.saveTicketLocaly({
        componentList: selectedItemList.map(item => item.id).join(",")
      });
    },
    selectNewStage(option) {
      this.saveTicketLocaly({ type: option.id });
      this.currentStageOption = Object.assign(this.currentStageOption, option);
    },
    selectProject(option) {
      this.projectObject = Object.assign(this.projectObject, option);
      this.saveTicketLocaly({
        projectId: this.projectObject.id,
        type: this.getTaskSectionList(this.projectObject)[0].id
      });
    },
    selectIssue(option) {
      this.saveTicketLocaly({ issueType: option.id });
      this.issueObject = Object.assign(this.issueObject, option);
    },
    selectPriority(option) {
      this.saveTicketLocaly({ priority: option.id });
      this.priorityObject = Object.assign(this.priorityObject, option);
    },
    selectComponent(option) {
      this.saveTicketLocaly({ component: option.id });
      this.componentObject = Object.assign(this.componentObject, option);
    },
    priorityColor() {
      return `{'success-text':${true}}`;
    },
    removeAttachment(index) {
      this.attachamntList.splice(index, 1);
    },

    saveTicket() {
      this.saveTicketCommon(
        Object.assign(this.ticketInfo, {
          id: this.createUUID(),
          sprintId: !this.getCommonInformation().cloneTicket
            ? "backlog"
            : this.ticketInfo.sprintId
        })
      );
      this.setCommonInformation({
        cloneTicket: null
      });
      this.closeCreateTicket();
    },
    dropHandler(ev) {
      var target = ev.target;
      if (target.tagName === "P") target = ev.target.parentNode;
      var self = this;
      this.toggleClass(target.id, "dragover");
      ev.preventDefault();
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === "file") {
            var file = ev.dataTransfer.items[i].getAsFile();

            var attachment = { name: file.name, size: file.size };
            file.id = this.createUUID();
            if (file.type.match(/image.*/)) {
              var reader = new FileReader();

              reader.onload = function(e2) {
                // finished reading file data.
                var img = document.createElement("img");
                img.src = e2.target.result;
                img.style.width = "100px";
                // self._id("dropSection").appendChild(img);
                attachment.src = e2.target.result;
              };

              reader.readAsDataURL(file); // start reading the file data.
            }
            this.attachamntList.push(file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        // for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        // console.log(
        //   "... file[" + i + "].name = " + ev.dataTransfer.files[i].name,
        //   ev.dataTransfer.files[i]
        // );
        //}
      }
    },
    dragOverHandler(ev) {
      ev.preventDefault();
      if (ev.target.getAttribute("id")) ev.target.classList.add("dragover");
    },
    dragEndHandler(ev) {
      ev.target.classList.remove("dragover");
    }
  },
  mounted() {
    this.currentStageOption = this.currentStatgeObjectBuilder("stageOption");
    this.componentList = this.getContainerLocal({
      fillContainer: mockupData.COMPONENT_NAME,
      projectId: this.currentProject.id
    });
    if (this.componentList.length > 0) {
      this.componentObject = this.createDeepCopyOfObject(
        Object.assign(this.componentList[0], {
          selectId: "component"
        })
      );
      this.ticketInfo.componentId = this.componentObject.id;
    }
    this.projectObject = { selectId: "project", ...this.currentOrFirstProject };
    this.ticketInfo = Object.assign(this.ticketInfo, {
      projectId: this.projectObject.id,
      type: this.getTaskSectionList(this.projectObject)[0].id
    });
    if (this.selecteTicket || this.getCommonInformation().cloneTicket) {
      const selecteTicket = this.createDeepCopyOfObject(
        this.getCommonInformation().cloneTicket || this.selecteTicket
      );

      this.ticketInfo = selecteTicket;
      this.setCommonInformation({
        lastUpdateTicket: this.createDeepCopyOfObject(this.ticketInfo)
      });
      /**we need to fetch the comments from the db as well
       * and then we can use it for updating if we want to
       */
      this.fetchContainer({
        fillContainer: mockupData.COMMENT_NAME,
        taskId: this.ticketInfo.id
      });
      this.ticketInfo.ListOfChild = this.getContainerWithFilterNew({
        parentId: this.ticketInfo.id
      });
      /**call the builder method for creating the time tracking bar */
      if (selecteTicket.timeTrackingStart) {
        this.timeTrackingMainBuilder(
          this.ticketInfo,
          "time-tracking-spend-ticket",
          "time-tracking-remain-ticket"
        );
      }
      this.issueObject = Object.assign(
        this.issueObject,
        this.filterArrayByProp(
          mockupData.ISSUE_TYPES,
          "id",
          this.ticketInfo.issueType
        )
      );
      this.projectObject = Object.assign(
        this.projectObject,
        this.currentProject
      );
      this.currentStageOption = Object.assign(
        this.currentStageOption,
        this.filterArrayByProp(
          this.currentStageList,
          "id",
          this.ticketInfo.type
        )
      );
      this.priorityObject = Object.assign(
        this.priorityObject,
        this.filterArrayByProp(
          mockupData.PRIORIPTY_LIST,
          "id",
          this.ticketInfo.priority
        )
      );
      const selectedComponent = this.getContainerLocal({
        fillContainer: mockupData.COMPONENT_NAME,
        id: selecteTicket.component
      });

      this.componentObject = Object.assign(
        this.componentObject,
        selectedComponent.length > 0 ? selectedComponent[0] : {}
      );
      if (selecteTicket.componentList)
        this.selectedComponentList = this.componentList.filter(
          item => selecteTicket.componentList.indexOf(item.id) > -1
        );
      if (this.ticketInfo.description)
        this._id("descriptionEditor").innerHTML = this.ticketInfo.description;
    }
  }
});
</script>
<style lang="scss" scoped>
</style>