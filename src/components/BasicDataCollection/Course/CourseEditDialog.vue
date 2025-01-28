<template>
  <el-dialog
    v-model="isDialogFormVisible"
    title="修改课程"
    width="450"
    class="dialog"
    :close-on-click-modal="false"
    :show-close="false"
    @close="ClearInput"
  >
    <el-form class="form" label-position="right" label-width="auto" @submit.enter.prevent>
      <el-form-item label="课程号"
        ><!--下拉框-->
        <el-select
          v-model="campusName"
          @blur="checkCampus"
          placeholder="请选择校区"
        >
          <el-option
            v-for="obj of Campuses"
            :label="obj.name"
            :value="obj.name"
          />
        </el-select>
        <el-text type="danger" size="small" v-show="isCampusEmpty"
          >请选择校区!</el-text
        >
      </el-form-item>

      <el-form-item label="ke'ckec:">
        <el-input
          v-model="classroomAddress"
          @blur="checkAddress"
          maxlength="50"
          class="inputs"
          placeholder="请输入教室位置"
        />
        <el-text type="danger" size="small" v-show="isClassroomAddressEmpty"
          >请输入教室位置!</el-text
        >
      </el-form-item>

      <el-form-item label="教室名称:">
        <el-input
          v-model="classroomName"
          @blur="checkName"
          maxlength="50"
          class="inputs"
          placeholder="请输入教室名称"
        />
        <el-text type="danger" size="small" v-show="isClassroomNameEmpty"
          >请输入教室名称!</el-text
        >
      </el-form-item>

      <el-form-item label="可容纳人数:">
        <div class="numberInput">
          <el-input-number
            v-model.number="capacity"
            @blur="checkCapacity"
            max="99999"
            min=""
            class="inputs"
            placeholder="人数"
          />
          <el-text type="danger" size="small" v-show="isCapacityEmpty"
            >请输入可容纳人数!</el-text
          >
        </div>
      </el-form-item>

      <el-form-item label="是否为班级固定教室:">
        <el-switch
          v-model="isAssigned"
          :active-value="true"
          :inactive-value="false"
        />
      </el-form-item>

      <el-form-item label="备注:">
        <el-input
          type="textarea"
          class="remark"
          show-word-limit="true"
          maxlength="100"
          size="large"
          v-model="classroomRemark"
        >
        </el-input>
      </el-form-item>

      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="
            editItem();
            checkAllInputs();
          "
          :disabled="isEditButtonShow"
          v-show="!mode"
        >
          <span>修改</span>
        </el-button>

        <el-button
          type="primary"
          @click="
            addItem();
            checkAllInputs();
          "
          v-show="mode"
          :disabled="isCampusNameEmpty"
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
import { computed, reactive, toRefs } from "vue";
import { v1 as uuid } from "uuid";
import bus from "@/bus/bus";

import { useCourseStore } from "@/store/course"; //store
import { useCampusStore } from "@/store/campus";

import nonEmptyValidator from "@/hooks/validator/useNonEmpty";

export default {
  name: "CourseEditDialog",
  mounted() {
    bus.on("showClassroomEdit", (value) => {
      this.mode = false;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.campusName = value.campus;
      this.classroomAddress = value.address; //input内容
      this.classroomName = value.name;
      this.capacity = value.capacity;
      this.classroomRemark = value.remark;
      this.id = value.id;
      this.isAssigned = value.assigned;
    });

    bus.on("showClassroomAdd", () => {
      this.mode = true;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
    });
  },
  setup() {
    const CourseStore = useCourseStore();
    const Campuses = useCampusStore().campuses;
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      id: "",
      mode: false,
    });

    const formInput = reactive({
      campusName: "",
      classroomAddress: "", //input内容
      classroomName: "",
      capacity: "",
      classroomRemark: "",
      isAssigned: false,
    });
    const isInputEmpty = reactive({
      isCampusEmpty: false,
      isClassroomAddressEmpty: false,
      isClassroomNameEmpty: false,
      isCapacityEmpty: false,
    });

    const checkInputs = {
      checkCampus: () => {
        isInputEmpty.isCampusEmpty = isEmpty(formInput.campusName);
      },
      checkName: () => {
        isInputEmpty.isClassroomNameEmpty = isEmpty(formInput.classroomName);
      },
      checkAddress: () => {
        isInputEmpty.isClassroomAddressEmpty = isEmpty(
          formInput.classroomAddress
        );
      },
      checkCapacity: () => {
        isInputEmpty.isCapacityEmpty = isEmpty(formInput.capacity);
      },
    };

    const checkAllInputs = () => {
      for (let key of Object.keys(checkInputs)) {
        checkInputs[key]();
      }
    };

    const isEditButtonShow = computed(() => {});

    const addItem = () => {
      checkAllInputs()
      if (
        !isInputEmpty.isCampusEmpty &&
        !isInputEmpty.isClassroomAddressEmpty &&
        !isInputEmpty.isCapacityEmpty &&
        !isInputEmpty.isClassroomNameEmpty
      ) {
        ClassroomStore.Add({
          id: uuid(),
          campus: formInput.campusName,
          name: formInput.classroomName,
          address: formInput.classroomAddress,
          capacity: formInput.capacity,
          remark: formInput.classroomRemark,
          assigned:formInput.isAssigned,
        });
        data.isDialogFormVisible = false; //确认后关闭弹窗
        ClearInput();
      }
    };

    const editItem = () => {
      if (
        ClassroomStore.editItem(
          [
            { key: "campus", value: formInput.campusName },
            { key: "name", value: formInput.classroomName },
            { key: "address", value: formInput.classroomAddress },
            { key: "capacity", value: formInput.capacity },
          ],
          [{ key: "remark", value: formInput.classroomRemark },
            { key: "assigned", value: formInput.isAssigned },
          ],
          data.id
        )
      ) {
        data.isDialogFormVisible = false; //确认后关闭弹窗
        ClearInput();
      }
    };

    const ClearInput = () => {
      Object.keys(toRefs(formInput)).forEach((key) => {
        if (typeof formInput[key] == "boolean") {
          formInput[key] = false;
        }
        if (typeof formInput[key] == "string") {
          formInput[key] = "";
        }
      });
      Object.keys(toRefs(isInputEmpty)).forEach((key) => {
        if (typeof isInputEmpty[key] == "boolean") {
          isInputEmpty[key] = false;
        }
      });

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
      ...toRefs(formInput),
      ...toRefs(isInputEmpty),
      ...checkInputs,
      ClearInput,
      editItem,
      addItem,
      isEditButtonShow,
      Campuses,
      checkAllInputs,
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