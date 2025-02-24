<template>
  <GradeListVue />
</template>

<script>
import GradeListVue from "@/components/BasicDataCollection/Grade/GradeList.vue";
import { onBeforeMount } from 'vue';
import { useAcademicStore } from '@/store/academicStore';

export default {
  name: "Grade",
  components: { GradeListVue },
  setup() {
    onBeforeMount(() => {
      useAcademicStore().initGrades();
    });
  },
};
</script>

<style>
</style>