<template>
    <div class="p-2">
        <small>{{ title }}</small>
        <b-form-select 
            :name="inputName"
            :value="value"
            :data-vv-as="dataVvAs"
            v-validate="vValidate"
            :options="options"
            @input="inputEvent"
            :class="{ 'is-invalid': errors.has(inputName) }"
            :disabled="disabled"
        >
        </b-form-select>
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
            disabled: {type: Boolean, default: false},
            value: {type: String, required: false},
            options: {type: Array, default: () => []},
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