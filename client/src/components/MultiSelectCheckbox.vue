<template>
  <div class="multi-select-checkbox">
    <div class="selected-list" @click="toggleShowList">
      <ul>
        <li v-for="(labelItem,index) in selectedItemList" :key="index">
          <a class="chips">
            {{labelItem[textField]}}
            <i class="fa fa-close" @click="removeChips(labelItem.id)"></i>
          </a>
        </li>
      </ul>
      <label v-if="selectedItemList.length ===0">All types</label>
      <i class="fa fa-close close" v-if="selectedItemList.length > 0" @click="removeAllchips"></i>
      <i class="fa fa-angle-down"></i>
    </div>
    <ul :class="{'show':showList}" id="projectListItem">
      <li v-for="(filterItem, index) in filterList" :key="index">
        <input
          :id="'filterItem'+ index"
          type="checkbox"
          name
          v-model="checkedFilter"
          :value="filterItem.id"
        />
        <label :for="'filterItem'+ index">{{filterItem[textField]}}</label>
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from "vue";
import mixin from "./mixin";
export default Vue.extend({
  data() {
    return {
      selectedItemList: [],
      showList: false,
      methodStopper: false
    };
  },
  mixins: [mixin],
  props: {
    filterList: Array,
    textProp: String,
    selectOptions: Function,
    selectedItems: Array
  },
  computed: {
    textField() {
      return this.textProp ? this.textProp : "text";
    },
    checkedFilter: {
      get() {
        return this.selectedItemList.map(item => item.id);
      },
      set(newValue) {
        /**this will return the last list of the check item so
         * we need to change the array of object in store using it and get it
         */
        this.selectedItemList = this.filterList.filter(item => {
          return newValue.indexOf(item.id) > -1;
        });
        this.selectOptions(this.selectedItemList);
      }
    },
    /**list of the select item label
     *
     */
    selecteItemListOfLabel() {
      return this.selectedItemList.map(item => item.text);
    }
  },
  methods: {
    /**toggle the list of the checkbox  */
    toggleShowList() {
      if (this.methodStopper) return;
      this.callingStopper();
      const ListObject = this._id("projectListItem");
      ListObject.classList.contains("show")
        ? ListObject.classList.remove("show")
        : ListObject.classList.add("show");
    },
    /**calling the stopper */
    callingStopper() {
      this.methodStopper = true;
      setTimeout(() => {
        this.methodStopper = false;
      }, 50);
    },
    /**close the chips */
    removeChips(id) {
      if (this.methodStopper) return;
      this.callingStopper();
      this.selectedItemList = this.selectedItemList.filter(item => {
        return item.id !== id;
      });
      this.selectOptions(this.selectedItemList);
    },
    /**remove all the chips in the lists */
    removeAllchips() {
      this.selectedItemList = [];
      this.selectOptions(this.selectedItemList);
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.selectedItems) this.selectedItemList = this.selectedItems;
    }, 50);
  }
});
</script>
<style lang="scss" scoped>
</style>