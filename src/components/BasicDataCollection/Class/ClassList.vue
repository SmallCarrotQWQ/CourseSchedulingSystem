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
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column prop="id" label="班级编号"  min-width="150px" />
      <el-table-column prop="name" label="班级名称" min-width="150px" />
      <el-table-column prop="abbr" label="简称"  min-width="150px"/>
      <el-table-column prop="duration" label="学制"  min-width="150px" />
      <el-table-column prop="educationalLevel" label="培养层次"  min-width="150px" />
      <el-table-column prop="counsellorName" label="辅导员"  min-width="150px"/>
      <el-table-column prop="headTeacherName" label="班主任"  min-width="150px" />
      <el-table-column prop="monitorName" label="班长"  min-width="150px" />
      <el-table-column prop="classAssistantName" label="班助"  min-width="150px"  />
      <el-table-column prop="enrollmentYear" label="入学年份"  min-width="150px"/>
      <el-table-column prop="graduationYear" label="预计毕业年份" min-width="150px" />
      <el-table-column prop="isGraduated" label="是否已经毕业"  :formatter="isGraduatedFormatter" min-width="150px"/>
      <el-table-column prop="size" label="班级人数" min-width="150px" />
      <el-table-column prop="maxSize" label="班级最大人数"  min-width="150px"/>
      <el-table-column prop="genderDistribution" label="性别分布(男/女)"  min-width="150px"/>
      <el-table-column prop="facultyName" label="所属院系" min-width="150px"/>
      <el-table-column prop="majorId" label="专业编号" min-width="150px"/>
      <el-table-column prop="majorName" label="专业" min-width="150px"/>
      <el-table-column prop="SpecializationId" label="专业方向" min-width="150px"/>
      <el-table-column prop="campusName" label="校区" min-width="150px"/>
      <el-table-column prop="classroomId" label="固定教室" min-width="150px"/>
      <el-table-column prop="remark" label="备注" min-width="150px"/>
      <el-table-column prop="headTeacherPhoneNumber" label="班主任电话" min-width="150px"/>
      <el-table-column prop="graduationYearSemester" label="毕业学年学期" min-width="150px"/>
      <el-table-column prop="isExpanding" label="是否扩招" :formatter="isExpandingFormatter" min-width="150px"/>
      <el-table-column prop="mentorId" label="学业导师" min-width="150px"/>
      <el-table-column label="操作" v-slot="scope"  min-width="150px" fixed="right">
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
  <ClassEditDialog />
</template>

<script>
import bus from "@/bus/bus.js";
import { computed,reactive, toRefs,ref } from "vue";
import ClassEditDialog from "./ClassEditDialog.vue";
import { storeToRefs } from "pinia";
import { useAcademicStore } from '@/store/academicStore';

export default {
  name: "ClassList",
  components: {
    ClassEditDialog,
  },
  setup() {
    const academicStore = useAcademicStore();
    const { classes } = storeToRefs(academicStore);

    const data = reactive({
      isDeleteShow: false,
      deleteValue:[],
    });


    const faculty = ref("*");
    const major = ref("*");

    const filtedArray = computed(() => {
      if (faculty.value == "*") {
        return classes.value;
      } else {
        return classes.value.filter((cl)=>{
          return faculty.value == cl.faculty
        });
      }
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
      bus.emit("showClassAdd");
    };

    const HandleEditClick = (value) => {
      bus.emit("showClassEdit", value);
    };


    const isExpandingFormatter = (row)=>{
      return row.isExpanding ? "是" : "否"
    }
    const isGraduatedFormatter = (row)=>{
      return row.isGraduated ? "是" : "否"
    }
    const facultyIdFormatter = (row)=>{
      return academicStore.departmentNameMap.get(row.facultyId)
    }

    return {
      ...toRefs(data),
      classes,
      HandleSelectChange,
      HandleAddClick,
      HandleEditClick,
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

.filters{
    display: inline-flex;
    flex-direction: row;
}
.filterLabel{
      margin-left: 20px;
}
</style>