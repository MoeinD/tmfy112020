<template>
  <div
    v-if="getCommonInformation().toast"
    :class="{[getCommonInformation().toastType]:getCommonInformation().toastType}"
    class="toast-section"
  >
    <i v-if="getCommonInformation().toastType" @click="closeToast" class="fa fa-close"></i>
    {{getCommonInformation().toast}}
  </div>
</template>
<script>
import Vue from "vue";
import * as mockupData from "../assets/mockupData";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  methods: {
    closeToast() {
      this.setCommonInformation({
        toastType: "",
        toast: ""
      });
    }
  }
});
</script>
<style lang="scss" scoped>
</style>