<template>
  <div id="navbar">
    <div id="logo-section">
      <ul>
        <li>
          <a href>
            <i class="fa fa-th"></i>
          </a>
        </li>
        <li>
          <a href>
            <!-- <div class="tmfy-icon"></div> -->
            <i class="fa fa-tasks"></i>
          </a>
        </li>
        <li>
          <a href>TMFY</a>
        </li>
      </ul>
    </div>
    <div id="nav-left">
      <ul>
        <li>
          <a href>Your work</a>
          <!-- <router-link>Your Work</router-link> -->
        </li>
        <li>
          <!-- <router-link to="/projects"> -->
          <a
            href
            @click="toggleModal($event,PROJECTS_NAME)"
            :class="{'acitveModal':getActiveContainer(PROJECTS_NAME)}"
          >
            Projects
            <i class="fa fa-angle-down"></i>
          </a>

          <!-- </router-link> -->
          <navbar-modal v-if="getActiveContainer(PROJECTS_NAME)" :fillContainer="PROJECTS_NAME"></navbar-modal>
        </li>
        <li>
          <a href>
            Filters
            <i class="fa fa-angle-down"></i>
          </a>
        </li>
        <li>
          <a href>
            Dashboards
            <i class="fa fa-angle-down"></i>
          </a>
        </li>
        <li>
          <router-link to="/people">People</router-link>
        </li>
        <li>
          <a href>
            Apps
            <i class="fa fa-angle-down"></i>
          </a>
        </li>
        <li>
          <button @click="createTicket" class="button light">Create</button>
        </li>
      </ul>
    </div>
    <div id="nav-right">
      <ul>
        <li class="search-input left-icon">
          <input type="text" />
          <i class="fa fa-search"></i>
        </li>
        <li>
          <a href>
            <i class="fa fa-bell"></i>
          </a>
        </li>
        <li>
          <a href>
            <i class="fa fa-question-circle"></i>
          </a>
        </li>
        <li>
          <a href>
            <i class="fa fa-gear"></i>
          </a>
        </li>
        <li>
          <a class="round light">MK</a>
        </li>
      </ul>
    </div>
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
      TASK_NAME: mockupData.TASK_NAME,
      PROJECTS_NAME: mockupData.PROJECTS_NAME
    };
  },
  methods: {
    /**create a new ticket */
    createTicket() {
      this.setCommonInformation({ showTicketModal: true });
    },
    /**toggle the moda  */
    toggleModal(ev, modalName) {
      ev.preventDefault();
      /**add or update the new prop for showing
       * or hiding the modal that we can show
       * the recent task or add new project or the
       * rest that we have in that section.
       */
      /**get current modal state */
      const currentModalState = this.getActiveContainer(modalName);
      this.addContainerLocal([
        {
          fillContainer: mockupData.PROJECTS_NAME,
          [mockupData.ACTIVE_MODAL_PROP]: currentModalState
            ? !currentModalState
            : true
        }
      ]);
    },
    /**get the active container  */
    getActiveContainer(key) {
      return (this.getContainerLocal({ fillContainer: key, all: true }) || {})[
        mockupData.ACTIVE_MODAL_PROP
      ];
    }
  }
});
</script>
<style lang="scss" scoped>
</style>