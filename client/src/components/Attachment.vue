<template>
  <div class="attachment-form-control">
    <label class="label-control"></label>
    <div class="attachment-main">
      <div class="attahcment-icon" :id="fileObject.id"></div>
      <div class="attachment-data">
        <label class="name">{{fileObject.name}}</label>
        <label>{{formatBytes(fileObject.size)}}</label>
      </div>
      <div class="attachment-progressbar"></div>
      <div class="attachment-close" @click="removeAttachment(fileObject.index)">
        <span>&#10005;</span>
      </div>
    </div>
  </div>
</template>
<script >
import Vue from "vue";
import commonMethod from "./commonMethod";
import mixins from "vue-typed-mixins";
export default mixins(commonMethod).extend({
  props: {
    fileObject: File,
    removeAttachment: Function
  },
  mounted() {
    var self = this;
    const fileType = this.fileObject.type;
    const icon = document.createElement("i");
    const parentAttachment = self._id(self.fileObject.id);
    icon.classList.add("fa");
    icon.classList.add("attachment-icon");
    if (fileType.match(/image.*/)) {
      var reader = new FileReader();
      reader.onload = function(e2) {
        // finished reading file data.
        var img = document.createElement("img");
        img.src = e2.target.result;
        img.style.width = "25px";
        img.style.height = "25px";
        parentAttachment.appendChild(img);
      };
      reader.readAsDataURL(self.fileObject); // start reading the file data.
    } else {
      if (fileType.match(/video.*/)) icon.classList.add("fa-file-video-o");
      else if (fileType.match(/pdf.*/)) icon.classList.add("fa-file-pdf-o");
      else if (fileType.match(/zip.*/)) icon.classList.add("fa-file-archive-o");
      else if (fileType.match(/doc.*/)) icon.classList.add("fa-file-word-o");
      else if (fileType.match(/text.*/)) icon.classList.add("fa-file-text-o");
      else if (fileType.match(/audio.*/)) icon.classList.add("fa-file-audio-o");
      parentAttachment.appendChild(icon);
    }
  }
});
</script>
<style lang="scss" scoped>
</style>