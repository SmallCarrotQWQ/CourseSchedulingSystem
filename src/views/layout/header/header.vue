<template>
  <el-header>
    <router-link to="/" class="logotitle">
      <img src="/src/assets/logo.png" alt="" class="logo" />
      <h2>高校排课系统</h2>
    </router-link>

    <div class="userInfo">
      <el-dropdown size="large">
        <span class="username">
          <el-icon><User /></el-icon>
          {{username}}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- <el-link
          :underline="false"
          @click="this.$router.push({ name: 'AccountManagement' })"
          class="ToAccountManage"
        >
          <span>账户管理</span>
        </el-link>
        <el-link
          :underline="false"
          @click="this.$router.push({ name: 'login' })"
          class="Logout"
        >
          <span>退出登录</span>
        </el-link> -->
    </div>
  </el-header>
</template>

<script>
import { ElMessage } from 'element-plus';
import router from '@/router';
export default {
  name: "theHeader",
  setup() {
    const handleLogout = ()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      ElMessage({
        message:"登出成功!",
        type:"success"
      })
      router.push({name:"login"})
    };

    const username = localStorage.getItem("username")

    return{
      handleLogout,
      username
    }
  },
};
</script>

<style scoped>
.el-header {
  height: 10%;
  background: rgb(50.8, 116.6, 184.5);
  display: flex;
  justify-content: space-between;
  color: white;
}
.logo {
  height: 70%;
  margin: auto 20px auto 0px;
}

.logotitle {
  color: white;
  height: 100%;
  display: flex;
  text-decoration: none;
}

.userInfo {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.username {
  margin: 0px 10px;
  color: white;
}

.ToAccountManage,
.Logout {
  all: unset;
  margin-right: 10px;
}
</style>