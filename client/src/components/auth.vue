<template>
  <div>
    <div class="modal-common auth">
      <div class="aut-content">
        <div class="form-control">
          <input type="text" class="auth-input-control" placeholder="email" />
        </div>
        <div class="form-control">
          <input type="password" class="auth-input-control" placeholder="password" />
        </div>
        <button class="button aut-botton">login</button>
        <div class="auth-footer">
          <label class="auth-ask">Not registered?</label>
          <label for class="hyperlink">Create an account</label>
        </div>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>
<script>
import Vue from "vue";
import * as mockupData from "../assets/mockupData";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  methods: {}
});
</script>
<style lang="scss" scoped>
</style>