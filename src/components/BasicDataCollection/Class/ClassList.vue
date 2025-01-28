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
      :data="filtedArray"
      :row-style="rowStyle"
      @selection-change="HandleSelectChange"
    >
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <el-table-column prop="id" label="id" />
      <el-table-column prop="faculty.name" label="院系" />
      <el-table-column prop="major.name" label="专业" />
      <el-table-column prop="grade" label="年级" />
      <el-table-column prop="name" label="班级名" />
      <el-table-column prop="size" label="班级人数" />
      <el-table-column prop="assigned" label="固定教室" />
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
  <ClassEditDialog />
</template>

<script>
import bus from "@/bus/bus.js";
import { computed,reactive, toRefs,ref } from "vue";
import ClassEditDialog from "./ClassEditDialog.vue";
import { useClassStore } from "@/store/class";
import { useFacultyStore } from "@/store/faculty";
import { useMajorStore } from "@/store/major";
import { storeToRefs } from "pinia";

export default {
  name: "ClassList",
  components: {
    ClassEditDialog,
  },
  setup() {
    const classStore = useClassStore();
    const facultyStore = useFacultyStore();
    const majorStore = useMajorStore();
    const { classes } = storeToRefs(classStore);
    const { faculties } = storeToRefs(facultyStore);
    const { majors } = storeToRefs(majorStore);
    const { HandleArrayDelete, HandleSingleDelete } = toRefs(classStore);

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

    return {
      ...toRefs(data),
      classes,
      HandleSelectChange,
      HandleAddClick,
      HandleEditClick,
      rowStyle,
      HandleSingleDelete,
      HandleArrayDelete,
      faculties,
      majors,
      faculty,
      major,
      faculties,
      filtedArray,
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