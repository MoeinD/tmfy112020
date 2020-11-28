<script >
import Vue from "vue";
import * as types from "../store/types";
import { mapActions, mapGetters } from "vuex";
import * as mockupData from "../assets/mockupData";
import container from "../store/modules/container";
import moment from "moment";
import axios from "axios";
const url = "/api/containers";
export default Vue.extend({
  methods: {
    currentStatgeObjectBuilder(stageId) {
      const currentlistOfOptions = mockupData.TASK_SECTION.filter(
        item => item.type === this.currentProject.type
      );
      this.currentStageList = currentlistOfOptions[0].options;
      return {
        selectId: stageId,
        ...this.currentStageList[0]
      };
    },
    timeTrackingMainBuilder(
      destinationObject,
      timeTrackingSpendId,
      timeTrackingRemainId
    ) {
      const timeTrackingObject = this.timeTrackBuilderUsingDate({
        timeTrackingStart: destinationObject.timeTrackingStart,
        timeTrackingEnd: destinationObject.timeTrackingEnd
      });
      destinationObject.timeTracking = {
        timeTrackingSpendId: timeTrackingSpendId,
        timeTrackingRemainId: timeTrackingRemainId,
        isValid: true,
        timeTrackingSpend: timeTrackingObject.timeTrackingSpendObject,
        timeTrackingRemain: timeTrackingObject.timeTrackingRemainObject
      };
      setTimeout(() => {
        this.timeTrackingLoaderBuilder(destinationObject.timeTracking);
      }, 50);
    },
    timeTrackingLoaderBuilder(timeTracking) {
      this.timeTrackerBarLoader(
        (timeTracking.timeTrackingSpend || {}).resultInMin,
        (timeTracking.timeTrackingRemain || {}).resultInMin,
        timeTracking.timeTrackingSpendId
      );
      this.timeTrackerBarLoader(
        (timeTracking.timeTrackingRemain || {}).resultInMin,
        (timeTracking.timeTrackingSpend || {}).resultInMin,
        timeTracking.timeTrackingRemainId
      );
    },
    timeTrackerBarLoader(timeinMin1, timeMin2, sectionId) {
      const spendPercent = (timeinMin1 / (timeinMin1 + timeMin2)) * 100;
      this._id(sectionId).style.flexBasis = `${spendPercent}%`;
    },
    timeTrackBuilderUsingDate(dateObject) {
      let spendTimeInMinutes = 0;
      if (dateObject.timeTrackingStart)
        spendTimeInMinutes = moment().diff(
          dateObject.timeTrackingStart,
          "minutes"
        );
      let remainTimeInMinutes = 0;
      if (dateObject.timeTrackingEnd)
        remainTimeInMinutes = moment(dateObject.timeTrackingEnd).diff(
          moment(),
          "minutes"
        );

      let timeTrackingSpendObject = this.commonMethodForConvertingMinToTimeTrackingObject(
        spendTimeInMinutes
      );
      if (remainTimeInMinutes > 0)
        var timeTrackingRemainObject = this.commonMethodForConvertingMinToTimeTrackingObject(
          remainTimeInMinutes
        );
      return {
        timeTrackingSpendObject: timeTrackingSpendObject,
        timeTrackingRemainObject: timeTrackingRemainObject
      };
    },

    chunkSubstr(str, size) {
      const numChunks = Math.ceil(str.length / size);
      const chunks = new Array(numChunks);

      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size);
      }

      return chunks;
    },
    findingAlltheLogInString(logWork) {
      let resultValue = {};
      for (const key in mockupData.LIST_OF_UNIT_FOR_LOG) {
        if (mockupData.LIST_OF_UNIT_FOR_LOG.hasOwnProperty(key)) {
          const currentIndex = logWork.indexOf(key);
          if (currentIndex > -1) {
            resultValue[key] = logWork.substr(0, currentIndex);
            logWork = logWork.substr(currentIndex + 1);
          }
        }
      }
      return resultValue;
    },
    helperMethodForGettingWorkLog(worklog) {
      const logArray = this.chunkSubstr(worklog, 2);
      const resultValue = this.findingAlltheLogInString(worklog);
      /**first we need to convert every things to min and then we can use
       * the compiler method for adding
       */
      let resultInMin = 0;
      // logArray.map(item => {
      //   resultInMin += units[item[1]] * item[0];
      // });
      for (const key in resultValue) {
        if (resultValue.hasOwnProperty(key)) {
          const element = resultValue[key];
          resultInMin += mockupData.LIST_OF_UNIT_FOR_LOG[key] * element;
        }
      }
      return this.commonMethodForConvertingMinToTimeTrackingObject(resultInMin);
    },
    commonMethodForConvertingMinToTimeTrackingObject(resultInMin) {
      const units = mockupData.LIST_OF_UNIT_FOR_LOG;
      let result = { value: resultInMin };
      for (const key in units) {
        if (units.hasOwnProperty(key)) {
          if (result.value >= units[key]) {
            result = this.commonMehodForGettingWDHM(result, key);
          }
        }
      }
      this.convertTimeTrackObjectToText(result);
      return {
        resultInMin: resultInMin,
        timeTrackResult: this.convertTimeTrackObjectToText(result)
      };
    },
    convertTimeTrackObjectToText(trackingObject) {
      delete trackingObject.value;
      let outputResult = "";
      for (const key in trackingObject) {
        if (trackingObject.hasOwnProperty(key)) {
          outputResult += ` ${trackingObject[key]}${key}`;
        }
      }
      return outputResult.trim();
    },
    commonMehodForGettingWDHM(result, unit) {
      result[unit] = Math.floor(
        result.value / mockupData.LIST_OF_UNIT_FOR_LOG[unit]
      );
      result.value = result.value % mockupData.LIST_OF_UNIT_FOR_LOG[unit];
      return result;
    },
    gettingMaxForType(type) {
      switch (type) {
        case "d":
          return 5;
          break;
        case "h":
          return 24;
          break;
        case "m":
          return 60;
          break;
        default:
          break;
      }
    },
    commonHelperMethodForConverting(type) {
      return this.gettingMaxForType(type);
    },
    /**create sub task  */
    [mockupData.CREATE_SUB_TASK](selectedObject) {
      const firstTaskStage = this.getTaskSectionList(
        this.currentOrFirstProject
      )[0].id;
      this.toggleIconDropDownCaller(selectedObject.id);
      this.setCommonInformation({
        showTicketModal: true,
        cloneTicket: Object.assign(
          this.createDeepCopyOfObject(selectedObject),
          {
            id: null,
            summary: "",
            description: "",
            index: "",
            newIndex: "",
            parentId: selectedObject.id,
            type: firstTaskStage,
            timeTrackingEnd: null,
            timeTrackingStart: null,
            timeTracking: null,
            timeTrackingObject: null
          }
        )
      });
    },
    /**list of the method for the sprint drop down */
    [mockupData.MOVE_SPRINT_UP](id) {
      this.moveSprint(id, -1);
    },
    [mockupData.MOVE_SPRINT_DOWN](id) {
      this.moveSprint(id, 1);
    },

    /**list of the methods for the ticket drop down  */
    [mockupData.CLONE_TICKET](selectedObject) {
      this.toggleIconDropDownCaller(selectedObject.id);
      /**we need to delete the id first and then pass it to the create ticket modal */

      this.setCommonInformation({
        showTicketModal: true,
        cloneTicket: Object.assign(
          this.createDeepCopyOfObject(selectedObject),
          { id: null, summary: `${selectedObject.summary}-clone` }
        )
      });
    },
    [mockupData.DELETE_TICKET](selectedObject) {
      this.commonMethodForDeleting(selectedObject.id, mockupData.TASK_NAME);
    },
    [mockupData.ADD_FLAG](selectedObject) {
      this.toggleFlag(selectedObject, true);
    },
    [mockupData.REMOVE_FLAG](selectedObject) {
      this.toggleFlag(selectedObject, false);
    },
    [mockupData.LOG_WORK](selectedObject) {
      this.toggleIconDropDownCaller(selectedObject.id);
      this.setCommonInformation({
        showModal: true,
        currentIssueId: selectedObject.id
      });
    },

    toggleFlag(selectedObject, value) {
      this.toggleIconDropDownCaller(selectedObject.id);
      this.addOrUpdateItemInStoreAndLS(
        mockupData.TASK_NAME,
        Object.assign(selectedObject, { flagged: value })
      );
    },
    moveSprint(selectedObject, newSprintDiff) {
      this.toggleIconDropDownCaller(selectedObject.id);
      /**get the list of the current sprint and then find
       * the index of this sprint newIndex
       */
      let currentIndex = this.getCurrnetSprintList.findIndex(
        x => x.id === selectedObject.id
      );
      this.addOrUpdateItemInStoreAndLS(mockupData.SPRINT_NAME, {
        id: selectedObject.id,
        newIndex: currentIndex + newSprintDiff
      });
    },
    [mockupData.EDIT_SPRINT_METHOD_NAME](selectedObject) {
      this.toggleIconDropDownCaller(selectedObject.id);
    },
    [mockupData.DELETE_SPRINT_METHOD_NAME](selectedObject) {
      this.commonMethodForDeleting(selectedObject.id, mockupData.SPRINT_NAME);
    },
    commonMethodForDeleting(id, fillContainer) {
      this.addOrUpdateItemInStoreAndLS(fillContainer, {
        id: id,
        checked: true
      });
      this.toggleIconDropDownCaller(id);
      this.deleteContainerRows(fillContainer);
    },
    toggleIconDropDownCaller(id) {
      this.activeStopper();
      this.toggleItem(`${id}iconDropDown`, "active");
      this.toggleItem(`${id}iconDropDownButton`, "active");
    },
    activeStopper() {
      this.toggleStopper(true);
      setTimeout(() => {
        this.toggleStopper();
      }, 50);
    },
    customDateFormat() {
      // Formats the date with the given date mask. The mask is returned
      // and the internal date is not altered.
      Date.prototype.formatDate = function(strMask) {
        // Create the values for each part of the potential date mask.
        var objParts = {
          d: this.getDate(),
          dd:
            this.getDate().toString().length == 1
              ? "0" + this.getDate()
              : this.getDate(),
          ddd: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"][this.getDay()],
          dddd: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ][this.getDay()],
          m: this.getMonth(),
          mm:
            this.getMonth().toString().length == 1
              ? "0" + this.getMonth()
              : this.getMonth(),
          mmm: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ][this.getMonth() + 1],
          mmmm: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ][this.getMonth() + 1],
          yy: this.getYear()
            .toString()
            .substring(1, 3),
          yyyy: this.getFullYear()
        };

        // Check to see if we have special date formatting options.
        switch (strMask) {
          case "short":
            return objParts["m"] + "/" + objParts["d"] + "/" + objParts["yyyy"];
            break;

          case "medium":
            return (
              objParts["mmm"] + " " + objParts["d"] + ", " + objParts["yyyy"]
            );
            break;

          case "long":
            return (
              objParts["mmmm"] + " " + objParts["d"] + ", " + objParts["yyyy"]
            );
            break;

          case "full":
            return (
              objParts["dddd"] +
              ", " +
              objParts["mmmm"] +
              " " +
              objParts["d"] +
              ", " +
              objParts["yyyy"]
            );
            break;

          default:
            // There was no special date formatting, so just use the mask.
            return strMask.replace(
              new RegExp("(d{1,4}|m{1,4}|y{4}|y{2})", "gi"),
              $1 => {
                return objParts[$1];
              }
            );
            break;
        }
      };
    },
    toggleStopper(stop = false) {
      this.setCommonInformation({
        stopper: stop
      });
    },
    checkStopper() {
      return this.getCommonInformation().stopper;
    },
    /**create a deep copy fo object */
    createDeepCopyOfObject(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    /**delete selected projects */
    deleteContainerRows(gridId) {
      this.setModalInfo({ show: true, gridId: gridId });
    },
    saveTicketCommon(currentIssue) {
      if (this._id("descriptionEditor")) {
        const description = this._id("descriptionEditor").innerHTML;
        localStorage.setItem("description", description);
        currentIssue.description = description;
        const descriptionText = localStorage.getItem("description");
      }
      this.addOrUpdateItemInStoreAndLS(
        mockupData.TASK_NAME,
        Object.assign(currentIssue)
      );
      this.toggleToast("Update successflly");
    },
    closeCreateTicket() {
      this.setCommonInformation({ showTicketModal: false });
    },
    /**opening project modal */

    openProjectModal() {
      this.setCommonInformation({ showProjectModal: true });
      this.addContainerLocal([
        {
          fillContainer: mockupData.PROJECTS_NAME,
          [mockupData.ACTIVE_MODAL_PROP]: false
        }
      ]);
    },
    /**getting the element on the DOM using the id */
    _id(id) {
      return document.getElementById(id);
    },
    /**default div section;  */
    defalutEmptyHtmlElement() {
      return document.createElement("div");
    },
    toggleItem(id, acitveClass = "active", previousSibling) {
      const element = this._id(id) || this.defalutEmptyHtmlElement();
      if (element.classList.contains(acitveClass)) {
        element.classList.remove(acitveClass);
        if (previousSibling) element.previousSibling.remove(acitveClass);
      } else {
        element.classList.add(acitveClass);
        if (previousSibling) element.previousSibling.addClass(acitveClass);
      }
    },
    /**getting the list of the project that has been checked for making the delete buttons enable */
    getSelectedProjects(gridId) {
      const containerList = this.getContainerLocal({
        fillContainer: gridId,
        checked: true
      });
      return containerList;
    },
    //**adding container to the local storage */
    addContainerToLocalStorage(key, value) {
      const containers = localStorage.getItem(key);
      if (!containers) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    addingContainerBuilder(key, value) {
      this.addContainerToLocalStorage(key, value);
      /**getting data from the local storage and save in the store */
      let container = localStorage.getItem(key);
      if (container) {
        container = JSON.parse(container);
        /**adding the container to the store as well */
        this.addContainer([{ fillContainer: key, Row: container }]);
      }
    },
    /**addOrUpdateNewItem */
    addOrUpdateItemInStoreAndLS(key, obj) {
      /**add or update the new obj to the store */

      if (this.IsObjectNotEmpty(obj))
        this.addContainer([{ fillContainer: key, Row: [obj] }]);
      /**getting the last update list from the store  */
      const currentList = this.getContainerLocal({ fillContainer: key });
      localStorage.setItem(key, JSON.stringify(currentList));
    },
    createUUID() {
      // http://www.ietf.org/rfc/rfc4122.txt
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    capitalizeFirstLetter(string) {
      if (!string) return string;
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    /**check if the item is for the main task area */
    checkForTaskArea(id, options) {
      const items = (options || []).map(item => item.id);
      return items.indexOf(id) > -1;
    },
    ...mapActions({
      setModalInfo: types.TOGGLE_MODAL,
      deleteContainerRow: types.DELETE_CONTAINER_ROW,
      addContainerLocal: types.ADD_CONTAINER_LOCAL,
      addContainer: types.ADD_CONTAINER,
      setLoader: types.SET_LOADER,
      setCommonInformation: types.SET_COMMON_INFORMATION,
      fetchContainer: types.FETCH_CONTAINER
    }),
    /**toggle class to element */
    toggleClass(id, className, adding) {
      const element = this._id(id);
      if (!element) return;
      if (adding) element.classList.add(className);
      else element.classList.remove(className);
    },
    /**toggling the dragging class to the list
     * section that we have task on them
     */
    toggleDraggingClass(currentSection, className, adding) {
      const sectionList = ["todo", "doing", "done"];
      sectionList.map(section => {
        if (section !== currentSection)
          this.toggleClass(section, className, adding);
      });
    },
    /**create UUID */
    generateUUID() {
      // Public Domain/MIT
      var d = new Date().getTime(); //Timestamp
      var d2 =
        (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });
    },
    /**check that is objec and not empty */
    IsObjectNotEmpty(obj) {
      return obj.constructor === Object ? Object.keys(obj).length > 0 : false;
    }, //select target
    selectTarget(row, fillContainer, targetName = "board") {
      this.setCommonInformation({
        lastTarget: row
      });
      /**getting the list of the task that belongs to this projectthat has been selectd
       *
       */
      if (row) this.commonMethodForFetchingProjectRelated(row.id);
      else if (fillContainer)
        this.fetchContainer({ fillContainer: fillContainer });

      this.$router.push({
        name: targetName,
        params: row ? { id: row.target } : {}
      });
    },
    createCustomDropDown() {
      var x, i, j, l, ll, selElmnt, a, b, c;
      /* Look for any elements with the class "custom-select": */
      x = document.getElementsByClassName("custom-select");
      l = x.length;
      for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        /* For each element, create a new DIV that will act as the selected item: */
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /* For each element, create a new DIV that will contain the option list: */
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
          /* For each option in the original select element,
    create a new DIV that will act as an option item: */
          c = document.createElement("DIV");
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
        and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
          });
          b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
          /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
      }

      function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
  except the current select box: */
        var x,
          y,
          i,
          xl,
          yl,
          arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
          if (elmnt == y[i]) {
            arrNo.push(i);
          } else {
            y[i].classList.remove("select-arrow-active");
          }
        }
        for (i = 0; i < xl; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
          }
        }
      }

      /* If the user clicks anywhere outside the select box,
then close all select boxes: */
      document.addEventListener("click", closeAllSelect);
    },
    chooseColor() {
      var mycolor = document.getElementById("myColor").value;
      document.execCommand("foreColor", false, mycolor);
    },
    changeFont() {
      var myFont = document.getElementById("input-font").value;
      document.execCommand("fontName", false, myFont);
    },
    changeSize() {
      var mysize = document.getElementById("fontSize").value;
      document.execCommand("fontSize", false, mysize);
    },
    checkDiv() {
      var editorText = document.getElementById("editor1").innerHTML;
      if (editorText === "") {
        document.getElementById("editor1").style.border = "5px solid red";
      }
    },
    fontItalic() {
      document.execCommand("italic", false, null);
    },
    fontBold() {
      document.execCommand("bold", false, null);
    },
    fontUnderline() {
      document.execCommand("underline", false, null);
    },
    fontStrikethrough() {
      document.execCommand("strikethrough", false, null);
    },
    justifyCetnter() {
      document.execCommand("justifyCenter", false, null);
    },
    justifyLeft() {
      document.execCommand("justifyLeft", false, null);
    },
    justifyRight() {
      document.execCommand("justifyRight", false, null);
    },
    redo() {
      document.execCommand("redo", false, null);
    },
    undo() {
      document.execCommand("undo", false, null);
    },
    orderList() {
      document.execCommand("insertOrderedList", false, null);
    },
    unorderList() {
      document.execCommand("insertUnorderedList", false, null);
    },
    removeBorder() {
      document.getElementById("editor1").style.border = "1px solid transparent";
    },
    formatBytes(bytes, decimal = 2) {
      var marker = 1024; // Change to 1000 if required
      var kiloBytes = marker; // One Kilobyte is 1024 bytes
      var megaBytes = marker * marker; // One MB is 1024 KB
      var gigaBytes = marker * marker * marker; // One GB is 1024 MB
      var teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

      // return bytes if less than a KB
      if (bytes < kiloBytes) return `${bytes} Bytes`;
      // return KB if less than a MB
      else if (bytes < megaBytes)
        return `${(bytes / kiloBytes).toFixed(decimal)} KB`;
      // return MB if less than a GB
      else if (bytes < gigaBytes)
        return `${(bytes / megaBytes).toFixed(decimal)} MB`;
      // return GB if less than a TB
      else return `${(bytes / gigaBytes).toFixed(decimal)} GB`;
    },
    niceBytes(x) {
      const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      let l = 0,
        n = parseInt(x, 10) || 0;
      while (n >= 1024 && ++l) {
        n = n / 1024;
      }
      //include a decimal point and a tenths-place digit if presenting
      //less than ten of KB or greater units
      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
    },
    getTaskSectionList(project) {
      const currentTaskSection = mockupData.TASK_SECTION.filter(
        task => task.type === project.type
      );
      if (currentTaskSection.length > 0) return currentTaskSection[0].options;
    },
    getListProp(list, id, prop) {
      const selectedItem = list.filter(issue => issue.id === id);
      if (selectedItem.length > 0) return selectedItem[0][prop];
    },
    getContainerWithFilterNew(objectParams = {}) {
      return this.getContainerLocal(
        Object.assign(objectParams, {
          fillContainer: mockupData.TASK_NAME,
          projectId: this.currentProject.id
        })
      );
    },
    filterArrayByProp(list, prop, value) {
      if ((list || []).length === 0) return {};
      var desidredItem = list.filter(item => {
        return item[prop] === value;
      });
      if (desidredItem.length > 0) return desidredItem[0];
      else return {};
    },
    toggleToast(message, type) {
      /**showing the toast */
      this.setCommonInformation({
        toastType: type,
        toast: message
      });
      /**hiding the toast after 300ms */
      if (!type)
        setTimeout(() => {
          this.setCommonInformation({
            toastType: "",
            toast: ""
          });
        }, 3000);
    },
    resetTicket() {
      //this.commonReset();
      this.closeCreateTicket();
    },
    saveTicket(currentIssue) {
      /**get the last saved ticket in the store
       * and then we can use it for updaitng the database.
       */
      const lastUpdateTicket = this.getCommonInformation().lastUpdateTicket;
      this.saveTicketCommon(lastUpdateTicket);
      this.resetTicket();
    },
    isFirstOrLastOrReadyToStart(id) {
      const allSprint = this.getContainerLocal({
        fillContainer: mockupData.SPRINT_NAME,
        projectId: this.currentProject.id
      });
      if (allSprint.length > 0) {
        if (allSprint[allSprint.length - 1].id === id) return "notDown";
      }
    },
    async fetchingProject(payload) {
      const response = await axios.post(`${url}/fetch`, payload);
      const container = response.data.container || [];
      if (container.length > 0) {
        const projectId = container[0].Row[0].id;
        this.commonMethodForFetchingProjectRelated(projectId);
      }
    },
    /**common method for loading the project
     * related like sprint or task or component
     */
    commonMethodForFetchingProjectRelated(projectId) {
      this.fetchContainer({
        fillContainer: mockupData.PROJECTS_NAME,
        id: projectId
      });
      this.fetchContainer({
        fillContainer: mockupData.TASK_NAME,
        projectId: projectId
      });
      /**getting the list of the sprint that belongs to this project and
       * then we can save them in the store and will be accessable for
       * updating or creating the task.
       */
      this.fetchContainer({
        fillContainer: mockupData.SPRINT_NAME,
        projectId: projectId
      });
      /**getting the list of the component
       * that belongs to this project
       */
      this.fetchContainer({
        fillContainer: mockupData.COMPONENT_NAME,
        projectId: projectId
      });
    },
    loadingProjectOnMountOfChild() {
      const routeParams = this.$route.params;
      if (routeParams) {
        /**we need to fetch the things that we need for loading that project */
        /**first we need to check if have the project
         * if not fetch from the server
         * and if we can not will redirect the use to specific page
         */
        const localproject = this.getContainerLocal({
          fillContainer: mockupData.PROJECTS_NAME,
          target: routeParams.id
        });

        if (!localproject)
          this.fetchingProject({
            fillContainer: mockupData.PROJECTS_NAME,
            target: routeParams.id
          });
      }
    }
  },
  computed: {
    ...mapGetters({
      getContainerLocal: types.GET_CONTAINER_LOCAL,
      getModalInfo: types.GET_MODAL_STATE,
      getLoader: types.GET_LOADER,
      getCommonInformation: types.GET_COMMON_INFORMATION
    }),
    currentOrFirstProject() {
      let project = this.getCommonInformation().currentProject;
      if (project) return project;
      else {
        project =
          this.getContainerLocal({
            fillContainer: mockupData.PROJECTS_NAME
          }) || [];
        if (project.length > 0) return project[0];
      }
      return null;
    },
    currentProject() {
      let result =
        this.getContainerLocal({
          fillContainer: mockupData.PROJECTS_NAME,
          target: this.$route.params.id
        }) || [];

      if (result.length > 0) {
        this.setCommonInformation({
          currentProject: Object.assign({}, result[0])
        });
        return result[0];
      }
      return {};
    },
    allProject() {
      return this.getContainerWithFilterNew();
    },
    getActiveSprint() {
      const ActiveList =
        this.getContainerLocal({
          fillContainer: mockupData.SPRINT_NAME,
          projectId: this.currentProject.id,
          iActive: true
        }) || [];
      if (ActiveList.length > 0) return ActiveList[0];
      return null;
    },
    getCurrnetSprintList() {
      return this.getContainerLocal({
        fillContainer: mockupData.SPRINT_NAME,
        projectId: this.currentProject.id
      });
    }
  }
});
</script>