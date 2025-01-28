<template>
  <el-dialog
    v-model="isDialogFormVisible"
    title="修改院系"
    width="450"
    class="dialog"
    :close-on-click-modal="false"
    :show-close="false"
    @close="ClearInput"
  >
    <el-form
      class="form"
      :model="formInput"
      label-position="right"
      label-width="auto"
      :rules="inputRule"
      ref="facultyFormRef"
      @submit.enter.prevent
    >
      <el-form-item label="院系名称:" prop="facultyName">
        <el-input
          v-model="formInput.facultyName"
          maxlength="50"
          class="inputs"
          placeholder="请输入院系名称"
        />
      </el-form-item>

      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="editItem(facultyFormRef)"
          v-show="!mode"
        >
          <span>修改</span>
        </el-button>

        <el-button
          type="primary"
          @click="addItem(facultyFormRef)"
          v-show="mode"
        >
          <span>添加</span>
        </el-button>

        <el-button @click="isDialogFormVisible = false">
          <span>取消</span>
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
console.log(app);
import { reactive, ref, toRefs } from "vue";
import { v1 as uuid } from "uuid";
import bus from "@/bus/bus";
import { useFacultyStore } from "@/store/faculty";
import nonEmptyValidator from "@/hooks/validator/useNonEmpty";

export default {
  name: "FacultyEditDialog",
  mounted() {
    bus.on("showFacultyEdit", (value) => {
      this.mode = false;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.formInput.facultyName = value.name;
      this.id = value.id;
    });

    bus.on("showFacultyAdd", () => {
      this.mode = true;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
    });
  },
  setup() {
    const FacultyStore = useFacultyStore();
    const facultyFormRef = ref();
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      id: "",
      mode: false,
    });

    const formInput = reactive({
      facultyName: "",
    });

    const inputRule = {
      facultyName: [
        { required: true, validator: nonEmptyValidator, trigger: "blur" },
      ],
    };

    const addItem = (formEl) => {
      console.log(formEl);
      if (!formEl) return;
      formEl.validate((validate) => {
        if (validate) {
          FacultyStore.Add({
            id: uuid(),
            name: formInput.facultyName,
          });
          data.isDialogFormVisible = false; //确认后关闭弹窗
          formEl.resetFields();
        }
      });
    };

    const editItem = (formEl) => {
      if (!formEl) return;
      formEl.validate((validate) => {
        if (validate) {
          if (
            FacultyStore.edit({
              id: data.id,
              name: formInput.facultyName,
            })
          ) {
            data.isDialogFormVisible = false; //确认后关闭弹窗
            formEl.resetFields();
          }
        }
      });
    };

    const ClearInput = () => {
      facultyFormRef.value.resetFields();
    };

    return {
      ...toRefs(data),
      formInput,
      editItem,
      addItem,
      ClearInput,
      facultyFormRef,
      inputRule,
    };
  },
};
</script>

<style>
.form {
  margin: 20px;
}

.inputs,
.remark {
  max-width: 300px;
}

.btn .el-form-item__content {
  display: flex;
  justify-content: right;
}
.numberInput {
  display: inline-flex;
  flex-direction: column;
}
</style>