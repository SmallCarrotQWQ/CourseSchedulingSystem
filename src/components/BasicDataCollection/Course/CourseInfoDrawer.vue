<template>
  <el-drawer
    v-model="isDrawerVisible"
    title="查看课程信息"
    direction="rtl"
    size="42%"
  >
    <el-descriptions :title="datas.name" :column="1" border>
      <template v-for="data in datas">
        <el-descriptions-item :label="data[0]">{{
          data[1]
        }}</el-descriptions-item>
      </template>
      <!-- <el-descriptions-item  label="课程名称" width="100px" >{{datas.name}}</el-descriptions-item>
        <el-descriptions-item  label="英文名" width="100px">{{datas.ename}}</el-descriptions-item>
        <el-descriptions-item label="课程类别" width="100px">{{academicStore.courseCategoryNameMap.get(datas.courseCategoryId)}}</el-descriptions-item>
        <el-descriptions-item label="课程属性" width="100px">{{academicStore.courseAttributeNameMap.get(datas.courseAttributeId)}}</el-descriptions-item>
        <el-descriptions-item label="课程类型" width="100px">{{academicStore.courseTypeNameMap.get(datas.courseTypeId)}}</el-descriptions-item>
        <el-descriptions-item label="课程性质" width="100px">{{academicStore.courseNatureNameMap.get(datas.courseNatureId)}}</el-descriptions-item>
        <el-descriptions-item label="开课院系" width="100px">{{academicStore.departmentNameMap.get(datas.facultyId)}}</el-descriptions-item>
        <el-descriptions-item label="是否启用" width="100px">{{boolToYesNo(datas.isEnabled)}}</el-descriptions-item>
        <el-descriptions-item label="总学时" width="100px">{{datas.totalClassHours}}</el-descriptions-item>
        <el-descriptions-item label="实验学时" width="100px">{{datas.laboratoryHours}}</el-descriptions-item>
        <el-descriptions-item label="上机学时" width="100px">{{datas.computerLabHours}}</el-descriptions-item>
        <el-descriptions-item label="实践学时" width="100px">{{datas.practicalHours}}</el-descriptions-item>
        <el-descriptions-item label="其它学时" width="100px">{{datas.otherHours}}</el-descriptions-item>
        <el-descriptions-item label="周学时" width="100px">{{datas.weeklyClassHours}}</el-descriptions-item>
        <el-descriptions-item label="学分" width="100px">{{datas.credits}}</el-descriptions-item>
        <el-descriptions-item label="是否纯实践环节" width="100px">{{datas.}}</el-descriptions-item> -->
    </el-descriptions>
  </el-drawer>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import bus from "@/bus/bus.js";
import { useLocationStore } from "@/store/locationStore";
import { useAcademicStore } from "@/store/academicStore";

export default {
  name: "CourseInfoDrawer",
  mounted() {},
  setup() {
    const locationStore = useLocationStore();
    const academicStore = useAcademicStore();
    const isDrawerVisible = ref(false);
    const datas = ref([]);

    onMounted(() => {
      bus.on("showCourseInfoDrawer", (value) => {
        isDrawerVisible.value = true;
        datas.value = Object.entries(value).filter((d) => {
          return d[0] != "id";
        });
        datas.value.forEach((d) => {
          if (d[0] == "courseCategoryId") {
            d[1] = academicStore.courseCategoryNameMap.get(d[1]);
          }
          if (d[0] == "courseAttributeId") {
            d[1] = academicStore.courseAttributeNameMap.get(d[1]);
          }
          if (d[0] == "courseTypeId") {
            d[1] = academicStore.courseTypeNameMap.get(d[1]);
          }
          if (d[0] == "courseNatureId") {
            d[1] = academicStore.courseNatureNameMap.get(d[1]);
          }
          if (d[0] == "isEnabled" || d[0] == "isPurelyPractical") {
            d[1] = boolToYesNo(d[1]);
          }
          if (d[0] == "facultyId") {
            d[1] = academicStore.departmentNameMap.get(d[1]);
          }
        });
        datas.value = datas.value.map((d) => [coursesVarName[d[0]], d[1]]);
      });
    });

    const boolToYesNo = (value) => {
      return value ? "是" : "否";
    };

    const coursesVarName = {
      code: "课程编号",
      name: "课程名称",
      ename: "英文名",
      courseCategoryId: "课程类别",
      courseAttributeId: "课程属性",
      courseTypeId: "课程类型",
      courseNatureId: "课程性质",
      facultyId: "开课院系",
      isEnabled: "是否启用",
      totalClassHours: "总学时",
      theoreticalHours: "理论学时",
      laboratoryHours: "实验学时",
      computerLabHours: "上机学时",
      practicalHours: "实践学时",
      otherHours: "其它学时",
      weeklyClassHours: "周学时",
      credits: "学分",
      isPurelyPractical: "是否纯实践环节",
    };

    return {
      isDrawerVisible,
      datas,
      boolToYesNo,
      locationStore,
      academicStore,
      coursesVarName,
    };
  },
};
</script>

<style>
</style>