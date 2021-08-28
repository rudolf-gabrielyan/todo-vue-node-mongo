<template>
    <div class="p-2">
        <small>{{ title }}</small>
        <b-form-input 
            :name="inputName"
            :value="value"
            :data-vv-as="dataVvAs"
            v-validate="vValidate"
            @input="inputEvent"
            :class="{ 'is-invalid': errors.has(inputName) }"
        >
        </b-form-input>
        <small class="text-danger">
            {{ errors.first(inputName) }}
        </small>
    </div>
</template>

<script>
    export default {
        inject: ['parentValidator'],
        props: {
            title: {type: String, default: ''},
            inputName: {type: String, default: ''},
            dataVvAs: {type: String, default: null},
            vValidate: {type: String, default: null},
            value: {type: String, required: false},
        },
        created() {
            this.$validator = this.parentValidator;
        },
        methods: {
            inputEvent(val) {
                this.$emit('input', val);
            }
        }

    }
</script>

<style>

</style>