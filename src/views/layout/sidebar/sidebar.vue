<template>
  <el-aside width="200px">
    <el-menu
      :default-active="route.name"
      class="el-menu-vertical-demo"
      unique-opened="true"
    >
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
          >排课工具</el-menu-item
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
import { useRoute } from "vue-router";

export default {
  name: "theSidebar",
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
};
</script>

<style>
.el-aside {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  background: white;
  border-right: solid 1px #f0f2f5;
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
</style>