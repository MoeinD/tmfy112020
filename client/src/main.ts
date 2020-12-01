import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Navbar from './components/Navbar.vue';
import Projects from './components/Projects.vue';
import Grid from './components/Grid.vue';
import MultiSelectCheckbox from './components/MultiSelectCheckbox.vue';
import Modal from './components/modal.vue';
import Loader from './components/Loader.vue';
import People from './components/People.vue';
import Person from './components/Person.vue';
import Team from './components/Team.vue';
import Board from './components/Board.vue';
import Summary from './components/Summary.vue';
import Project from './components/Project.vue';
import Task from './components/Task.vue';
import NavbarModal from './components/NavbarModal.vue';
import CreateProject from './components/CreateProject.vue';
import TemplateItem from './components/TemplateItem.vue';
import CreateTicket from './components/CreateTicket.vue';
import TextEditor from './components/TextEditor.vue';
import Attachment from './components/Attachment.vue';
import TmfySelect from './components/TmfySelect.vue';
import Issues from './components/Issues.vue';
import Toast from './components/Toast.vue';
import Tab from './components/Tab.vue';
import Components from './components/Components.vue';
import CreateComponent from './components/CreateComponent.vue';
import Backlog from './components/Backlog.vue';
import moment from 'moment';
import issueTabs from './components/issueTabs.vue';
import ToggleIconDropDown from './components/ToggleIconDropDown.vue';
import ToggleIconDropDownItem from './components/ToggleIconDropDownItem.vue';
import TmfyModal from './components/TmfyModal.vue';
import TimeTrackingBar from './components/TimeTrackingBar.vue';
import SubTask from './components/SubTask.vue';
import auth from './components/auth.vue';
import InputFacade from 'vue-input-facade';

import AsyncComputed from 'vue-async-computed';
Vue.use(AsyncComputed);
Vue.use(InputFacade);


Vue.prototype.moment = moment;

Vue.component('Navbar', Navbar);
Vue.component('Projects', Projects);
Vue.component('Grid', Grid);
Vue.component('MultiSelectCheckbox', MultiSelectCheckbox);
Vue.component('Modal', Modal);
Vue.component('Loader', Loader);
Vue.component('Peopple', People);
Vue.component('Person', Person);
Vue.component('Team', Team);
Vue.component('Board', Board);
Vue.component('Summary', Summary);
Vue.component('project', Project);
Vue.component('Task', Task);
Vue.component('NavbarModal', NavbarModal);
Vue.component('CreateProject', CreateProject);
Vue.component('TemplateItem', TemplateItem);
Vue.component('CreateTicket', CreateTicket);
Vue.component('TextEditor', TextEditor);
Vue.component('Attachment', Attachment);
Vue.component('TmfySelect', TmfySelect);
Vue.component('Issues', Issues);
Vue.component('Toast', Toast);
Vue.component('Tab', Tab);
Vue.component('Components', Components);
Vue.component('CreateComponent', CreateComponent);
Vue.component('Backlog', Backlog);
Vue.component('issueTabs', issueTabs);
Vue.component('ToggleIconDropDown', ToggleIconDropDown);
Vue.component('ToggleIconDropDownItem', ToggleIconDropDownItem);
Vue.component('TmfyModal', TmfyModal);
Vue.component('TimeTrackingBar', TimeTrackingBar);
Vue.component('SubTask', SubTask);
Vue.component('auth', auth);

Vue.filter('datetime', (value) => {
  var timestamp = Date.parse(value);

  if (isNaN(timestamp) == false) {
    return moment(value).format('YYYY/MM/DD HH:mm');
  } else return value;
})

Vue.filter('customFitler', (value) => {
  console.log('this is the vlaue ', value);
  return value.replace(/(\d{1,10}[w])(\d{1,10}[d])(\d{1,10}[h])(\d{1,10}[m])/, "$1 $2 $3 $4");

})






import "font-awesome/css/font-awesome.css";
import router from "./router";


Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount("#app");
