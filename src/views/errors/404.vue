<template>
  <div class="title">404</div>
  <div class="text">
    对不起，您访问的页面不存在qwq
  </div>
  <router-link to="/" class="text"><el-link>返回首页</el-link></router-link>
</template>

<script>
export default {
    name:"404"
}
</script>

<style>
    .title{
        font-size: 100px;
        display: flex;
        justify-content: center;
    }
    .text{
        font-size: 20px;
        display: flex;
        justify-content: center;
    }
</style>