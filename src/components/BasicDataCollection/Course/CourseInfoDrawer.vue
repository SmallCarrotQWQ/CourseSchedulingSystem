<template>
  <el-drawer
    v-model="isDrawerVisible"
    title="查看教室信息"
    direction="rtl"
    size="42%"
  >
    <el-descriptions :title="datas.name"  :column="1" border>
        <el-descriptions-item  label="课程编号" width="100px">{{datas.id}}</el-descriptions-item>
        <el-descriptions-item  label="课程名称" width="100px" >{{datas.name}}</el-descriptions-item>
        <el-descriptions-item  label="英文名" width="100px">{{datas.ename}}</el-descriptions-item>
        <el-descriptions-item label="教学楼" width="100px">{{locationStore.teachingbuildingNameMap.get(datas.teachingbuildingId)}}</el-descriptions-item>
        <el-descriptions-item label="课程类别" width="100px">{{datas.courseCategoryId}}</el-descriptions-item>
        <el-descriptions-item label="课程属性" width="100px">{{datas.courseAttributeId}}</el-descriptions-item>
        <el-descriptions-item label="课程类型" width="100px">{{datas.courseTypeId}}</el-descriptions-item>
        <el-descriptions-item label="课程性质" width="100px">{{datas.courseNatureId}}</el-descriptions-item>
        <el-descriptions-item label="所属院系" width="100px">{{academicStore.departmentNameMap.get(datas.facultyId)}}</el-descriptions-item>
        <el-descriptions-item label="是否启用" width="100px">{{boolToYesNo(datas.isEnabled)}}</el-descriptions-item>
        <el-descriptions-item label="总学时" width="100px">{{datas.totalClassHours}}</el-descriptions-item>
        <el-descriptions-item label="理论学时" width="100px">{{datas.laboratoryHours}}</el-descriptions-item>
        <el-descriptions-item label="上机学时" width="100px">{{datas.computerLabHours}}</el-descriptions-item>
        <el-descriptions-item label="实践学时" width="100px">{{datas.practicalHours}}</el-descriptions-item>
        <el-descriptions-item label="其它学时" width="100px">{{datas.otherHours}}</el-descriptions-item>
        <el-descriptions-item label="周学时" width="100px">{{datas.weeklyClassHours}}</el-descriptions-item>
        <el-descriptions-item label="学分" width="100px">{{datas.credits}}</el-descriptions-item>
        <el-descriptions-item label="是否纯实践环节" width="100px">{{datas.isPurelyPractical}}</el-descriptions-item>
    </el-descriptions>
  </el-drawer>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue';
import bus from "@/bus/bus.js";
import { useLocationStore } from '@/store/locationStore';
import { useAcademicStore } from '@/store/academicStore';

export default {
  name: "CourseInfoDrawer",
  mounted(){
     bus.on("showCourseInfoDrawer",(value)=>{
            this.$nextTick(()=>{
                this.datas = value
            })
            this.isDrawerVisible = true
        })
  },
  setup(){
    const locationStore = useLocationStore()
    const academicStore = useAcademicStore()
    const isDrawerVisible = ref(false)
    var datas = "qwq"

    const boolToYesNo = (value)=>{
        return value ? "是" : "否"
    }

    return {
        isDrawerVisible,
        datas,
        boolToYesNo,
        locationStore,
        academicStore,
    }
  }
};
</script>

<style>
</style>