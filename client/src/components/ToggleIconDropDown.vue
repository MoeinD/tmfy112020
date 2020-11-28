<template>
  <div class="toggle-icon-drop-down" v-if="backlog">
    <div
      class="fa"
      :class="{[icon]:icon }"
      :id="backlog.id + 'iconDropDownButton'"
      @click="toggleIconDropDown(backlog.id)"
    ></div>
    <div :id="backlog.id + 'iconDropDown'" class="toggle-area">
      <div
        v-for="(item,index) in list"
        @click="handle_function(item.methodName)"
        :key="index"
      >{{item.displayname}}</div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  data() {
    return {
      test: "test"
    };
  },
  props: {
    toggleIconDropDown: Function,
    backlog: Object,
    icon: String,
    list: Array
  },
  methods: {
    handle_function(methodName) {
      this[methodName](this.backlog);
    }
  }
});
</script>
<style lang="scss" scoped>
</style>