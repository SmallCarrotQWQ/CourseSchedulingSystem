<template>
    <div class="userInfo">
        <div class="HaveLoggedIn">
            <el-icon><User /></el-icon>
            <span class="username">19557717091</span>

            <el-link :underline="false" @click="this.$router.push({name:'AccountManagement'})" class="ToAccountManage">
                    <span >账户管理</span>
            </el-link>
            <el-link :underline="false" @click="this.$router.push({name:'login'})" class="Logout">
                    <span >退出登录</span>
            </el-link>
        </div>
        
    </div>
</template>

<script>
export default {
    name:"accountInfo"
}
</script>

<style scoped>
    .userInfo{
        height: 100%;
        display: flex;
        align-items: baseline;
    }

    .HaveLoggedIn{
        margin: auto 10px;
    }

    .username{
        margin: 0px 10px;
    }

    .ToAccountManage,.Logout{
        all:unset;
        margin-right: 10px;
    }
</style>