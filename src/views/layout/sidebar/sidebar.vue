<template>
  <el-aside>
    <el-menu
      :default-active="route.name"
      class="el-menu-vertical-demo"
      unique-opened="true"
      :collapse="isCollapse"
    >
    <el-button @click="switchCollapse" v-show="isCollapse" class="switchCollapseButton"><el-icon><Expand /></el-icon>展开</el-button>
    <el-button @click="switchCollapse" v-show="!isCollapse" class="switchCollapseButton"><el-icon><Fold /></el-icon>收起</el-button>

      <el-menu-item index="homePage" @click="this.$router.push({ path: '/' })">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="data">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>数据管理</span>
        </template>
        <el-menu-item
          index="campus"
          @click="this.$router.push({ name: 'campus' })"
          >校区管理</el-menu-item
        >
        <el-menu-item
          index="grade"
          @click="this.$router.push({ name: 'grade' })"
          >年级管理</el-menu-item
        >
        <el-menu-item
          index="department"  
          @click="this.$router.push({ name: 'department' })"
          >部门管理</el-menu-item
        >
        <el-menu-item
          index="classroom"
          @click="this.$router.push({ name: 'classroom' })"
          >教室管理</el-menu-item
        >
        <el-menu-item
          index="major"
          @click="this.$router.push({ name: 'major' })"
          >专业管理</el-menu-item
        >
        <el-menu-item
          index="teacher"
          @click="this.$router.push({ name: 'teacher' })"
          >教师管理</el-menu-item
        >
        <el-menu-item
          index="class"
          @click="this.$router.push({ name: 'class' })"
          >班级管理</el-menu-item
        >
        <el-menu-item
          index="semester"
          @click="this.$router.push({ name: 'semester' })"
          >学期管理</el-menu-item
        >
        <el-menu-item
          index="course"
          @click="this.$router.push({ name: 'course' })"
          >课程管理</el-menu-item
        >

      </el-sub-menu>
      <el-sub-menu index="schedule">
        <template #title>
          <el-icon><DataAnalysis /></el-icon>
          <span>排课管理</span>
        </template>
        <el-menu-item
          index="scheduleManagement"
          @click="this.$router.push({ name: 'scheduleManagement' })"
          >排课任务</el-menu-item
        >
        <el-menu-item
          index="showSchedule"
          @click="this.$router.push({ name: 'showSchedule' })"
          >课表查看</el-menu-item
        >
      </el-sub-menu>

      <el-sub-menu index="system">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item
          index="AccountManagement"
          @click="this.$router.push({ name: 'AccountManagement' })"
          >账户管理</el-menu-item
        >
        <el-menu-item
          index="Authoritymanagement"
          @click="this.$router.push({ name: 'Authoritymanagement' })"
          >角色管理</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from "vue-router";

export default {
  name: "theSidebar",
  setup() {
    const route = useRoute();
    const isCollapse = ref(false)
    const switchCollapse = ()=>{
      isCollapse.value = !isCollapse.value
    }
    return {
      route,
      isCollapse,
      switchCollapse
    };
  },
};
</script>

<style scoped> 
.el-aside {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  width: max-content;
  background: white;
  border-right: solid 1px #f0f2f5;
  overflow: unset;
}

.el-aside h2 {
  margin: 20px 0px 20px 10px;
}

.el-sub-menu,
.el-menu-item {
  border-top: solid 2px #f0f2f5;
}

.el-menu:last-child {
  border-bottom: solid 2px #f0f2f5;
}

.switchCollapseButton {
  width: 100%;
  border: unset;
  display: flex;
  align-content:flex-start;
}

.el-button+.el-button{
  margin-left:0px;
}

</style>