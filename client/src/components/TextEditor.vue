<template>
  <div :id="id" class="container">
    <div class="fieldset">
      <button class="fa fa-italic" @click="fontItalic()" title="Italicize Highlighted Text"></button>
      <button class="fa fa-bold" @click="fontBold()" title="Bold Highlighted Text"></button>
      <button class="fa fa-underline" @click="fontUnderline()"></button>
      <select id="input-font" class="input" @change="changeFont(this)">
        <option v-for="(fontName,index) in fontNameList" :key="index" :value="fontName">{{fontName}}</option>
      </select>
      <button class="fa fa-strikethrough" @click="fontStrikethrough()"></button>
      <button class="fa fa-align-left" @click="justifyLeft"></button>
      <button class="fa fa-align-center" @click="justifyCetnter"></button>
      <button class="fa fa-align-right" @click="justifyRight"></button>
      <button class="fa fa-repeat" @click="redo"></button>
      <button class="fa fa-undo" @click="undo"></button>
      <button class="fa fa-list-ol" @click="orderList"></button>
      <button class="fa fa-list-ul" @click="unorderList"></button>

      <input class="color" type="color" @change="chooseColor()" id="myColor" />

      <select id="fontSize" @click="changeSize()">
        <option v-for="index in 10" :value="index" :key="index">{{index}}</option>
      </select>
    </div>
    <div :id="editor" class="editor" contenteditable="true" data-text="Enter comment...."></div>
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
      fontNameList: mockupData.FONT_NAME_LIST
    };
  },
  props: {
    id: String,
    editor: String
  }
});
</script>
<style lang="scss" scoped>
</style>