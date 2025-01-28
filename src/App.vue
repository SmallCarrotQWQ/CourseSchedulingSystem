
<template>
  <router-view></router-view>
</template>


<script>
  export default {
    name:"App",
  }
</script>


<style>
  html,body{
    height: 100%;
    padding:0;
    margin: 0;
  }
  #app{
    height: 100%;
    overflow:hidden;
    background: #F5F7FA

  }

  router-link{
    all:unset;
  }
</style>
