<template>
  <CourseList />
</template>

<script>
import CourseList from "@/components/BasicDataCollection/Course/CourseList.vue";
import { onBeforeMount } from 'vue';
import { useAcademicStore } from '@/store/academicStore';

export default {
  name: "Course",
  components: {
    CourseList,
  },
  setup() {
    onBeforeMount(() => {
      useAcademicStore().initCourses();
    });
  },
};
</script>

<style>
</style>