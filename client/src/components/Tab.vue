<template>
  <div class="tab-container">
    <div
      class="tab-display-name"
      v-for="(tab,index) in tabList"
      @click="selectTheTab(tab)"
      :key="index"
      :class="{'selecte-tab':(selectedTab||{}).id===tab.id}"
    >{{tab.text}}</div>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      test: "test"
    };
  },
  props: {
    tabList: Array,
    selectTheTab: Function,
    selectedTab: Object
  }
});
</script>
<style lang="sass" scoped>
</style>