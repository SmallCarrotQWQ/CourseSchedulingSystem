<template>
  <el-dialog
    v-model="isDialogFormVisible"
    title="修改教学楼"
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
      <el-form-item label="所属校区" prop="teachingBuildingCampus"
        ><!--下拉框-->
        <el-select
          v-model="formInput.teachingBuildingCampus"
          placeholder="请选择校区"
          filterable
          value-key="id"
        >
          <el-option
            v-for="obj of campuses"
            :label="obj.name"
            :value="obj"
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

        <el-button type="primary" @click="addItem(teachingBuildingFormRef)" v-show="mode">
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
import { reactive, ref, toRefs } from "vue";
import { v1 as uuid } from "uuid";
import bus from "@/bus/bus";
import { useCampusStore } from "@/store/campus";
import { useTeachingBuildingStore } from "@/store/teachingBuilding";
import nonEmptyValidator from "@/hooks/validator/useNonEmpty";
import { storeToRefs } from "pinia";
export default {
  name: "TeachingBuildingEditDialog",
  mounted() {
    bus.on("showTeachingBuildingEdit", (value) => {
      this.mode = false;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.id = value.id;
      this.formInput.teachingBuildingCode = value.code;
      this.formInput.teachingBuildingName = value.name;
      this.formInput.teachingBuildingCampus = value.campus;
      this.formInput.isAvailable = value.available;
    });

    bus.on("showTeachingBuildingAdd", (campus) => {
      console.log(campus);
      this.mode = true;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.formInput.teachingBuildingCampus = campus
    });
  },
  setup() {
    const campusStore = useCampusStore();
    const teachingBuildingStore = useTeachingBuildingStore();
    const { campuses } = storeToRefs(campusStore);
    const teachingBuildingFormRef = ref();
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      id: "",
      mode: false,
    });

    const formInput = reactive({
      teachingBuildingCode: "",
      teachingBuildingName: "",
      teachingBuildingCampus: "",
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
      teachingBuildingCampus: [
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
          teachingBuildingStore.Add({
            id: uuid(),
            code: formInput.teachingBuildingCode,
            name: formInput.teachingBuildingName,
            campus: formInput.teachingBuildingCampus,
            available: formInput.isAvailable,
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
            teachingBuildingStore.edit({
              id: data.id,
              code: formInput.teachingBuildingCode,
              name: formInput.teachingBuildingName,
              campus: formInput.teachingBuildingCampus,
              available: formInput.isAvailable,
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