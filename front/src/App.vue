<template>
  <div id="app">
    <LeadList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LeadList from './components/LeadList.vue';

export default defineComponent({
  name: 'App',
  components: {
    LeadList,
  },
});
</script>

<style>
/* Добавьте глобальные стили, если нужно */
</style>
