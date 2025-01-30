<template>
  <div class="List">
    <div class="buttonMenu">
      <el-button type="primary" @click="HandleAddClick">添加</el-button>
      <el-button type="danger" v-show="isDeleteShow" @click="HandleArrayDelete"
        >删除选中</el-button
      >
    </div>
    <div class="filters">
      <el-text class="filterLabel">校区:</el-text>
      <el-select
        v-model="filterCriteria.campus"
        placeholder="搜索校区"
        class="filterSelector"
        value-key="id"
        filterable
        @change="filterCriteria.teachingbuilding = '*'"
      >
        <template #header>
          <el-button type="primary"> 添加校区 </el-button>
        </template>
        <el-option label="全部" value="*" />
        <el-option
          v-for="campus of campuses"
          :label="campus.name"
          :value="campus.id"
        />
      </el-select>
      <el-text class="filterLabel">教学楼:</el-text>
      <el-select
        v-model="filterCriteria.teachingbuilding"
        placeholder="搜索教学楼"
        class="filterSelector"
        value-key="id"
        filterable
      >
        <template #header>
          <el-button type="primary"> 添加教学楼 </el-button>
          <el-button type="primary"> 导入 </el-button>
        </template>
        <el-option label="全部" value="*" />
        <el-option
          v-for="option of filtedArray.filtedTeachingBuildingOptions"
          :label="option.name"
          :value="option.id"
        />
      </el-select>

      <el-text class="filterLabel">教室类型:</el-text>
      <el-select
        v-model="filterCriteria.type"
        placeholder="搜索教室类型"
        class="filterSelector"
        value-key="id"
        filterable
      >
        <template #header>
          <el-button type="primary" @click="HandleTypeEditClick()">
            教室类型管理
          </el-button>
        </template>
        <el-option label="全部" value="*" />
        <el-option
          v-for="type of classroomtypes"
          :label="type.name"
          :value="type.id"
        />
      </el-select>
    </div>
    <el-table
      :data="filtedArray.filtedClassrooms"
      :row-style="rowStyle"
      @selection-change="HandleSelectChange"
      height="400"
    >
      <el-table-column type="selection" :selectable="selectable" width="40" />
      <el-table-column prop="code" label="教室编号" min-width="155px" />
      <el-table-column
        prop="name"
        label="教室名称"
        fixed="left"
        min-width="155px"
      />
      <el-table-column prop="campus.name" label="所属校区" min-width="155px" />
      <el-table-column
        prop="teachingbuilding.name"
        label="教学楼"
        min-width="100px"
      />
      <el-table-column prop="floor" label="所在楼层" min-width="100px" />
      <el-table-column prop="tage" label="教室标签" min-width="100px" />
      <el-table-column prop="type.name" label="教室类型" min-width="100px" />
      <el-table-column prop="capacity" label="可容纳人数" min-width="100px" />
      <el-table-column
        prop="isAssigned"
        :formatter="assignedToYesNo"
        label="固定教室"
      />
      <el-table-column
        prop="hasAirConditioner"
        :formatter="airconditionerToYesNo"
        label="是否有空调"
      />
      <el-table-column
        prop="isAvailable"
        :formatter="availableToYesNo"
        label="是否启用"
      />
      <el-table-column prop="describe" label="教室描述" />
      <el-table-column prop="department" label="管理部门" />
      <el-table-column prop="classhour" label="周安排学时" />
      <el-table-column prop="area" label="教室面积" />
      <el-table-column prop="desktype" label="桌椅类型" />
      <el-table-column
        label="操作"
        v-slot="scope"
        min-width="155px"
        fixed="right"
      >
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
  <ClassroomEditDialog />
  <ClassroomTypeListDrawer />
</template>

<script>
import bus from "@/bus/bus.js";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, onMounted, reactive, toRefs } from "vue";
import { ElMessageBox } from "element-plus";
import ClassroomEditDialog from "./ClassroomEditDialog.vue";
import ClassroomTypeListDrawer from "./ClassroomTypeListDrawer.vue";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import { useLocationStore } from "@/store/locationStore/index.js";

export default {
  name: "ClassroomList",
  components: {
    ClassroomEditDialog,
    ClassroomTypeListDrawer,
  },
  setup() {
    const locationStore = useLocationStore();
    const {
      classrooms,
      teachingbuildings,
      campuses,
      classroomtypes,
      campusMap,
    } = storeToRefs(locationStore);

    onMounted(() => {});
    onBeforeMount(() => {
      locationStore.initLocationDatas();
    });
    const data = reactive({
      isDeleteShow: false,
      deleteValue: [],
    });

    const filterCriteria = reactive({
      campus: "*",
      teachingbuilding: "*",
      type: "*",
    });

    const filtedArray = reactive({
      filtedTeachingBuildingOptions: computed(() => {
        if (filterCriteria.campus == "*") {
          return teachingbuildings.value;
        } else {
          return locationStore.getBuildingsByCampus(filterCriteria.campus);
        }
      }),
      filtedClassrooms: computed(() => {
        let temp = "";
        if (filterCriteria.type == "*") {
          if (filterCriteria.campus == "*") {
            if (filterCriteria.teachingbuilding == "*") {
              temp = classrooms.value;
            } else {
              temp = locationStore.getClassroomsByBuilding(
                filterCriteria.teachingbuilding
              );
            }
          } else {
            temp = locationStore.getClassroomsByCampus(filterCriteria.campus);
          }
        } else {
          //------------------------------------------------------------------
          if (filterCriteria.campus == "*") {
            if (filterCriteria.teachingbuilding == "*") {
              temp = locationStore.getClassroomsByType(filterCriteria.type);
            } else {
              temp = locationStore.getClassroomsByBuildingAndType(
                filterCriteria.teachingbuilding,
                filterCriteria.type
              );
            }
          } else {
            temp = locationStore.getClassroomsByCampusAndType(
              filterCriteria.campus,
              filterCriteria.type
            );
          }
        }
        return temp.map((c) => ({
          ...c,
          campus: locationStore.campusMap.get(c.campusId),
          type: locationStore.classroomTypeMap.get(c.typeId),
          teachingbuilding: locationStore.teachingbuildingMap.get(
            c.teachingBuildingId
          ),
        }));
      }),
    });

    // .value.map((c) => ({
    //     ...c,
    //     campus: locationStore.campusMap.get(c.campusId),
    //     type: locationStore.classroomTypeMap.get(c.typeId),
    //     teachingbuilding:locationStore.teachingbuildingMap.get(c.teachingBuildingId)
    //   })),

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
      bus.emit("showClassroomAdd");
    };

    const HandleEditClick = (value) => {
      bus.emit("showClassroomEdit", value);
    };
    const HandleTypeEditClick = () => {
      bus.emit("showClassroomTypeDrawer");
    };

    const HandleArrayDelete = () => {
      ElMessageBox.confirm("确认删除吗?", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          classrooms.value = ArrayDelete(classrooms.value, data.deleteValue);
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
          classrooms.value = SingleDelete(classrooms.value, value);
        })
        .catch(() => {
          console.log("canceled...");
        });
    };

    const assignedToYesNo = (row) => {
      return row.isAssigned ? "是" : "否";
    };
    const airconditionerToYesNo = (row) => {
      return row.hasAirConditioner ? "是" : "否";
    };
    const availableToYesNo = (row) => {
      return row.isAvailable ? "是" : "否";
    };

    return {
      ...toRefs(data),
      classrooms,
      classroomtypes,
      campuses,
      teachingbuildings,
      HandleArrayDelete,
      HandleSingleDelete,
      HandleSelectChange,
      HandleAddClick,
      HandleEditClick,
      HandleTypeEditClick,
      rowStyle,
      filterCriteria,
      filtedArray,
      assignedToYesNo,
      airconditionerToYesNo,
      availableToYesNo,
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
  flex-wrap: nowrap;
}

tbody td .cell .RowButtons {
  display: flex;
  flex-wrap: nowrap;
}

.el-table {
  border: solid 2px #f0f2f5;
}

.el-table-column {
  min-width: 200px;
}
.filterSelector {
  width: 260px;
  margin-left: 10px;
}

.filters {
  display: inline-flex;
  flex-direction: row;
  margin: 10px 0px 10px 0px;
}

.filterLabel {
  margin-left: 20px;
}
</style>