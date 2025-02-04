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
      <div class="filters">
        <el-text class="filterLabel">院系:</el-text>
        <el-select
          v-model="faculty"
          placeholder="搜索院系"
          class="filterSelector"
          value-key="id"
          filterable
        >
          <el-option label="全部" value="*" />
          <el-option
            v-for="faculty of faculties"
            :label="faculty.name"
            :value="faculty"
          />
        </el-select>
        <el-text class="filterLabel">专业:</el-text>
        <el-select
          v-model="major"
          placeholder="搜索专业"
          class="filterSelector"
          value-key="id"
          filterable
        >
          <el-option label="全部" value="*" />
          <el-option
            v-for="major of majors"
            :label="major.name"
            :value="major"
          />
        </el-select>
      </div>
    </div>

    <el-table
      :data="classes"
      :row-style="rowStyle"
      @selection-change="HandleSelectChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="50" />
      <el-table-column prop="facultyName" label="所属院系" min-width="100px" />

      <el-table-column prop="name" label="班级名称" min-width="140px" />
      <el-table-column prop="duration" label="学制" min-width="90px" />
      <el-table-column
        prop="educationalLevel"
        label="培养层次"
        min-width="80px"
      />

      <el-table-column
        prop="isGraduated"
        label="是否已经毕业"
        :formatter="isGraduatedFormatter"
        min-width="100px"
      />
      <el-table-column prop="size" label="班级人数" min-width="100px" />


      <el-table-column prop="majorName" label="专业" min-width="100px" />

      <el-table-column prop="classroomId" label="固定教室" min-width="100px" />

      <el-table-column
        label="操作"
        v-slot="scope"
        min-width="220px"
      >
        <div class="RowButtons">
          <el-button type="info" @click="HandleShowInfoClick(scope.row)"
            >查看</el-button
          >
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
  <ClassEditDialog />
  <ClassInfoDrawerVue />
</template>

<script>
import bus from "@/bus/bus.js";
import { computed, reactive, toRefs, ref } from "vue";
import ClassEditDialog from "./ClassEditDialog.vue";
import { storeToRefs } from "pinia";
import { useAcademicStore } from "@/store/academicStore";
import ClassInfoDrawerVue from "./ClassInfoDrawer.vue";

export default {
  name: "ClassList",
  components: {
    ClassEditDialog,
    ClassInfoDrawerVue,
  },
  setup() {
    const academicStore = useAcademicStore();
    const { classes } = storeToRefs(academicStore);

    const data = reactive({
      isDeleteShow: false,
      deleteValue: [],
    });

    const faculty = ref("*");
    const major = ref("*");

    const filtedArray = computed(() => {
      if (faculty.value == "*") {
        return classes.value;
      } else {
        return classes.value.filter((cl) => {
          return faculty.value == cl.faculty;
        });
      }
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
      bus.emit("showClassAdd");
    };

    const HandleEditClick = (value) => {
      bus.emit("showClassEdit", value);
    };

    const HandleShowInfoClick = (value) => {
      bus.emit("showClassInfoDrawer", value);
    };

    const isExpandingFormatter = (row) => {
      return row.isExpanding ? "是" : "否";
    };
    const isGraduatedFormatter = (row) => {
      return row.isGraduated ? "是" : "否";
    };
    const facultyIdFormatter = (row) => {
      return academicStore.departmentNameMap.get(row.facultyId);
    };

    return {
      ...toRefs(data),
      classes,
      HandleSelectChange,
      HandleAddClick,
      HandleEditClick,
      HandleShowInfoClick,
      rowStyle,
      filtedArray,
      isExpandingFormatter,
      isGraduatedFormatter,
      facultyIdFormatter,
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

.filterSelector {
  width: 260px;
  margin-left: 10px;
}

.filters {
  display: inline-flex;
  flex-direction: row;
}
.filterLabel {
  margin-left: 20px;
}
</style>