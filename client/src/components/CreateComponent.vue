<template>
  <div>
    <div class="overlay"></div>
    <div class="create-component">
      <span class="modal-close" @click="closeCreateComponent">&#10005;</span>
      <div>
        <h2>Create Component</h2>
        <div class="form-control">
          <label class="label-control" for>Name:</label>
          <input class="input-control" type="text" v-model="componentInfo.name" />
        </div>
        <div class="form-control">
          <label for class="label-control">Description:</label>
          <input type="text" class="input-control" v-model="componentInfo.description" />
        </div>
        <div class="top-button-group">
          <button
            class="button"
            :disabled="!componentInfo.name"
            :class="{'disable': !componentInfo.name}"
            @click="saveComponent"
          >{{componentInfo.id ? 'Edit': 'Create'}}</button>
          <button class="button default" @click="closeCreateComponent">Cancel</button>
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
      test: "test",
      componentInfo: {}
    };
  },
  methods: {
    closeCreateComponent() {
      this.setCommonInformation({ showComponentModal: false });
    },
    saveComponent() {
      this.addOrUpdateItemInStoreAndLS(
        mockupData.COMPONENT_NAME,
        Object.assign(this.componentInfo, {
          ...(!this.componentInfo.id ? { id: this.createUUID() } : {}),
          createdDate: new Date(),
          projectId: this.currentProject.id
        })
      );
      this.closeCreateComponent();
    }
  },
  mounted() {
    this.componentInfo = this.createDeepCopyOfObject(
      this.getCommonInformation().lastSelectedRow || {}
    );
  }
});
</script>
<style lang="scss" scoped>
</style>