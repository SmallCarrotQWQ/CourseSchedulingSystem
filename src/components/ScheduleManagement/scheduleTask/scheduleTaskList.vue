<template>
  <div class="List">
    <div class="buttonMenu">
      <el-button type="primary" @click="HandleAddClick">添加</el-button>
      <el-button type="primary" @click="HandleUploadClick">导入</el-button>
      <el-button type="primary" @click="HandleRefreshClick">刷新</el-button>
      <el-button type="danger" v-show="isDeleteShow" @click="HandleArrayDelete"
        >删除选中</el-button
      >
    </div>

    <el-table
      :data="campuses"
      :row-style="rowStyle"
      @selection-change="HandleSelectChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column prop="id" label="id" />
      <el-table-column prop="name" label="校区" />
      <el-table-column label="教学楼" v-slot="scope">
        <div class="RowButtons">
          <el-link type="primary" @click="HandleDrawerClick(scope.row)"
            >教学楼管理</el-link
          >
        </div>
      </el-table-column>
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
  <CampusEditDialog />
  <TeachingBuildingListDrawer />
  <CampusUploadDialog/>
</template>

<script>
import CampusEditDialog from "./CampusEditDialog.vue";
import TeachingBuildingListDrawer from "../TeachingBuilding/TeachingBuildingListDrawer.vue";
import CampusUploadDialog from './CampusUploadDialog.vue';


import bus from "@/bus/bus.js";
import { storeToRefs } from "pinia";
import { onMounted, onBeforeMount, reactive, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
import { useLocationStore } from "@/store/locationStore/index.js";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";

export default {
  name: "scheduleTaskList",
  components: {
    CampusEditDialog,
    TeachingBuildingListDrawer,
    CampusUploadDialog
  },
  setup() {
    const locationStore = useLocationStore();
    const { campuses } = storeToRefs(locationStore);




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
      bus.emit("showCampusAdd");
    };

    const HandleEditClick = (value) => {
      bus.emit("showCampusEdit", value);
    };
    const HandleDrawerClick = (value) => {
      bus.emit("showTeachingBuildingListDrawer", value);
    };
    const HandleUploadClick = () => {
      bus.emit("showCampusUploadDialog");
    };
    const HandleRefreshClick = () => {
      locationStore.refreshCampus()
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

    return {
      ...toRefs(data),
      campuses,
      HandleArrayDelete,
      HandleSingleDelete,
      HandleSelectChange,
      HandleAddClick,
      HandleEditClick,
      HandleDrawerClick,
      HandleUploadClick,
      rowStyle,
      locationStore,
      HandleRefreshClick
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