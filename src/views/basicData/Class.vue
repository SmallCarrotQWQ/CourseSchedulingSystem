<template>
  <ClassList />
</template>

<script>
import ClassList from "@/components/BasicDataCollection/Class/ClassList.vue";
import { onBeforeMount } from 'vue';
import { useAcademicStore } from '@/store/academicStore';

export default {
  name: "Class",
  components: { ClassList },
  setup() {
    onBeforeMount(() => {
      useAcademicStore().initClasses();
    });
  },
};
</script>

<style>
</style>