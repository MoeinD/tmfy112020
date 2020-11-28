<template>
  <div class="tmfy-select" :class="{'sub-section' : subSection}" @click="toggleSelect">
    <div class="selected-item">
      <i class="fa option" :class="{[currentObject.class]: currentObject.class}"></i>
      <span>{{keyvalueprop? currentObject[keyvalueprop[textField]]: currentObject[textField]}}</span>
      <i class="fa fa-chevron-down select-arrow" v-if="!subSection"></i>
    </div>

    <div v-if="getCommonInformation()[currentObject.selectId]" class="tmfy-options">
      <div
        class="tmfy-option"
        v-for="(option,index) in selectOptions"
        @click="selectNewOption(option)"
        :key="index"
      >
        <i class="fa option" :class="{[option.class]: option.class}"></i>
        <span>{{keyvalueprop ? option[keyvalueprop[textField]] : option[textField]}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import * as mockupData from "../assets/mockupData";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  props: {
    selectOptions: Array,
    selectNewOption: Function,
    currentObject: Object,
    keyvalueprop: Object,
    textProp: String,
    subSection: Boolean
  },
  methods: {
    toggleSelect() {
      const currentState = this.getCommonInformation()[
        this.currentObject.selectId
      ];
      this.setCommonInformation({
        [this.currentObject.selectId]: currentState ? !currentState : true
      });
    }
  },
  computed: {
    textField() {
      return this.textProp ? this.textProp : "text";
    }
  }
});
</script>
<style lang="scss" scoped>
</style>