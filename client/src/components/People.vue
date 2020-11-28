<template>
  <div class="people-main-section">
    <div class="top-button-group">
      <a class="button default">Mange users</a>
      <a class="button default">Start a team</a>
      <a class="button">Add People</a>
    </div>
    <div class="search-section">
      <input type="text" />
      <i class="fa fa-search"></i>
    </div>
    <div class="people-section">
      <div v-for="(person, index) in userList" :key="index">
        <person :userData="person"></person>
      </div>
    </div>
    <div class="team-section">
      <team></team>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      userList: [
        {
          id: 1,
          firstname: "Mohammad",
          lastname: "Karimi",
          position: "Web Developer",
          userId: "mohammadmoein",
          email: "karimi.mohammad1977@gmail.com"
        },
        {
          id: 2,
          firstname: "Taher",
          lastname: "Jafari",
          email: "t.jafari@gmail.com"
        }
      ]
    };
  }
});
</script>
<style lang="sass" scoped>
</style>