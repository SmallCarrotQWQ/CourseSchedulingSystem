<template>
  <el-dialog
    v-model="isDialogFormVisible"
    title="修改专业"
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
      ref="majorFormRef"
      @submit.enter.prevent
    >
      <el-form-item label="院系:" prop="majorFaculty">
        <el-select
          v-model="formInput.majorFaculty"
          value-key="id"
          placeholder="请选择院系"
          filterable
        >
          <el-option v-for="obj of faculties" :label="obj.name" :value="obj" />
        </el-select>
      </el-form-item>

      <el-form-item label="专业名称:" prop="majorName">
        <el-input
          v-model="formInput.majorName"
          maxlength="50"
          class="inputs"
          placeholder="请输入专业名称"
        />
      </el-form-item>

      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="
            editItem(majorFormRef);
          "
          v-show="!mode"
        >
          <span>修改</span>
        </el-button>

        <el-button
          type="primary"
          @click="
            addItem(majorFormRef);
          "
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
import nonEmptyValidator from "@/hooks/validator/useNonEmpty";

import { useFacultyStore } from "@/store/faculty";
import { useMajorStore } from "@/store/major";
import { storeToRefs } from "pinia";
export default {
  name: "MajorEditDialog",
  mounted() {
    bus.on("showMajorEdit", (value) => {
      this.mode = false;
      this.id = value.id;
      this.formInput.majorFaculty = value.faculty;
      this.formInput.majorName = value.name;
      this.isDialogFormVisible = true; //List中按下修改按钮弹窗
    });

    bus.on("showMajorAdd", () => {
      this.mode = true;
      this.isDialogFormVisible = true; //List中按下添加按钮弹窗
    });
  },
  setup() {
    const facultyStore = useFacultyStore();
    const { faculties } = storeToRefs(facultyStore);
    const MajorStore = useMajorStore();
    const majorFormRef = ref()
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      id: "",
      mode: false,
    });

    const formInput = reactive({
      //输入框内容
      majorFaculty: "",
      majorName: "",
    });



    const addItem = (formEl) => {
      if(!formEl)return
      formEl.validate((validate)=>{
        if(validate){
          MajorStore.Add({
            id: uuid(),
            faculty: formInput.majorFaculty,
            name: formInput.majorName,
          });
        data.isDialogFormVisible = false; //确认后关闭弹窗
        formEl.resetFields()
        }
      })
    }



    const inputRule = {
      majorFaculty: [{ required:true, message: "请选择院系!", trigger: "change" }],
      majorName:[
        { required:true,validator:nonEmptyValidator, message: "请输入专业名称!",trigger: "blur" },
      ],
    };

    const editItem = (formEl) => {
      if(!formEl)return
      formEl.validate((validate)=>{
        console.log(validate);
        if(validate){
          if(MajorStore.edit({
            id:data.id,
            faculty: formInput.majorFaculty,
            name: formInput.majorName,
          })){
            data.isDialogFormVisible = false; //确认后关闭弹窗
            formEl.resetFields()
          };
        
        }
      })
    }

    const ClearInput = () => {
      majorFormRef.value.resetFields()
      // for(key of Object.keys(isInputEmpty)){
      //   if(typeof(isInputEmpty[key]) == "boolean"){
      //     formInput[key] = false
      //   }
    };

    // formInput.campusName = "";
    // formInput.capacity = "";
    // formInput.classroomName = "";
    // formInput.classroomRemark = "";
    // formInput.classroomAddress = "";
    // isInputEmpty.isCapacityEmpty = false;
    // isInputEmpty.isClassroomAddressEmpty = false;
    // isInputEmpty.isClassroomNameEmpty = false;
    // isInputEmpty.isCampusEmpty = false;

    return {
      ...toRefs(data),
      formInput,
      ClearInput,
      editItem,
      addItem,
      faculties,
      inputRule,
      majorFormRef,
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