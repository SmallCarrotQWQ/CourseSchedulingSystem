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
      ref="teacherFormRef"
      @submit.enter.prevent
    >
      <el-form-item label="院系:" prop="teacherFaculty">
        <el-select
          v-model="formInput.teacherFaculty"
          value-key="id"
          placeholder="请选择院系"
          filterable
        >
          <el-option v-for="obj of faculties" :label="obj.name" :value="obj" />
        </el-select>
      </el-form-item>

      <el-form-item label="教师号:" prop="teacherId">
        <el-input
          v-model="formInput.teacherId"
          maxlength="50"
          class="inputs"
          placeholder="请输入教师号"
        />
      </el-form-item>

      <el-form-item label="教师姓名:" prop="teacherName">
        <el-input
          v-model="formInput.teacherName"
          maxlength="50"
          class="inputs"
          placeholder="请输入教师姓名"
        />
      </el-form-item>
      <el-form-item label="职称:" prop="teacherTitle">
        <el-select
          v-model="formInput.teacherTitle"
          value-key="id"
          placeholder="请选择职称"
          filterable
        >
          <el-option v-for="obj of faculties" :label="obj.name" :value="obj" />
        </el-select>
      </el-form-item>

      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="editItem(teacherFormRef)"
          v-show="!mode"
        >
          <span>修改</span>
        </el-button>

        <el-button
          type="primary"
          @click="addItem(teacherFormRef)"
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
import { useTeacherStore } from "@/store/teacher";
import { useFacultyStore } from "@/store/faculty";
import nonEmptyValidator from "@/hooks/validator/useNonEmpty";
import { storeToRefs } from 'pinia';

export default {
  name: "TeacherEditDialog",
  mounted() {
    bus.on("showTeacherEdit", (value) => {
      this.mode = false;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.formInput.teacherId = value.teacherId;
      this.formInput.teacherName = value.name;
      this.formInput.teacherFaculty = value.faculty;
      this.formInput.teacherTitle = value.title;
      this.id = value.id;
    });

    bus.on("showTeacherAdd", () => {
      this.mode = true;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
    });
  },
  setup() {
    const TeacherStore = useTeacherStore();
    const facultyStore = useFacultyStore();
    const {faculties} = storeToRefs(facultyStore);
    const teacherFormRef = ref();
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      id: "",
      mode: false,
    });

    const formInput = reactive({
      teacherId: "",
      teacherName: "",
      teacherFaculty: "",
      teacherTitle: "",
    });

    const inputRule = {
      teacherId: [{ required: false }],
      teacherName: [
        { required: true, validator: nonEmptyValidator, message: "请输入教师姓名!",trigger: "blur" },
      ],
      teacherFaculty: [
        { required: true, validator: nonEmptyValidator, message: "请选择教师所属的院系!",trigger: "blur" },
      ],
      teacherTitle: [
        { required: true, validator: nonEmptyValidator,message: "请选择教师的职称!", trigger: "blur" },
      ],
    };

    const addItem = (formEl) => {
      console.log(formEl);
      if (!formEl) return;
      formEl.validate((validate) => {
        if (validate) {
          TeacherStore.Add({
            id: uuid(),
            teacherId: formInput.teacherId,
            name: formInput.teacherName,
            faculty: formInput.teacherFaculty,
            title: formInput.teacherTitle,
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
            TeacherStore.edit({
              id: data.id,
              teacherId: formInput.teacherId,
              name: formInput.teacherName,
              faculty: formInput.teacherFaculty,
              title: formInput.teacherTitle,
            })
          ) {
            data.isDialogFormVisible = false; //确认后关闭弹窗
            formEl.resetFields();
          }
        }
      });
    };

    const ClearInput = () => {
      teacherFormRef.value.resetFields();
    };

    return {
      ...toRefs(data),
      formInput,
      editItem,
      addItem,
      ClearInput,
      teacherFormRef,
      inputRule,
      faculties
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