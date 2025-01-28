<template>
  <div class="background">
    <div class="LoginContent">
        <span class="LoginTitle">登录</span>
        <div>
            <el-form 
             class="LoginForm"
             label-position="right"
             label-width="auto" 
             > 

            <el-form-item label="用户名">
                <el-input v-model="username" placeholder="请输入用户名" maxlength="20"/>
            </el-form-item>

            <el-form-item label="密码">
                <el-input v-model="password" placeholder="请输入密码" maxlength="25" show-password />
            </el-form-item>

            <el-checkbox>
                记住我
            </el-checkbox>
            <el-button type="primary" class="LoginButton" @click="this.$router.push({name:'content'})">登录</el-button>
            <el-row justify="space-between">
                <el-link :underline="false">
                    <span>忘记密码?</span>
                </el-link>

                <el-link :underline="false">
                    <span>注册</span>
                </el-link>
            </el-row>




        </el-form>
        </div>
        
    </div>
  </div>
</template>

<script>
import {reactive, ref,toRefs} from 'vue'
export default {
    name:"Login",
    setup(){
        const data = reactive({
            username:'',
            password:'',
        })
        return {
            ...toRefs(data)
        }
    }
}
</script>

<style scoped>
    .background{
        height: 100%;
        width: 100%;
        background-image: url("@/assets/Login_bk.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
    }

    .LoginTitle{
        font-size: 160%;
        margin: 20px;
    }

    .LoginContent{
        height: 360px;
        width: 330px;
        background: white;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .LoginForm{
        min-width: 280px;
    }

    .LoginButton{
        width: 100%;
        margin: 10px 0px;
    }

    a{
    all:unset;
  }


</style>