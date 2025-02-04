<template>
  <el-drawer
    v-model="isDrawerVisible"
    title="查看班级信息"
    direction="rtl"
    size="42%"
  >
    <el-descriptions :title="datas.name"  :column="1" border>
        <el-descriptions-item  label="班级编号" width="100px">{{datas.id}}</el-descriptions-item>
        <el-descriptions-item  label="班级名称" width="100px" >{{datas.name}}</el-descriptions-item>
        <el-descriptions-item  label="简称" width="100px" >{{datas.abbr}}</el-descriptions-item>
        <el-descriptions-item  label="学制" width="100px" >{{datas.duration}}年制</el-descriptions-item>
        <el-descriptions-item  label="培养层次" width="100px" >{{datas.educationalLevel}}</el-descriptions-item>
        <el-descriptions-item  label="班级类型" width="100px">{{datas.classType}}</el-descriptions-item>
        <el-descriptions-item label="辅导员姓名" width="100px">{{datas.counsellorName}}</el-descriptions-item>
        <el-descriptions-item label="班主任姓名" width="100px">{{datas.headTeacherName}}</el-descriptions-item>
        <el-descriptions-item label="班主任电话号码" width="100px">{{datas.headTeacherPhoneNumber}}</el-descriptions-item>
        <el-descriptions-item label="班长姓名" width="100px">{{datas.monitorName}}</el-descriptions-item>
        <el-descriptions-item label="班助姓名" width="100px">{{datas.classAssistantName}}</el-descriptions-item>
        <el-descriptions-item label="入学年份" width="100px">{{datas.enrollmentYear}}</el-descriptions-item>
        <el-descriptions-item label="预计毕业年份" width="100px">{{datas.graduationYear}}</el-descriptions-item>
        <el-descriptions-item label="是否已经毕业" width="100px">{{boolToYesNo(datas.isGraduated)}}</el-descriptions-item>
        <el-descriptions-item label="班级人数" width="100px">{{datas.size}}</el-descriptions-item>
        <el-descriptions-item label="班级最大人数" width="100px">{{datas.maxSize}}</el-descriptions-item>
        <el-descriptions-item label="班级性别分布" width="100px">{{datas.genderDistribution}}</el-descriptions-item>
        <el-descriptions-item label="所属院系" width="100px">{{academicStore.departmentNameMap.get(datas.facultyId)}}</el-descriptions-item>
        <el-descriptions-item label="专业" width="100px">{{datas.majorName}}</el-descriptions-item>
        <el-descriptions-item label="专业方向" width="100px">{{datas.SpecializationId}}</el-descriptions-item>
        <el-descriptions-item label="校区" width="100px">{{locationStore.campusNameMap.get(datas.campusId)}}</el-descriptions-item>
        <el-descriptions-item label="是否有固定教室" width="100px">{{boolToYesNo(datas.hasAssignedClassroom)}}</el-descriptions-item>
        <el-descriptions-item label="固定教室" width="100px">{{locationStore.classroomNameMap.get(datas.classroomId)}}</el-descriptions-item>
        <el-descriptions-item label="备注" width="100px">{{datas.remark}}</el-descriptions-item>
        <el-descriptions-item label="毕业学期" width="100px">{{datas.graduationYearSemester}}</el-descriptions-item>
        <el-descriptions-item label="是否扩招" width="100px">{{boolToYesNo(datas.isExpanding)}}</el-descriptions-item>
        <el-descriptions-item label="学业导师姓名" width="100px">{{datas.mentorName}}</el-descriptions-item>
        
    </el-descriptions>
  </el-drawer>
</template>

<script>
import {  ref } from 'vue';
import bus from "@/bus/bus.js";
import { useLocationStore } from '@/store/locationStore';
import { useAcademicStore } from '@/store/academicStore';
export default {
  name: "ClassroomInfoDrawer",
  mounted(){
     bus.on("showClassInfoDrawer",(value)=>{
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
        academicStore
    }
  }
};
</script>

<style>
</style>