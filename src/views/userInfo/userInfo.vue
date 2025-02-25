<template>
  <el-form>
    <el-form-item label="用户名:">
      <el-input v-model="data.username"/>
    </el-form-item>
    <el-form-item label="角色:">
      {{ data.role }}
    </el-form-item>
    <el-form-item label="学校名称:">
      <el-input :model-value="data.schoolname" />
    </el-form-item>
    <el-form-item label="密码修改:">
      <el-button>修改密码</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSave">保存设置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { onBeforeMount, onMounted, reactive } from "vue";
import { useAuthStore } from "@/store/authStore";
export default {
  name: "userInfo",
  setup() {
    const authStore = useAuthStore();
    const data = reactive({
      username: "",
      role: "",
      schoolname: "qwq",
    });
    onMounted(() => {
        authStore.getUserInfo().then(()=>{
            data.username = authStore.userInfo.username
        })
    });

    const refreshInfo = () => {
      data.username = authStore.userInfo.username;
      data.schoolname = authStore.userInfo.username;
    };

    const handleSave = () => {};
    return {
      data,
      authStore
    };
  },
};
</script>

<style scoped>
.el-form {
  display: flex;
  justify-self: center;
  align-self: center;
  flex-direction: column;
  margin-top: 20px;
}

.el-form-item {
  margin-top: 10px;
}
.el-form-item .el-input {
  max-width: 300px;
}
</style>