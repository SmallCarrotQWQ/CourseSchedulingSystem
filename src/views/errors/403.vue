<template>
  <div class="title">403</div>
  <div class="text">
    对不起，您没有权限访问介个页面qwq
  </div>
  <router-link to="/" class="text"><el-link>返回首页</el-link></router-link>
</template>

<script>
export default {
    name:"403"
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