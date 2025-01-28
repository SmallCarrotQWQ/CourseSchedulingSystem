<template>
  <el-drawer
    v-model="isDrawerVisible"
    title="教学楼管理"
    direction="rtl"
    size="64%"
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
        :data="teachingBuildingsOfcampus"
        :row-style="rowStyle"
        @selection-change="HandleSelectChange"
      >
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column prop="code" label="教学楼编号" />
        <el-table-column prop="name" label="教学楼名称" />
        <el-table-column prop="campus.name" label="所属校区" />
        <el-table-column
          prop="available"
          label="是否可用"
          :formatter="isAvailable"
        />

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
  <TeachingBuildingEditDialog />
</template>

<script>
import bus from "@/bus/bus.js";
import { storeToRefs } from "pinia";
import { computed, reactive, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
import { useCampusStore } from "@/store/campus.js";
import { useTeachingBuildingStore } from "@/store/teachingBuilding.js";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import TeachingBuildingEditDialog from "./TeachingBuildingEditDialog.vue";

export default {
  name: "TeachingBuildingListDrawer",
  components: {
    TeachingBuildingEditDialog,
  },
  mounted() {
    bus.on("showTeachingBuildingListDrawer", (value) => {
      this.campus = this.campuses.filter((obj)=>{
        return obj.id == value.id
      })[0]
      this.isDrawerVisible = true; //打开抽屉
    });
  },

  setup() {
    const CampusStore = useCampusStore();
    const TeachingBuildingStore = useTeachingBuildingStore();
    const { campuses } = storeToRefs(CampusStore);
    const { teachingBuildings } = storeToRefs(TeachingBuildingStore);

    const data = reactive({
      isDeleteShow: false,
      isDrawerVisible: false,
      campus:"",
      deleteValue: [],
    });


    const teachingBuildingsOfcampus = computed(()=>{
        return teachingBuildings.value.filter((obj)=>{
            return obj.campus.id == data.campus.id
        })
    })

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
      bus.emit("showTeachingBuildingAdd",data.campus);
    };

    const HandleEditClick = (value) => {
      bus.emit("showTeachingBuildingEdit", value,data.campus);
    };

    const HandleArrayDelete = () => {
      ElMessageBox.confirm("确认删除吗?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          teachingBuildings.value = ArrayDelete(teachingBuildings.value, data.deleteValue);
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
          teachingBuildings.value = SingleDelete(teachingBuildings.value, value);
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
      campuses,
      teachingBuildings,
      CampusStore,
      HandleArrayDelete,
      HandleSingleDelete,
      HandleSelectChange,
      HandleAddClick,
      HandleEditClick,
      rowStyle,
      isAvailable,
      teachingBuildingsOfcampus,
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