<template>
  <h3>
      Welcome to my application, here is happening some magic, once you click on the
      <router-link :to="{ name: TodosRoutes.Todos.name }">Todo Board</router-link> link the magic will be happen. &#128513;
  </h3>
</template>

<script>
    import { TodosRoutes } from '@/constants/routes/TodosRoutes';
    
    export default {
        data() {
            return {
                TodosRoutes: TodosRoutes
            }
        },
    }
</script>

<style>

</style>