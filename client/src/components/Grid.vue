<template>
  <div
    class="grid-container"
    :id="gridId"
    v-if="getContainerLocal(filterObject) ? getContainerLocal(filterObject).length >0 : false"
  >
    {{loadingColumnStyle}}
    <!-- grid header -->
    <div class="grid-column grid-header">
      <div class="checkbox-column header-cell"></div>
      <div
        v-for="(column,headerIndex) in listOfColumnHeader"
        :key="headerIndex+'header'"
        class="header-cell"
      >
        <span>{{column}}</span>
      </div>
    </div>
    <!-- grid rows -->
    <div v-for="(row,rowIndex) in getContainerLocal(filterObject)" :key="rowIndex +'row'">
      <!-- grid colums -->
      <div
        class="grid-column grid-row"
        :class="{'selected-row':(getCommonInformation().lastSelectedRow||{}).id ===row.id}"
      >
        <div class="checkbox-column" :class="{ 'grid-row-odd' : rowIndex%2===1}">
          <input type="checkbox" v-model="row.checked" @change="rowChecked( $event, row)" />
        </div>
        <div
          class="column-value grid-cell"
          :class="{'grid-row-odd' : rowIndex%2===1}"
          v-for="(column,columnIndex) in listOfColumnHeader"
          :key="columnIndex+'column'"
          @click="gridRowClick(row)"
        >
          <span>{{row[column]|datetime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import commonMethod from "./commonMethod";
import * as mockupData from "../assets/mockupData";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  methods: {
    rowChecked(event, row) {
      const checked = event.target.checked;
      /**we need to update the store so we can get the last change from the store and all the connecte
       * component can get it
       */

      this.addContainerLocal([{ fillContainer: this.gridId, Row: [row] }]);
    },
    loadGridColumn() {
      /**getting number of the columns of the grid and set it for havig the nice style using the grid */
      const numberOfColumns =
        Object.keys(this.getContainerLocal(this.filterObject)[0]).length + 1;
      /**get list of the element that has the grid-column class */
      if (this._id(this.gridId)) {
        var elementList = this._id(this.gridId).getElementsByClassName(
          "grid-column"
        );
        for (let index = 0; index < elementList.length; index++) {
          const element = elementList[index];
          element.style.gridTemplateColumns = `30px repeat(${numberOfColumns},minmax(200px,auto))`;
        }
      }
    }
  },
  props: {
    gridData: Array,
    gridId: String,
    filterObject: Object,
    gridRowClick: Function
  },
  mounted() {},
  computed: {
    loadingColumnStyle() {
      const gridData = this.getContainerLocal(this.filterObject);
      setTimeout(() => {
        this.loadGridColumn();
      }, 30);
    },
    containerIdColumns() {
      const containerDetails = mockupData.CONTAINER_DETAILS.filter(
        container => container.gridId === this.gridId
      );
      if (containerDetails.length > 0) {
        return containerDetails[0].idColumns;
      }
    },
    listOfColumnHeader() {
      return Object.keys(this.getContainerLocal(this.filterObject)[0]).filter(
        el => {
          return !this.containerIdColumns.includes(el);
        }
      );
    }
  }
});
</script>
<style lang="scss" scoped>
</style>