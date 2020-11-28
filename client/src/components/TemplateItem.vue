<template>
  <div class="task-item template-item">
    <div class="template-img">
      <img :src="getImgUrl(templateObject.iconSrc)" alt="TMFY" />
    </div>

    <h3>{{templateObject.header}}</h3>
    <p>{{templateObject.description}}</p>
    <div class="top-button-group">
      <button class="button default" @click="seletTemplate(templateObject.id)">Select</button>
    </div>
  </div>
</template>
<script >
import Vue from "vue";
export default Vue.extend({
  props: {
    templateObject: Object,
    seletTemplate: Function
  },
  methods: {
    getImgUrl(icon) {
      var images = require.context("../assets/", false, /\.svg$/);
      return images("./" + icon);
    }
  }
});
</script>
<style lang="scss" scoped>
</style>