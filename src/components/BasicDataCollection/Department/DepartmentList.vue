<template>
  <div class="List">
    <div class="buttonMenu">
      <el-button type="primary" @click="HandleAddClick">添加</el-button>
      <el-button
        type="danger"
        v-show="isDeleteShow"
        @click="HandleArrayDelete(deleteValue)"
        >删除选中</el-button
      >
    </div>
    <el-table
      :data="departments"
      :row-style="rowStyle"
      @selection-change="HandleSelectChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column prop="id" label="id" />
      <el-table-column prop="code" label="部门代码" />
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="type" label="单位类别" width="90" />
      <el-table-column prop="teachingbuildingName" label="固定教学楼" />
      <el-table-column prop="isEntity" label="是否为实体" :formatter="isEntityToYesNo"/>
      <el-table-column prop="isEnabled" label="是否启用" :formatter="isEnabledToYesNo"/>
      <el-table-column prop="isCourseOffering" label="是否开课" :formatter="isCourseOfferingToYesNo"/>
      <el-table-column prop="isTeaching" label="是否上课" :formatter="isTeachingToYesNo" />
      <el-table-column prop="isTeachingResearchOffice" label="是否开课教研室" :formatter="isTeachingResearchOfficeToYesNo"/>
      <el-table-column label="操作" v-slot="scope" width="160">
        <div class="RowButtons">
          <el-button type="primary" @click="HandleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" @click="HandleSingleDelete(scope.row)"
            >删除</el-button
          >
        </div>
      </el-table-column>
    </el-table>
  </div>

  <DepartmentEditDialog />
</template>

<script>
import bus from "@/bus/bus.js";
import { onMounted, reactive, toRefs } from "vue";
import DepartmentEditDialog from "./DepartmentEditDialog.vue";
import { useAcademicStore } from "@/store/academicStore/index.js";
import { storeToRefs } from "pinia";

export default {
  name: "DepartmentList",
  components: {
    DepartmentEditDialog,
  },
  setup() {
    const academicStore = useAcademicStore();
    const { departments } = storeToRefs(academicStore);


    const data = reactive({
      isDeleteShow: false,
      deleteValue: [],
    });

    const HandleSelectChange = (value) => {
      data.deleteValue = value;
      if (value.length === 0) {
        data.isDeleteShow = false;
      } else {
        data.isDeleteShow = true;
      }
    };

    const rowStyle = ({ row, rowIndex }) => {
      return {
        height: "60px",
      };
    };
    const HandleAddClick = () => {
      bus.emit("showDepartmentAdd");
    };

    const HandleEditClick = (value) => {
      bus.emit("showDepartmentEdit", value);
    };

    const boolToYesNo = {
      isAssignedToYesNo: (row) => {
        return row.isAssigned ? "是" : "否";
      },
      isTeachingToYesNo: (row) => {
        return row.isTeaching ? "是" : "否";
      },
      isEnabledToYesNo: (row) => {
        return row.isEnabled ? "是" : "否";
      },
      isTeachingResearchOfficeToYesNo: (row) => {
        return row.isTeachingResearchOffice ? "是" : "否";
      },
      isCourseOfferingToYesNo: (row) => {
        return row.isCourseOffering ? "是" : "否";
      },
      isEntityToYesNo: (row) => {
        return row.isEntity ? "是" : "否";
      },
    };

    return {
      ...toRefs(data),
      ...boolToYesNo,
      departments,
      HandleSelectChange,
      HandleAddClick,
      HandleEditClick,
      rowStyle,
    };
  },
};
</script>

<style scoped>
.List {
  background: white;
  padding: 10px;
  margin: 10px;
  border: solid 2px #f0f2f5;
}

.buttonMenu {
  display: flex;
  justify-content: flex-start;
  margin: 0px 0px 10px 0px;
}

tbody td .cell .RowButtons {
  display: flex;
  flex-wrap: nowrap;
}

.el-table {
  border: solid 2px #f0f2f5;
}
</style>