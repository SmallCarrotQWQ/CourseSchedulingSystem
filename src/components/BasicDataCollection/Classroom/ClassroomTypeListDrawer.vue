<template>
  <el-drawer
    v-model="isDrawerVisible"
    title="教室类型管理"
    direction="rtl"
    size="42%"
  >
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
        :data="classroomtypes"
        :row-style="rowStyle"
        @selection-change="HandleSelectChange"
      >
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column prop="name" label="类型" width="155" />

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
  </el-drawer>
  <ClassroomTypeEditDialog/>
</template>

<script>
import bus from "@/bus/bus.js";
import { storeToRefs } from "pinia";
import { computed, reactive, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
import { useLocationStore } from "@/store/locationStore/index.js";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import ClassroomTypeEditDialog from './ClassroomTypeEditDialog.vue';

export default {
  name: "ClassroomTypeListDrawer",
  components: {
    ClassroomTypeEditDialog
  },
  mounted() {
    bus.on("showClassroomTypeDrawer", () => {
      this.isDrawerVisible = true; //打开抽屉
    });
  },

  setup() {
    const locationStore = useLocationStore();
    const { classroomtypes } = storeToRefs(locationStore);

    const data = reactive({
      isDeleteShow: false,
      isDrawerVisible: false,
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
      bus.emit("showClassroomTypeAdd");
    };

    const HandleEditClick = (value) => {
      bus.emit("showClassroomTypeEdit", value);
    };

    const HandleArrayDelete = () => {
      ElMessageBox.confirm("确认删除吗?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          types.value = ArrayDelete(types.value, data.deleteValue);
        })
        .catch(() => {
          console("canceled...");
        });
    };

    const HandleSingleDelete = (value) => {
      ElMessageBox.confirm("确认删除吗?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
         types.value = SingleDelete(types.value, value);
        })
        .catch(() => {
          console("canceled...");
        });
    };

    const isAvailable = (row) => {
      return row.available ? "是" : "否";
    };

    return {
      ...toRefs(data),
      classroomtypes,
      HandleArrayDelete,
      HandleSingleDelete,
      HandleSelectChange,
      HandleAddClick,
      HandleEditClick,
      rowStyle,
      isAvailable,
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
.addLink {
  width: auto;
  margin: 5px 0px;
  text-align: center;
}
</style>