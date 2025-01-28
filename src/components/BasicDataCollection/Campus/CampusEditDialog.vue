<template>
  <el-dialog
    v-model="isDialogFormVisible"
    title="修改校区"
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
      ref="campusFormRef"

    >
      <el-form-item label="校区名称:" prop="campusName">
        <el-input
          v-model="formInput.campusName"
          maxlength="50"
          class="campusName"
        />
      </el-form-item>

      <el-form-item label="备注:" prop="campusRemark">
        <el-input
          type="textarea"
          class="remark"
          show-word-limit="true"
          maxlength="100"
          size="large"
          v-model="formInput.campusRemark"
        >
        </el-input>
      </el-form-item>

      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="editItem(campusFormRef);"
          v-show="!mode"
        >
          <span>修改</span>
        </el-button>

        <el-button
          type="primary"
          @click="addItem(campusFormRef);"
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
import { useCampusStore } from "@/store/campus";
import nonEmptyValidator from "@/hooks/validator/useNonEmpty";
export default {
  name: "CampusEditDialog",
  mounted() {
    bus.on("showCampusEdit", (value) => {
      this.mode = false;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.id = value.id;
      this.formInput.campusName = value.name;
      this.formInput.campusRemark = value.remark;
    });

    bus.on("showCampusAdd", () => {
      this.mode = true;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
    });
  },
  setup() {
    const campusStore = useCampusStore();
    const campuses = useCampusStore().campuses;
    const campusFormRef = ref();
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      id: "",
      mode: false,
    });

    const formInput = reactive({
      campusName: "",
      campusRemark: "",
    });

    const inputRule = {
      campusName: [
        { required: true,validator:nonEmptyValidator,trigger:"change", message: "请输入校区!" },
      ],
      campusRemark: [{ required: false }],
    };

    const addItem = (formEl) => {
      if (!formEl) return;
      formEl.validate((validate) => {
        if (validate) {
          campusStore.Add({
            id: uuid(),
            name: formInput.campusName,
            remark: formInput.campusRemark,
            teachingbuildings:[]
          });
          data.isDialogFormVisible = false; //确认后关闭弹窗
          formEl.resetFields();
        }
      });
    };

    const editItem = (formEl) => {
      if (!formEl) return;
      formEl.validate((validate) => {
        console.log(validate);
        if (validate) {
          if (
            campusStore.Edit({
              id: data.id,
              name: formInput.campusName,
              remark: formInput.campusRemark,
            })
          ) {
            data.isDialogFormVisible = false; //确认后关闭弹窗
            formEl.resetFields();
          }
        }
      });
    };

    const ClearInput = () => {
      campusFormRef.value.resetFields();
    };

    return {
      ...toRefs(data),
      formInput,
      ClearInput,
      editItem,
      addItem,
      campuses,
      campusFormRef,
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