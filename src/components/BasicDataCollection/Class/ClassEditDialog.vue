<template>
  <el-dialog
    v-model="isDialogFormVisible"
   :title= 'mode ? "添加":"修改"'
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
      ref="classFormRef"
      @submit.enter.prevent
    >
      <el-form-item label="院系:" prop="classFaculty">
        <el-select
          v-model="formInput.classFaculty"
          value-key="id"
          placeholder="请选择院系"
          filterable
        >
          <el-option
            v-for="faculty of faculties"
            :label="faculty.name"
            :value="faculty"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="专业:" prop="classMajor">
        <el-select
          v-model="formInput.classMajor"
          value-key="id"
          placeholder="请选择专业"
          filterable
        >
          <el-option
            v-for="major of majors"
            :label="major.name"
            :value="major"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="年级:" prop="classGrade">
        <el-select
          v-model="formInput.classGrade"
          value-key="id"
          placeholder="请选择年级"
          filterable
        >
          <el-option v-for="grade of grades" :label="grade" :value="grade" />
        </el-select>
      </el-form-item>

      <el-form-item label="班级名:" prop="className">
        <el-input
          v-model="formInput.className"
          maxlength="50"
          class="inputs"
          placeholder="请输入班级名"
        />
      </el-form-item>

      <el-form-item label="班级人数:" prop="classSize">
        <div class="numberInput">
          <el-input-number
            v-model.number="formInput.classSize"
            max="1000"
            min="0"
            class="inputs"
            placeholder="人数"
          />
        </div>
      </el-form-item>

      <el-form-item label="是否有固定教室:" prop="isAssigned">
        <el-switch
          v-model="formInput.isAssigned"
          :active-value="true"
          :inactive-value="false"
        />
      </el-form-item>

      <el-form-item label="固定教室:" v-show="formInput.isAssigned" prop="classAssigendClassroom">
        <el-select
          v-model="formInput.classAssigendClassroom"
          value-key="id"
          placeholder="请选择教室"
          filterable
        >
          <el-option
            v-for="classroom of classrooms"
            :label="classroom.name"
            :value="classroom"
          />
        </el-select>
      </el-form-item>

      

      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="editItem(classFormRef)"
          v-show="!mode"
        >
          <span>修改</span>
        </el-button>

        <el-button type="primary" @click="addItem(classFormRef)" v-show="mode">
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
import { useClassStore } from "@/store/class";
import { useFacultyStore } from "@/store/faculty";
import { useMajorStore } from "@/store/major";
import { useClassroomStore } from "@/store/classroom";
import nonEmptyValidator from "@/hooks/validator/useNonEmpty";
import { storeToRefs } from "pinia";

export default {
  name: "ClassEditDialog",
  mounted() {
    bus.on("showClassEdit", (value) => {
      this.mode = false;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.formInput.className = value.name;
      this.formInput.classFaculty = value.faculty;
      this.formInput.classMajor = value.major;
      this.formInput.classGrade = value.grade;
      this.formInput.classSize = value.size;
      this.formInput.classAssigend = value.assigend;
      this.formInput.classAssigendClassroom = value.classroom;
      this.id = value.id;
    });

    bus.on("showClassAdd", () => {
      this.mode = true;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
    });
  },

  setup() {
    const ClassStore = useClassStore();
    const facultyStore = useFacultyStore();
    const majorStore = useMajorStore();
    const ClassroomStore = useClassroomStore();

    const { faculties } = storeToRefs(facultyStore);
    const { majors } = storeToRefs(majorStore);
    const { classrooms } = storeToRefs(ClassroomStore);

    const classFormRef = ref();
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      id: "",
      mode: false,
    });

    const formInput = reactive({
      classFaculty: "",
      classMajor: "",
      classGrade: "",
      classSize: 0,
      classAssigend: false,
      classAssigendClassroom: undefined,
    });

    const inputRule = reactive({
      classFaculty: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请选择院系!",
          trigger: "change",
        },
      ],
      classMajor: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请选择专业!",
          trigger: "change",
        },
      ],
      classGrade: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请选择年级!",
          trigger: "change",
        },
      ],
      className: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请输入班级名!",
          trigger: "blur",
        },
      ],
      classSize: [
        {
          required: true,
          message: "请输入班级人数!",
          trigger: "blur",
        },
      ],
      classAssigend: [
        {
          required: false
        },
      ],
      classAssigendClassroom: [
        {
          required: formInput.classAssigend,
          validator: nonEmptyValidator,
          message: "请选择班级的固定教室!",
          trigger: "change",
        },
      ],
    });

    const addItem = (formEl) => {
      console.log(formEl);
      if (!formEl) return;
      formEl.validate((validate) => {
        if (validate) {
          ClassStore.Add({
            id: uuid(),
            faculty: formInput.classFaculty,
            major: formInput.classMajor,
            grade: formInput.classGrade,
            size: formInput.classSize,
            assigendClassroom: formInput.classAssigendClassroom,
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
            ClassStore.edit({
              id: data.id,
              faculty: formInput.classFaculty,
              major: formInput.classMajor,
              grade: formInput.classGrade,
              size: formInput.classSize,
              assigendClassroom: formInput.classAssigendClassroom,
            })
          ) {
            data.isDialogFormVisible = false; //确认后关闭弹窗
            formEl.resetFields();
          }
        }
      });
    };

    const ClearInput = () => {
      classFormRef.value.resetFields();
    };

    return {
      ...toRefs(data),
      formInput,
      editItem,
      addItem,
      ClearInput,
      classFormRef,
      inputRule,
      faculties,
      majors,
      classrooms,
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