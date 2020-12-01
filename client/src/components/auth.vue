<template>
  <div>
    <div class="modal-common auth" :class="{'login' : isloginModal}">
      <div class="aut-content">
        <div v-if="!isloginModal">
          <div class="form-control">
            <input type="text" class="auth-input-control" placeholder="First Name" />
          </div>
          <div class="form-control">
            <input type="text" class="auth-input-control" placeholder="Last Name" />
          </div>
        </div>
        <div class="form-control">
          <input type="text" class="auth-input-control" placeholder="email" />
        </div>
        <div class="form-control">
          <input type="password" class="auth-input-control" placeholder="password" />
        </div>
        <button class="button aut-botton" @click="login()">{{isloginModal ? `login` : 'signup'}}</button>
        <div class="auth-footer">
          <label class="auth-ask">{{isloginModal ? 'Have an account' : 'Not registered?'}}</label>
          <label
            for
            class="hyperlink"
            @click="toggleToRegister"
          >{{isloginModal ? 'Back To Login' : 'Create an account'}}</label>
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
  data() {
    return {
      isloginModal: true,
      authObject: {
        firstName: null,
        lastName: null,
        email: null,
        password: null
      }
    };
  },
  methods: {
    toggleToRegister() {
      this.isloginModal = !this.isloginModal;
    }
  }
});
</script>
<style lang="scss" scoped>
</style>