<template>
  <div>
    <div class="issue-details" v-if="currentIssue">
      <div class="issue-details-header">
        <div class="top-button-group ticket-button-group">
          <toggle-icon-drop-down
            icon="fa-ellipsis-h"
            :backlog="currentIssue"
            :toggleIconDropDown="toggleIconDropDownCaller"
            :list="ticketDropDownlistCaller(currentIssue)"
          ></toggle-icon-drop-down>
          <button class="button" @click="saveTicket(currentIssue)">Update</button>
          <button class="button default" @click="resetTicket">Cancel</button>
        </div>
      </div>

      <tab :tabList="ISSUE_TAB_LIST" :selectTheTab="selectTheTab" :selectedTab="selectedTab"></tab>
      <div class="tab-list-itmes" v-if="selectedTab.id==='edit'">
        <div>
          <create-ticket :isForm="true" :resetTicket="resetTicket" :selecteTicket="currentIssue"></create-ticket>
        </div>
      </div>
      <!-- second tab -->
      <div class="tab-list-itmes" v-if="selectedTab.id==='comment'">
        <div>
          <div class="issue-details-header">
            <div class="form-control">
              <label
                v-if="currentComment.createdDate"
              >Create {{moment(currentComment.createdDate).fromNow()}}</label>
            </div>
            <div class="form-control">
              <input
                type="text"
                class="input-control"
                v-model="currentComment.text"
                placeholder="Add a comment..."
              />
            </div>
            <div
              v-if="(currentComment.text ||'').length>0"
              class="top-button-group ticket-button-group"
            >
              <button
                class="button success"
                :class="{'disable':!currentComment.text}"
                :disabled="!currentComment.text"
                @click="saveComment"
              >Save</button>
              <button class="button default" @click="cancelComment">Cancel</button>
            </div>
          </div>
          <div class="issue-comment-grid-area">
            <div class="grid-header-buttons">
              <button
                class="button danger"
                :class="{'disable':((getSelectedProjects(gridId))||[]).length===0}"
                :disable="(getSelectedProjects(gridId)||[]).length===0"
                @click="deleteContainerRows(gridId)"
              >Delete</button>
            </div>
            <grid
              :gridId="gridId"
              :filterObject="{fillContainer:gridId , taskId:currentIssue.id}"
              :gridRowClick="editComment"
            ></grid>
          </div>
        </div>
      </div>
    </div>
    <!-- second tab end -->
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
      ISSUE_TAB_LIST: mockupData.ISSUE_TAB_LIST,
      gridId: mockupData.COMMENT_NAME,
      currentComment: { text: "" },
      selectedTab: mockupData.ISSUE_TAB_LIST[0],
      ticketDropDownlist: mockupData.TICKET_DROP_DOWN
    };
  },
  props: {
    currentIssue: Object
  },
  methods: {
    selectTheTab(tab) {
      this.selectedTab = tab;
    },
    editComment(row) {
      this.currentComment = this.createDeepCopyOfObject(row);
      this.setCommonInformation({ lastSelectedRow: row });
    },
    AddComment() {
      if (!this.startAddingComment) this.startAddingComment = true;
    },
    cancelComment() {
      this.currentComment = { text: null };
      this.startAddingComment = false;
      this.setCommonInformation({ lastSelectedRow: null });
    },
    saveComment() {
      this.addOrUpdateItemInStoreAndLS(
        mockupData.COMMENT_NAME,
        Object.assign(this.currentComment, {
          taskId: this.currentIssue.id,
          ...(!this.currentComment.id ? { id: this.createUUID() } : {}),
          createdDate: new Date()
        })
      );
      this.cancelComment();
    },
    ticketDropDownlistCaller(issue) {
      return this.ticketDropDownlist.filter(listItem => {
        return issue.flagged
          ? listItem.flag !== "add"
          : listItem.flag !== "remove";
      });
    }
  }
});
</script>
<style lang="scss" scoped>
</style>
