import Vue from 'vue';

//layouts
import TodoLayout from '@/components/layouts/TodoLayout';
import Default from '@/components/layouts/Default';

Vue.component('todo-layout', TodoLayout);
Vue.component('default', Default);

//custom
import TcfFormInput from '@/components/custom/TcfFormInput';
import TcfFormSelect from '@/components/custom/TcfFormSelect';

Vue.component('tcf-form-input', TcfFormInput);
Vue.component('tcf-form-select', TcfFormSelect);
