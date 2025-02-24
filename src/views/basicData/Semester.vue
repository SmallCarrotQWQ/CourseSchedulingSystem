<template>
  <SemesterList />
</template>

<script>
import SemesterList from "@/components/BasicDataCollection/Semester/SemesterList.vue";
import { onBeforeMount } from 'vue';
import { useAcademicStore } from '@/store/academicStore';
export default {
  name: "Semester",
  components: {
    SemesterList,
  },
  setup() {
    onBeforeMount(() => {
      useAcademicStore().initSemesters();
    });
  },
};
</script>

<style>
</style>