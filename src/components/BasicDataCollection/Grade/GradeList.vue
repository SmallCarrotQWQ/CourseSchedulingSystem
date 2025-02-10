<template>
  <div class="List">
    <div class="buttonMenu">
      <el-button type="primary" @click="HandleAddClick">添加</el-button>
      <el-button type="danger" v-show="isDeleteShow" @click="HandleArrayDelete"
        >删除选中</el-button
      >
    </div>

    <el-table
      :data="grades"
      :row-style="rowStyle"
      @selection-change="HandleSelectChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column prop="name" label="年级名称" />
      <el-table-column prop="duration" label="学制" />
      <el-table-column prop="enrollmentYear" label="开始年份" />
      <el-table-column prop="graduationYear" label="结束年份" />
      <el-table-column prop="isGraduated" :formatter="isGraduatedFormatter" label="是否毕业" />
      <el-table-column label="操作" v-slot="scope">
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
  <GradeEditDialog />
</template>

<script>


import bus from "@/bus/bus.js";
import { storeToRefs } from "pinia";
import { onMounted, onBeforeMount, reactive, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
import { useLocationStore } from "@/store/locationStore/index.js";
import { useAcademicStore } from "@/store/academicStore/index.js";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import GradeEditDialog from './GradeEditDialog.vue';

export default {
  name: "gradesList",
  components: {
    GradeEditDialog
  },
  setup() {
    const locationStore = useLocationStore();
    const academicStore = useAcademicStore();
    const { campuses } = storeToRefs(locationStore);
    const { grades } = storeToRefs(academicStore);
    onMounted(() => {
      locationStore.initLocationDatas()
    });

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
      bus.emit("showGradeAdd");
    };

    const HandleEditClick = (value) => {
      bus.emit("showGradeEdit", value);
    };
 

    const HandleArrayDelete = () => {
      ElMessageBox.confirm("确认删除吗?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          campuses.value = ArrayDelete(campuses.value, data.deleteValue);
        })
        .catch(() => {
          console.log("canceled...");
        });
    };

    const HandleSingleDelete = (value) => {
      ElMessageBox.confirm("确认删除吗?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          campuses.value = SingleDelete(campuses.value, value);
        })
        .catch(() => {
          console("canceled...");
        });
    };

    const isGraduatedFormatter = (row)=>{
      return row.isGraduated ? "是" : "否"
    }


    return {
      ...toRefs(data),
      campuses,
      HandleArrayDelete,
      HandleSingleDelete,
      HandleSelectChange,
      HandleAddClick,
      HandleEditClick,
      rowStyle,
      locationStore,
      grades,
      isGraduatedFormatter
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