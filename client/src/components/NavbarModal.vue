<template>
  <div class="navbar-modal">
    <div class="recent-section">
      <h4>Recent</h4>
      <div
        class="navbar-modal-item"
        v-for="(item,index) in getContainerLocal({fillContainer:fillContainer})"
        :key="index"
        @click="selectTarget(item, fillContainer)"
      >{{item.name}} ({{item.key}})</div>
    </div>
    <div class="separator"></div>
    <button @click="selectTarget(null, fillContainer,fillContainer)">View all {{fillContainer}}</button>
    <button @click="openProjectModal">Create {{fillContainer}}</button>
  </div>
</template>

<script>
import Vue from "vue";
import * as mockupData from "../assets/mockupData";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  props: {
    fillContainer: String,
    viewAll: Function
  }
});
</script>