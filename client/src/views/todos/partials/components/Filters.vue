<template>
    <b-row class="p-3">
        <b-col cols="3">
            <b-form-select  
                :options="statusOptions"
                v-model="filters.status"
            />
        </b-col>
    </b-row>
</template>

<script>
    export default {
        data() {
            return {
                statusOptions: [
                    { value: '', text: 'All' },
                    { value: 'todo', text: 'Todo' },
                    { value: 'done', text: 'Done' },
                ],
                filters: {
                    status: this.$route.query.status || ''
                    //defined inside object for multifilter
                }
            }
        },
        watch: {
            filters: {
                handler(val) {
                    this.$emit('onFilter', val);
                },
                deep: true
            }
        }
    }
</script>

<style>

</style>