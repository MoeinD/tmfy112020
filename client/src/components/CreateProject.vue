<template>
  <div>
    <div class="overlay"></div>
    <div
      class="create-project"
      :class="{'creat-project-only':!getCommonInformation().showTemplate, 'template-area':getCommonInformation().showTemplate}"
    >
      <span class="modal-close" @click="closeCreateProject">&#10005;</span>
      <div v-if="!getCommonInformation().showTemplate">
        <div>
          <h2>Create Project</h2>
          <div class="form-control">
            <label class="label-control" for>Name:</label>
            <input class="input-control" type="text" v-model="projectInfo.name" />
          </div>
          <div class="form-control">
            <label class="label-control" for>Key:</label>
            <input type="text" class="input-control" v-model="projectInfo.key" />
          </div>
          <div class="template-select">
            <label class="label-control" for>Template:</label>
            <img src="../assets/template.svg" alt />
            <div>
              <h3>{{projectInfo.type}}</h3>
              <p>Manage the content lifecycle from draft to delivery ◦ Perfect for content requiring review and approval</p>
              <button
                class="button default"
                @click="setCommonInformation({ showTemplate: true })"
              >Change template</button>
            </div>
          </div>
          <div class="top-button-group">
            <button
              class="button"
              :disabled="!projectInfo.name"
              :class="{'disable': !projectInfo.name}"
              @click="saveProject"
            >Create</button>
            <button class="button default" @click="closeCreateProject">Cancel</button>
          </div>
        </div>
      </div>
      <div class="template-selection" v-if="getCommonInformation().showTemplate">
        <div class="template-selection-header">
          <h3>Choose classic template</h3>
          <p>Classic templates have all the power and functionality you expect. They're created and managed centrally by a TMFY admin using schemes.</p>

          <tmfy-select
            :selectOptions="templateOptions"
            :currentObject="currentTemplateObject"
            :selectNewOption="selectTemplate"
          ></tmfy-select>
        </div>
        <div class="task-section">
          <div
            class="template-section"
            v-for="(template,index) in selectedTemplateList"
            :key="index"
          >
            <template-item :seletTemplate="selectTemplate2" :templateObject="template"></template-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import Vue from "vue";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
import * as mockupData from "../assets/mockupData";
export default mixins(commonMethod).extend({
  data() {
    return {
      projectInfo: { type: "kanban" },
      templateOptions: mockupData.TEMPLATE_MAIN_OPTIONS,
      currentTemplateObject: {
        selectId: "projectTemplate",
        ...mockupData.TEMPLATE_MAIN_OPTIONS[1]
      }
    };
  },
  methods: {
    selectTemplate(option) {
      this.currentTemplateObject = Object.assign(
        this.currentTemplateObject,
        option
      );
    },
    selectTemplate2(type) {
      this.setCommonInformation({ showTemplate: false });
      this.projectInfo.type = type;
    },
    saveProject() {
      this.projectInfo.id = this.createUUID();
      this.projectInfo.target = this.projectInfo.key.toUpperCase();
      this.addOrUpdateItemInStoreAndLS(
        mockupData.PROJECTS_NAME,
        this.projectInfo
      );
      /**hiding the modal for creating the project */
      this.setCommonInformation({ showProjectModal: false });
      /**change the routing to the borard of the new project */
      this.$router.push({
        name: "board",
        params: { id: this.projectInfo.target }
      });
    },
    /**close creating project section */
    closeCreateProject() {
      this.setCommonInformation({ showProjectModal: false });
      this.setCommonInformation({ showTemplate: false });
    }
  },
  computed: {
    selectedTemplateList() {
      const selectedTemplate = this.templateOptions.filter(
        item => item.id === this.currentTemplateObject.id
      );
      if (selectedTemplate.length > 0) return selectedTemplate[0].list;
    }
  }
});
</script>
<style lang="scss" scoped>
</style>