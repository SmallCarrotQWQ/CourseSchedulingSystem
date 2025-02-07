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
      class="campusform"
      :model="formInput"
      :rules="inputRule"
      label-position="right"
      label-width="auto"
      ref="teachingBuildingFormRef"
      @submit.enter.prevent
    >
      <el-form-item label="教学楼编号:" prop="teachingBuildingCode">
        <el-input
          v-model="formInput.teachingBuildingCode"
          maxlength="50"
          class="campusName"
        />
      </el-form-item>
      <el-form-item label="教学楼名称:" prop="teachingBuildingName">
        <el-input
          v-model="formInput.teachingBuildingName"
          maxlength="50"
          class="campusName"
        />
      </el-form-item>
      <el-form-item label="所属校区" prop="teachingBuildingCampusId"
        ><!--下拉框-->
        <el-select
          v-model="formInput.teachingBuildingCampusId"
          placeholder="请选择校区"
          filterable
          value-key="id"
        >
          <el-option
            v-for="obj of campuses"
            :label="obj.name"
            :value="obj.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="是否可用:" prop="isAvailable">
        <el-switch
          v-model="formInput.isAvailable"
          :active-value="true"
          :inactive-value="false"
        />
      </el-form-item>

      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="editItem(teachingBuildingFormRef)"
          v-show="!mode"
        >
          <span>修改</span>
        </el-button>

        <el-button
          type="primary"
          @click="addItem(teachingBuildingFormRef)"
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
import { onMounted, reactive, ref, toRefs } from "vue";
import { v1 as uuid } from "uuid";
import bus from "@/bus/bus";
import { useLocationStore } from "@/store/locationStore/index.js";

import nonEmptyValidator from "@/hooks/validator/useNonEmpty";
import { storeToRefs } from "pinia";
export default {
  name: "TeachingBuildingEditDialog",
  setup() {
    const locationStore = useLocationStore();
    const { campuses } = storeToRefs(locationStore);
    const teachingBuildingFormRef = ref({});

    onMounted(() => {
      bus.on("showTeachingBuildingEdit", (value) => {
        data.mode = false;
        data.isDialogFormVisible = true; //List中按下按钮弹窗
        data.id = value.id;
        formInput.teachingBuildingCode = value.code;
        formInput.teachingBuildingName = value.name;
        formInput.teachingBuildingCampusId = value.campusId;
        formInput.isAvailable = value.isAvailable;
      });

      bus.on("showTeachingBuildingAdd", (campusId) => {
        data.mode = true;
        data.isDialogFormVisible = true; //List中按下按钮弹窗
        formInput.teachingBuildingCampusId = campusId;
      });
    });
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      id: "",
      mode: false,
    });

    const formInput = reactive({
      teachingBuildingCode: "",
      teachingBuildingName: "",
      teachingBuildingCampusId: "",
      isAvailable: true,
    });

    const inputRule = {
      teachingBuildingCode: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "blur",
          message: "请输入教学楼编号!",
        },
      ],
      teachingBuildingName: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "blur",
          message: "请输入教学楼名称!",
        },
      ],
      teachingBuildingCampusId: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "blur",
          message: "请选择校区!",
        },
      ],
    };

    const addItem = (formEl) => {
      if (!formEl) return;
      formEl.validate((validate) => {
        if (validate) {
          locationStore.AddTeachingBuilding({
            id: uuid(),
            code: formInput.teachingBuildingCode,
            name: formInput.teachingBuildingName,
            campusId: formInput.teachingBuildingCampusId,
            isAvailable: formInput.isAvailable,
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
            locationStore.EditTeachingBuilding({
              id: data.id,
              code: formInput.teachingBuildingCode,
              name: formInput.teachingBuildingName,
              campusId: formInput.teachingBuildingCampusId,
              isAvailable: formInput.isAvailable,
            })
          ) {
            data.isDialogFormVisible = false; //确认后关闭弹窗
            formEl.resetFields();
          }
        }
      });
    };

    const ClearInput = () => {
      teachingBuildingFormRef.value.resetFields();
    };

    return {
      ...toRefs(data),
      formInput,
      ClearInput,
      editItem,
      addItem,
      campuses,
      teachingBuildingFormRef,
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