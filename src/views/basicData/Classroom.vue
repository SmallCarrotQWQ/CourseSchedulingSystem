<template>
  <ClassroomList />
</template>

<script>
import ClassroomList from "@/components/BasicDataCollection/Classroom/ClassroomList.vue";
import { onBeforeMount } from 'vue';
import { useLocationStore } from '@/store/locationStore';
export default {
  name: "Classroom",
  components: { ClassroomList },
  setup() {
    onBeforeMount(() => {
      useLocationStore().initClassrooms();
    });
  },
};
</script>

<style>
</style>