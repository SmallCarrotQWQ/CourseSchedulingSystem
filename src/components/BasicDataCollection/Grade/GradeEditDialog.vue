<template>
  <el-dialog
    v-model="isDialogFormVisible"
    :title="mode ? '添加' : '修改'"
    width="450"
    class="dialog"
    :close-on-click-modal="false"
    :show-close="false"
    @close="ClearInput"
  >
    <el-form
      class="campusform"
      :model="formInput"
      :rules="inputRule"
      label-position="right"
      label-width="auto"
      ref="gradeFormRef"
    >
      <el-form-item label="年级名称:" prop="gradeName">
        <el-input
          v-model="formInput.gradeName"
          maxlength="50"
          class="campusName"
          placeholder="请选择入学年份"
          disabled
        />
      </el-form-item>

      <el-form-item label="学制:" prop="duration">
        <div class="numberInput">
          <el-input-number
            v-model.number="formInput.duration"
            max="10"
            min="0"
            class="inputs"
            placeholder="学制"
            controls-position="right"
            @change="getGraduationYearByEnrollmentYear"
          />
        </div>
      </el-form-item>

      <el-form-item label="入学年份:" prop="enrollmentYear">
        <el-date-picker
          type="year"
          v-model="formInput.enrollmentYear"
          placeholder="选择入学年份"
          @change="getGraduationYearByEnrollmentYear();getGradeName()"
          value-format="YYYY"
        />
      </el-form-item>

      <el-form-item label="预计毕业年份:" prop="graduationYear">
        <el-date-picker
          type="year"
          v-model="formInput.graduationYear"
          placeholder="选择预计毕业年份"
          value-format="YYYY"
          disabled
        />
      </el-form-item>

      <el-form-item prop="isGraduated" label="是否毕业:">
        <el-switch v-model="formInput.isGraduated" />
      </el-form-item>

      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="editItem(gradeFormRef)"
          v-show="!mode"
        >
          <span>修改</span>
        </el-button>

        <el-button type="primary" @click="addItem(gradeFormRef)" v-show="mode">
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
import nonEmptyValidator from "@/hooks/validator/useNonEmpty";
import { useAcademicStore } from "@/store/academicStore";
import { storeToRefs } from "pinia";
export default {
  name: "GradeEditDialog",
  mounted() {
    bus.on("showGradeEdit", (value) => {
      this.mode = false;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.$nextTick(() => {
        this.id = value.id;
        this.formInput.gradeName = value.name;
        this.formInput.duration = value.duration;
        this.formInput.enrollmentYear = value.enrollmentYear;
        this.formInput.graduationYear = value.graduationYear;
        this.formInput.isGraduated = value.isGraduated;
        this.formInput.educationalLevelId = value.educationalLevelId;
        this.formInput.gradeLevel = value.gradeLevel;
      });
    });

    bus.on("showGradeAdd", () => {
      this.mode = true;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
    });
  },
  setup() {
    const academicStore = useAcademicStore();
    const { educationalLevels } = storeToRefs(academicStore);
    const gradeFormRef = ref({});
    const data = reactive({
      id: "",
      isDialogFormVisible: false, //是否弹窗
      mode: false,
    });

    const formInput = reactive({
      gradeName: "",
      duration: "",
      enrollmentYear: "",
      graduationYear: "",
      isGraduated: false,
    });

    const inputRule = {
      gradeName: [
        {
          required: true,
          message: "请选择入学年份!",
        },
      ],
      duration: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "change",
          message: "请输入学制!",
        },
      ],
      enrollmentYear: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "change",
          message: "请选择入学年份!",
        },
      ],
      isGraduated: [
        {
          required: false,
        }
      ],

    };

    const addItem = (formEl) => {
      if (!formEl) return;
      formEl.validate((validate) => {
        if (validate) {
          academicStore.AddGrade({
            id: uuid(),
            name: formInput.gradeName,
            duration: formInput.duration,
            enrollmentYear: formInput.enrollmentYear,
            graduationYear: formInput.graduationYear,
            isGraduated: formInput.isGraduated,
            educationalLevelId: formInput.educationalLevelId,
            gradeLevel: formInput.gradeLevel,
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
            academicStore.EditGrade({
              id: data.id,
              name: formInput.gradeName,
              duration: formInput.duration,
              enrollmentYear: formInput.enrollmentYear,
              graduationYear: formInput.graduationYear,
              isGraduated: formInput.isGraduated,
              educationalLevelId: formInput.educationalLevelId,
              gradeLevel: formInput.gradeLevel,
            })
          ) {
            data.isDialogFormVisible = false; //确认后关闭弹窗
            formEl.resetFields();
          }
        }
      });
    };

    const ClearInput = () => {
      gradeFormRef.value.resetFields();
    };

    const getGraduationYearByEnrollmentYear = () => {
      if (formInput.duration && formInput.enrollmentYear) {
        formInput.graduationYear = (
          parseInt(formInput.enrollmentYear) + formInput.duration
        ).toString();
      }
    };
    const getGradeName = () => {
      if (formInput.enrollmentYear) {
        formInput.gradeName = formInput.enrollmentYear + "级"
      }else{
        formInput.gradeName = ""
      }
    };

    return {
      ...toRefs(data),
      formInput,
      ClearInput,
      editItem,
      addItem,
      gradeFormRef,
      inputRule,
      getGraduationYearByEnrollmentYear,
      educationalLevels,
      getGradeName
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