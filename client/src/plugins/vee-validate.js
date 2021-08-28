import Vue from "vue";
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, {
    classes: true,
    fieldsBagName: 'formFields',
    classNames: {
        valid: '',
        invalid: 'is-invalid',
        warning: 'is-warning'
    }
});