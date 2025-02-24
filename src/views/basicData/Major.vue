<template>
  <MajorList />
</template>

<script>
import MajorList from "@/components/BasicDataCollection/Major/MajorList.vue";
import { onBeforeMount } from 'vue';
import { useAcademicStore } from '@/store/academicStore';
export default {
  name: "Major",
  components: { MajorList },
  setup() {
    onBeforeMount(() => {
      useAcademicStore().initMajors();
    });
  },
};
</script>

<style>
</style>