<template>
  <div>
    <div class="person-section">
      <div class="image-section">{{`${userData.firstname[0]}${userData.lastname[0]}`}}</div>
      <h4>{{userData.firstname}} {{userData.lastname}}</h4>
      <p>{{userData.userId}}</p>
      <p>{{userData.position}}</p>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    userData: Object
  }
});
</script>
<style lang="sass" scoped>
</style>