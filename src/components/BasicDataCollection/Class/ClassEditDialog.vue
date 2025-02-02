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
      class="form"
      :model="formInput"
      label-position="right"
      label-width="auto"
      :rules="inputRule"
      ref="classFormRef"
      @submit.enter.prevent
    >
      <el-tabs v-model="activePan">
          <el-scrollbar height="400px">
            <el-form-item label="所在校区:" prop="campusName">
              <el-select
                v-model="formInput.campusName"
                value-key="id"
                placeholder="请选择所在校区"
                filterable
              >
                <el-option
                  v-for="campus of campuses"
                  :label="campus.name"
                  :value="campus.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="院系:" prop="facultyId">
              <el-select
                v-model="formInput.facultyId"
                value-key="id"
                placeholder="请选择院系"
                filterable
              >
                <el-option
                  v-for="faculty of faculties"
                  :label="faculty.name"
                  :value="faculty.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="专业:" prop="majorId">
              <el-select
                v-model="formInput.majorId"
                value-key="id"
                placeholder="请选择专业"
                filterable
              >
                <el-option
                  v-for="major of majorFilter"
                  :label="major.name"
                  :value="major.id"
                />
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

            <el-form-item label="学制:" prop="classDuration">
              <div class="numberInput">
                <el-input-number
                  v-model="formInput.classDuration"
                  max="6"
                  min="0"
                  class="inputs"
                  placeholder="学制"
                  controls-position="right"
                >
                  <template #suffix> 年 </template>
                </el-input-number>
              </div>
            </el-form-item>

            <el-form-item label="培养层次:" prop="educationalLevel">
              <el-select
                v-model="formInput.educationalLevel"
                value-key="id"
                placeholder="请选择培养层次"
                filterable
              >
                <el-option
                  v-for="e of educationalLevels"
                  :label="e"
                  :value="e"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="班级类型:" prop="classType">
              <el-select
                v-model="formInput.classType"
                value-key="id"
                placeholder="请选择班级类型"
                filterable
              >
                <el-option
                  v-for="type of classTypies"
                  :label="type"
                  :value="type"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="入学年份:" prop="enrollmentYear">
              <el-date-picker
                type="year"
                v-model="formInput.enrollmentYear"
                placeholder="选择入学年份"
                @change="getGraduationYearByEnrollmentYear"
                value-format="YYYY"
              />
            </el-form-item>

            <el-form-item label="预计毕业年份:" prop="graduationYear">
              <el-date-picker
                type="year"
                v-model="formInput.graduationYear"
                placeholder="选择预计毕业年份"
                value-format="YYYY"
              />
            </el-form-item>

            <el-form-item label="是否毕业:" prop="isGraduated">
              <el-switch v-model="formInput.isGraduated" />
            </el-form-item>

            <el-form-item label="是否有固定教室:" prop="isAssigned">
              <el-switch
                v-model="formInput.isAssigned"
                :active-value="true"
                :inactive-value="false"
              />
            </el-form-item>

            <el-form-item
              label="固定教室:"
              v-show="formInput.isAssigned"
              prop="classAssigendClassroom"
            >
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

            <el-form-item label="班级人数:" prop="classSize">
              <div class="numberInput">
                <el-input-number

                  v-model.number="formInput.classSize"
                  :max="formInput.classMaxSize"
                  min="0"
                  class="inputs"
                  placeholder="人数"
                  controls-position="right"
                />
              </div>
            </el-form-item>
            <el-form-item label="班级最大人数:" prop="classMaxSize">
              <div class="numberInput">
                <el-input-number
                  v-model.number="formInput.classMaxSize"
                  max="999"
                  min="0"
                  class="inputs"
                  placeholder="最大人数"
                  controls-position="right"
                />
              </div>
            </el-form-item>
            <el-form-item label="简称:" prop="classAbbr">
              <el-input
                v-model="formInput.classAbbr"
                maxlength="50"
                class="inputs"
                placeholder="请输入简称"
              />
            </el-form-item>

            <el-form-item label="辅导员:" prop="counsellorId">
              <el-select
                v-model="formInput.counsellorId"
                value-key="id"
                placeholder="请选择辅导员"
                filterable
              >
                <el-option
                  v-for="grade of grades"
                  :label="grade"
                  :value="grade"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="班主任:" prop="headTeacherId">
              <el-select
                v-model="formInput.headTeacherId"
                value-key="id"
                placeholder="请选择班主任"
                filterable
              >
                <el-option
                  v-for="grade of grades"
                  :label="grade"
                  :value="grade"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="班长:" prop="monitorName">
              <el-input
                v-model="formInput.monitorName"
                maxlength="20"
                class="inputs"
                placeholder="请输入班长姓名"
              />
            </el-form-item>
            <el-form-item label="班助:" prop="classAssistantName">
              <el-input
                v-model="formInput.classAssistantName"
                maxlength="20"
                class="inputs"
                placeholder="请输入班助姓名"
              />
            </el-form-item>

            <el-form-item label="性别分布" prop="genderDistribution">
              <el-input
                v-model="formInput.classAbbr"
                maxlength="50"
                class="inputs"
                placeholder="请输入性别分布"
              />
            </el-form-item>

            <el-form-item label="班主任电话号码:" prop="headTeacherPhoneNumber">
              <el-input
                v-model="formInput.headTeacherPhoneNumber"
                maxlength="11"
                class="inputs"
                placeholder="请输入电话号码"
              />
            </el-form-item>
            <el-form-item label="毕业学年学期:" prop="graduationYearSemester">
              <el-input
                v-model="formInput.graduationYearSemester"
                maxlength="50"
                class="inputs"
                placeholder="请输入毕业学年学期"
              />
            </el-form-item>

            <el-form-item label="学业导师:" prop="mentorId">
              <el-select
                v-model="formInput.mentorId"
                value-key="id"
                placeholder="请选择学业导师"
                filterable
              >
                <el-option
                  v-for="classroom of classrooms"
                  :label="classroom.name"
                  :value="classroom"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="备注:" prop="remark">
              <el-input
                v-model="formInput.remark"
                maxlength="200"
                class="inputs"
                placeholder="请输入备注"
                type="textarea"
                autosize
              />
            </el-form-item>
          </el-scrollbar>
      </el-tabs>

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
import { computed, reactive, ref, toRefs } from "vue";
import { v1 as uuid } from "uuid";
import bus from "@/bus/bus";
import nonEmptyValidator from "@/hooks/validator/useNonEmpty";
import { storeToRefs } from "pinia";
import { useAcademicStore } from "@/store/academicStore";
import { useLocationStore } from '@/store/locationStore';

export default {
  name: "ClassEditDialog",
  mounted() {
    bus.on("showClassEdit", (value) => {
      this.mode = false;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.$nextTick(() => {
        this.id = value.id;
        this.formInput.className = value.name;
        this.formInput.classAbbr = value.abbr;
        this.formInput.classDuration = value.duration;
        this.formInput.educationalLevel = value.educationalLevel;
        this.formInput.classType = value.classType;
        this.formInput.counsellorName = value.counsellorName;
        this.formInput.headTeacherName = value.headTeacherName;
        this.formInput.monitorName = value.monitorName;
        this.formInput.classAssistantName = value.classAssistantName;
        this.formInput.enrollmentYear = value.enrollmentYear;
        this.formInput.graduationYear = value.graduationYear;
        this.formInput.isGraduated = value.isGraduated;
        this.formInput.classSize = value.size;
        this.formInput.classMaxSize = value.maxSize;
        this.formInput.genderDistribution = value.genderDistribution;
        this.formInput.facultyId = value.facultyId;
        this.formInput.majorId = value.majorId;
        this.formInput.majorName = value.majorName;
        this.formInput.SpecializationId = value.SpecializationId;
        this.formInput.campusName = value.campusName;
        this.formInput.hasAssignedClassroom = value.hasAssignedClassroom;
        this.formInput.remark = value.remark;
        this.formInput.headTeacherPhoneNumber = value.headTeacherPhoneNumber;
        this.formInput.graduationYearSemester = value.graduationYearSemester;
        this.formInput.isExpanding = value.isExpanding;
        this.formInput.mentorId = value.mentorId;
      });
    });

    bus.on("showClassAdd", () => {
      this.mode = true;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
    });
  },

  setup() {
    const academicStore = useAcademicStore();
    const locationStore = useLocationStore();

    const { faculties,majors,educationalLevels,classTypies } = storeToRefs(academicStore);
    const { campuses,} = storeToRefs(locationStore);

    const classFormRef = ref();
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      activePan: "base",
      mode: false,
    });

    const formInput = reactive({
      id: "",
      className: "",
      classAbbr: "",
      classDuration: "",
      educationalLevel: "",
      classType: "",
      counsellorName: "",
      headTeacherName: "",
      monitorName: "",
      classAssistantName: "",
      enrollmentYear: "",
      graduationYear: "",
      isGraduated: "",
      classSize: "",
      classMaxSize: 100,
      genderDistribution: "",
      facultyId: "", //
      facultyName: "", //
      majorId: "", //
      majorName: "", //
      SpecializationId: "",
      campusName: "",
      hasAssignedClassroom: "",
      Classroom: "",
      remark: "",
      headTeacherPhoneNumber: "",
      graduationYearSemester: "",
      isExpanding: "",
      mentorId: "",
    });

    const inputRule = reactive({
      id: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请输入班级编号!",
          trigger: "blur",
        },
      ],
      className: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请输入班级名称!",
          trigger: "blur",
        },
      ],
      classAbbr: [
        {
          required: false,
        },
      ],
      classDuration: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请输入学制!",
          trigger: "blur",
        },
      ],
      educationalLevel: [
        {
          required: true,
          message: "请选择培养层次!",
          trigger: "change",
        },
      ],
      classType: [
        {
          required: true,
          message: "请选择班级类型!",
          trigger: "change",
        },
      ],
      counsellorName: [
        {
          required: false,
        },
      ],
      headTeacherName: [
        {
          required: false,
        },
      ],
      monitorName: [
        {
          required: false,
        },
      ],
      classAssistantName: [
        {
          required: false,
        },
      ],
      isGraduated: [
        {
          required: false,
        },
      ],
      enrollmentYear: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请选择入学年份!",
          trigger: "change",
        },
      ],
      graduationYear: [
        {
          required: true,
          message: "请选择预计毕业年份!",
          trigger: "change",
        },
        {
          validator:(rule,value,callback)=>{
            if(formInput.enrollmentYear > value){
              callback(new Error())
            }else{
              callback()
            }
          },
          message: "毕业年份小于入学年份!",
          trigger: "change",
        }
      ],
      classSize: [
        {
          required: true,
          message: "请输入班级人数!",
          trigger: "blur",
        },
      ],
      classMaxSize: [
        {
          required: true,
          message: "请输入班级人数!",
          trigger: "blur",
        },
      ],
      genderDistribution: [
        {
          required: false,
        },
      ],
      facultyId: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请选择院系!",
          trigger: "change",
        },
      ],
      majorId: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请输入专业编号!",
          trigger: "blur",
        },
      ],
      majorName: [
        {
          required: true,
          validator: nonEmptyValidator,
          message: "请选择专业!",
          trigger: "change",
        },
      ],
      SpecializationId: [
        {
          required: false,
        },
      ],
      hasAssignedClassroom: [
        {
          required: false,
        },
      ],
      Classroom: [
        {
          required: false,
        },
      ],
      remark: [
        {
          required: false,
        },
      ],
      headTeacherPhoneNumber: [
        {
          required: false,
        },
      ],
      graduationYearSemester: [
        {
          required: false,
        },
      ],
      isExpanding: [
        {
          required: false,
        },
      ],
      mentorId: [
        {
          required: false,
        },
      ],
      campusName: [
        {
          required: true,
          message: "请选择校区!",
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


    const majorFilter = computed(()=>{
      return academicStore.getMajorsByfaculty(formInput.facultyId)
    })

    const getGraduationYearByEnrollmentYear = ()=>{
      if(formInput.classDuration && formInput.enrollmentYear){
        console.log(formInput.enrollmentYear);
        console.log(formInput.graduationYear);
        console.log(formInput.classDuration);
        formInput.graduationYear = (parseInt(formInput.enrollmentYear) + formInput.classDuration).toString()
      }
    }



    return {
      ...toRefs(data),
      formInput,
      editItem,
      addItem,
      ClearInput,
      classFormRef,
      inputRule,
      campuses,
      faculties,
      majors,
      educationalLevels,
      classTypies,
      majorFilter,
      getGraduationYearByEnrollmentYear,
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


.el-scrollbar{
  padding-right: 20px;
}
</style>