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
        <el-text>院系:</el-text>
      <el-select
        v-model="faculty"
        placeholder="搜索院系"
        class="facultySelect"
        value-key="id"
        filterable
      >
        <el-option label="全部" value="*"/>
        <el-option
          v-for="faculty of faculties"
          :label="faculty.name"
          :value="faculty"
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
      <el-table-column
        prop="faculty.name"
        label="院系"
      />
      <el-table-column prop="name" label="专业名称" />
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
  <MajorEditDialog />
</template>

<script>
import bus from "@/bus/bus.js";
import { computed, reactive, ref, toRefs } from "vue";

import MajorEditDialog from "./MajorEditDialog.vue";
import { useFacultyStore } from "@/store/faculty";
import { useMajorStore } from "@/store/major";
import { storeToRefs } from "pinia";

export default {
  name: "MajorList",
  components: {
    MajorEditDialog,
  },
  setup() {
    const facultyStore = useFacultyStore();
    const majorStore = useMajorStore();
    const { faculties } = storeToRefs(facultyStore);
    const { majors } = storeToRefs(majorStore);
    const { HandleArrayDelete, HandleSingleDelete } = toRefs(majorStore);
    const data = reactive({
      isDeleteShow: false,
      deleteValue: [],
    });

    const faculty = ref("*")
    const filtedArray = computed(()=>{  
        console.log("fffff:",faculty);
        if(faculty.value == '*'){
            return majors.value
        }
        else{
            return majors.value.filter(major =>{
                return faculty.value == major.faculty
            })
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
      bus.emit("showMajorAdd");
    };

    const HandleEditClick = (value) => {
      bus.emit("showMajorEdit", value);
    };

    return {
      ...toRefs(data),
      majors,
      faculty,
      faculties,
      rowStyle,
      filtedArray,
      HandleAddClick,
      HandleEditClick,
      HandleSingleDelete,
      HandleArrayDelete,
      HandleSelectChange,
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

.facultySelect {
  width: 260px;
  margin-left: 10px;
}

.filters{
    margin-left: 20px;
    display: inline-flex;
    flex-direction: row;
}
</style>