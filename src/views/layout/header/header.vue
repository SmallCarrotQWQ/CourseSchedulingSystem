<template>
    <el-header>
      <router-link to="/" class="logotitle">
        <img src="/src/assets/logo.png" alt="" class="logo" />
        <h2>高校排课系统</h2>
      </router-link>
      <accountInfo></accountInfo>
    </el-header>
</template>

<script>
import accountInfo from "@/components/persion/accountInfo.vue";
export default {
  name: "theHeader",
  components: {
    accountInfo,
  },
};
</script>

<style>
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

accountInfo {
  display: flex;
  justify-content: center;
  float: right;
}
</style>