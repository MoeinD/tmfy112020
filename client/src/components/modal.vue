<template>
  <div>
    <div class="modal">
      <div class="modal-header">
        <i class="fa fa-close" @click="cancelMethod"></i>
      </div>
      <div class="modal-content">
        <p>Are you really want to delete?</p>
      </div>
      <div class="modal-button">
        <button class="button" @click="cancelMethod">Cancel</button>
        <button class="button danger" @click="deletePrompt">Delete</button>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>
<script >
import Vue from "vue";
export default Vue.extend({
  props: {
    cancelMethod: {
      type: Function,
      required: true
    },
    deletePrompt: {
      type: Function,
      required: true
    }
  }
});
</script>
<style lang="scss" scoped>
</style>