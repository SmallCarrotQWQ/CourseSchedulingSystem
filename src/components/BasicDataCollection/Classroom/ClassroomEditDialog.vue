<template>
  <el-dialog
    v-model="isDialogFormVisible"
    title="修改教室"
    width="42%"
    class="dialog"
    :close-on-click-modal="false"
    :show-close="false"
    @close="ClearInput"
  >
    <el-form
      class="form"
      :model="formInput"
      :rules="inputRule"
      ref="classroomFormRef"
      label-position="right"
      label-width="auto"
      @submit.enter.prevent
    >
      <el-tabs v-model="activeName">
        <el-tab-pane name="basic" label="基础数据">
          <div>
            <el-form-item label="教室编号:" prop="classroomCode">
              <el-input
                class="inputs"
                v-model="formInput.classroomCode"
                placeholder="请输入教室编号"
              />
            </el-form-item>

            <el-form-item label="教室名称:" prop="classroomName">
              <el-input
                v-model="formInput.classroomName"
                class="inputs"
                placeholder="请输入教室名称"
              />
            </el-form-item>
            <el-form-item label="所属校区" prop="classroomCampus"
              ><!--下拉框-->
              <el-select
                v-model="formInput.classroomCampus"
                placeholder="请选择校区"
                filterable
              >
                <el-option
                  v-for="obj of Campuses"
                  :label="obj.name"
                  :value="obj.id"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="教学楼" prop="classroomTeachingBuilding"
              ><!--下拉框-->
              <el-select
                v-model="formInput.classroomTeachingBuilding"
                placeholder="请选择教学楼"
                filterable
              >
                <el-option
                  v-for="obj of teachingbuildings"
                  :label="obj.name"
                  :value="obj"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="楼层:" prop="classroomFloor">
              <div class="numberInput">
                <el-input-number
                  v-model.number="formInput.classroomFloor"
                  max="30"
                  min="-5"
                  class="inputs"
                  placeholder="楼层"
                  controls-position="right"
                />
              </div>
            </el-form-item>

            <el-form-item label="教室类型" prop="classroomType"
              ><!--下拉框-->
              <el-select
                v-model="formInput.classroomType"
                placeholder="请选择教室类型"
                filterable
              >
                <el-option
                  v-for="obj of teachingbuildings"
                  :label="obj.name"
                  :value="obj"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="教室描述:" prop="classroomDescribe">
              <el-input
                type="textarea"
                class="remark"
                show-word-limit="true"
                maxlength="100"
                size="large"
                v-model="formInput.classroomDescribe"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="可容纳人数:" prop="classroomCapacity">
              <div class="numberInput">
                <el-input-number
                  v-model.number="formInput.classroomCapacity"
                  max="100000"
                  min="0"
                  class="inputs"
                  placeholder="人数"
                  controls-position="right"
                />
              </div>
            </el-form-item>

            <div class="checkboxGroup">
              <el-form-item prop="isAssigned">
                <el-checkbox
                  v-model="formInput.assigned"
                  label="是否为固定教室"
                />
              </el-form-item>
              <el-form-item prop="hasAirConditioner">
                <el-checkbox
                  v-model="formInput.hasAirConditioner"
                  label="是否有空调"
                />
              </el-form-item>
            </div>

            <el-form-item label="是否启用:" prop="isAvailable">
              <el-switch
                v-model="formInput.isAvailable"
                :active-value="true"
                :inactive-value="false"
              />
            </el-form-item>
          </div>
        </el-tab-pane>

        <el-tab-pane name="other" label="其他">
          <div>
            <el-form-item label="管理部门" prop="department"
              ><!--下拉框-->
              <el-select
                v-model="formInput.department"
                placeholder="请选择管理部门"
                filterable
              >
                <el-option
                  v-for="obj of teachingbuildings"
                  :label="obj.name"
                  :value="obj.name"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="周安排学时:" prop="classhour">
              <div class="numberInput">
                <el-input-number
                  v-model.number="formInput.classhour"
                  max="168"
                  min="0"
                  class="inputs"
                  placeholder="学时"
                  controls-position="right"
                />
              </div>
            </el-form-item>
            <el-form-item label="教室标签:" prop="classroomLabel">
              <el-input
                v-model="formInput.classroomLabel"
                class="inputs"
                placeholder="请输入教室标签"
              />
            </el-form-item>

            <el-form-item label="教室面积:" prop="classroomArea">
              <div class="numberInput">
                <el-input-number
                  v-model.number="formInput.classroomArea"
                  max="168"
                  min="0"
                  class="inputs"
                  placeholder="面积"
                  controls-position="right"
                >
                  <template #suffix>
                    <span>㎡</span>
                  </template></el-input-number
                >
              </div>
            </el-form-item>
          </div>
        </el-tab-pane>
      </el-tabs>

      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="editItem(classroomFormRef)"
          v-show="!mode"
        >
          <span>修改</span>
        </el-button>

        <el-button
          type="primary"
          @click="addItem(classroomFormRef)"
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
import { computed, reactive, ref, toRefs } from "vue";
import { v1 as uuid } from "uuid";
import bus from "@/bus/bus";

import { useClassroomStore } from "@/store/classroom.js"; //store
import { useCampusStore } from "@/store/campus";

import nonEmptyValidator from "@/hooks/validator/useNonEmpty";
export default {
  name: "ClassroomEditDialog",
  mounted() {
    bus.on("showClassroomEdit", (value) => {
      this.mode = false;
      this.isDialogFormVisible = true; //List中按下按钮弹窗
      this.classroomCampus = value.campus;
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
    const ClassroomStore = useClassroomStore();
    const Campuses = useCampusStore().campuses;
    const classroomFormRef = ref();
    const data = reactive({
      isDialogFormVisible: false, //是否弹窗
      id: "",
      mode: false,
      activeName: "basic",
    });

    const formInput = reactive({
      classroomCampus: "",
      classroomName: "",
      classroomCode: "",
      classroomTeachingBuilding: "",
      classroomFloor: "",
      classroomTags: "",
      classroomType: "",
      classroomCapacity: "",
      classroomDescribe: "",
      classroomDepartment: "",
      classhour: "",
      classroomArea: "",
      desktype: "",
      isAssigned: false,
      hasAirConditioner: true,
      isAvailable: true,
    });

    const inputRule = {
      classroomCampus: [
        { required: true, trigger: "change", message: "请选择校区!" },
      ],
      classroomName: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "blur",
          message: "请输入教室名称!",
        },
      ],
      classroomCode: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "blur",
          message: "请输入教室编号!",
        },
      ],
      classroomTeachingBuilding: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "change",
          message: "请选择教学楼!",
        },
      ],
      classroomFloor: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "change",
          message: "请输入楼层!",
        },
      ],
      classroomTags: [
        {
          required: false,
        },
      ],
      classroomType: [
        {
          required: true,
          validator: nonEmptyValidator,
          trigger: "change",
          message: "请选择教室类型!",
        },
      ],
      capacity: [
        { required: true, trigger: "blur", message: "请输入可容纳人数!" },
      ],
      classroomDescribe: [
        {
          required: false,
        },
      ],
      classroomDepartment: [
        {
          required: false,
        },
      ],
      classhour: [
        {
          required: false,
        },
      ],
      classroomArea: [
        {
          required: false,
        },
      ],
      desktype: [
        {
          required: false,
        },
      ],
      isAssigned: [
        {
          required: false,
        },
      ],
      hasAirConditioner: [
        {
          required: false,
        },
      ],
      isAvailable: [
        {
          required: false,
        },
      ],
    };

    const addItem = (formEl) => {
      if (!formEl) return;
      formEl.validate((validate) => {
        if (validate) {
          ClassroomStore.Add({
            id: uuid(),
            campus: formInput.classroomCampus,
            name: formInput.classroomName,
            code: formInput.classroomCode,
            teachingbuilding: formInput.classroomTeachingBuilding,
            floor: formInput.classroomFloor,
            tags: formInput.classroomTags,
            type: formInput.classroomType,
            capacity: formInput.classroomCapacity,
            describe: formInput.classroomDescribe,
            department: formInput.classroomDepartment,
            classhour: formInput.classhour,
            area: formInput.classroomArea,
            desktype: formInput.desktype,
            assigned: formInput.isAssigned,
            airconditioner: formInput.hasAirConditioner,
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
        console.log(validate);
        if (validate) {
          if (
            ClassroomStore.edit({
              id: data.id,
              Campus: formInput.classroomCampus,
              name: formInput.classroomName,
              code: formInput.classroomCode,
              teachingbuilding: formInput.classroomTeachingBuilding,
              floor: formInput.classroomFloor,
              tags: formInput.classroomTags,
              type: formInput.classroomType,
              capacity: formInput.classroomCapacity,
              describe: formInput.classroomDescribe,
              department: formInput.classroomDepartment,
              classhour: formInput.classhour,
              area: formInput.classroomArea,
              desktype: formInput.desktype,
              assigned: formInput.isAssigned,
              airconditioner: formInput.hasAirConditioner,
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
      classroomFormRef.value.resetFields();
    };

    return {
      ...toRefs(data),
      ...toRefs(formInput),
      formInput,
      ClearInput,
      editItem,
      addItem,
      Campuses,
      classroomFormRef,
      inputRule,
    };
  },
};
</script>

<style>
.dialog .el-dialog__body {
  max-height: 30%;
  overflow-y: scroll;
}

.form {
  margin: 20px;
  display: flex;
  flex-direction: column;
}

.inputs,
.remark,
.el-select {
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
.checkboxGroup {
  display: inline-flex;
}

.el-checkbox {
  margin-left: 10px;
}
</style>