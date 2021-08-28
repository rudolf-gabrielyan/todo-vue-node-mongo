<template>
    <b-modal
        v-model="show_modal"
        centered
        :title="title"  
    >
        <tcf-form-input 
            title="Title"
            v-model="todoTitle"
            inputName="title"
            data-vv-as="title"
            :v-validate="validations.title"
        />

        <template slot="modal-footer">
            <div>
                <button
                    class="btn btn-white text-capitalize"
                    @click="show_modal = false"
                >
                    Cancel
                </button>
                <button
                    class="btn btn-primary text-capitalize"
                    @click="add"
                >
                    Add
                </button>
            </div>
        </template>
    </b-modal>
</template>

<script>
    import validations from '../../todos-validations';
    import { mapActions } from 'vuex';

    export default {
        provide() {
            return {
                parentValidator: this.$validator
            }
        },
        props: {
            show: { type: Boolean, default: false},
            title: { type: String, default: 'Title'},
        },
        data(){
            return {
                validations: validations,
                show_modal: false,
                todoTitle: ''
            }
        },
        watch: {
            show_modal(val) {
                this.$parent.$emit('modalToggle', {name: 'addNewTodo', val: val})
            }
        },
        beforeMount() {
            this.show_modal = this.show;
        },
        methods: {
            ...mapActions(['CREATE_TODO', 'GET_TODOS']),
            add() {
                this.$validator.validateAll()
                .then(res => {
                    if(res) {
                        this.CREATE_TODO({ title: this.todoTitle })
                        .then(() => {
                            this.$toast.success('Successfully created.');
                            this.GET_TODOS();
                            this.show_modal = false;
                        })
                        .catch(({response}) => {
                            this.$toast.error(response.data.message);
                        })
                    }
                })
            }
        }
    }
</script>
