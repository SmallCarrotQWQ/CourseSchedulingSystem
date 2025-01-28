<template>
    <div class="List">
        <div class="buttonMenu">
            <el-button type="primary" @click="HandleAddClick">添加</el-button>
            <el-button type="danger" v-show="isDeleteShow" @click="HandleArrayDelete">删除选中</el-button>
        </div>

        <el-table :data="courses" 
        :row-style="rowStyle"
        @selection-change='HandleSelectChange' 
        >
            <el-table-column type="selection" 
            :selectable="selectable" 
             width="55"
             />
            <el-table-column prop="id" label="id"/>
            <el-table-column prop="campus" label="课程号"/> 
            <el-table-column prop="name" label="课程名"/>
            <el-table-column prop="name" label="序号"/>
            <el-table-column prop="address" label="教师"/>
            <el-table-column prop="address" label="周次"/>
            
            <el-table-column prop="capacity" label="可容纳人数"/>
            <el-table-column prop="remark" label="备注"/>
            <el-table-column label="操作" v-slot="scope" >  
                <div class="RowButtons">
                    <el-button type="primary" @click="HandleEditClick(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="HandleSingleDelete(scope.row)">删除</el-button>
                </div>
            </el-table-column>
        </el-table>
        
    </div>
    <ClassroomEditDialog/>
</template>


<script>
import bus from '@/bus/bus.js';
import { storeToRefs } from 'pinia';
import { reactive,toRefs } from 'vue';
import { ElMessageBox } from 'element-plus';

import CourseEditDialog from './CourseEditDialog.vue';

import { useCourseStore } from '@/store/course.js';

import { ArrayDelete,SingleDelete } from "@/hooks/list/useDelete.js" ;



export default {
    name:"CourseList",
    components:{
        CourseEditDialog,
    },
    setup(){
        const CourseStore = useCourseStore()
        const {courses} = storeToRefs(CourseStore)

        const data = reactive({
            isDeleteShow:false,
            deleteValue:[]
        })

        const HandleSelectChange= (value)=>{
            data.deleteValue = value
            if(value.length === 0){
                data.isDeleteShow = false
            }else{
                data.isDeleteShow = true
            }
        }
        
        const rowStyle = ({row,rowIndex})=>{
                return {
                    'height':'60px'
                }
            }

        const HandleAddClick = ()=>{
            bus.emit('showClassroomAdd')
        }

        const HandleEditClick = (value)=>{
            bus.emit('showClassroomEdit',value)
        }

        const HandleArrayDelete = ()=>{
             ElMessageBox.confirm(
                "确认删除吗?",
                "警告",
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
                ).then(
                    ()=>{
                        classrooms.value = ArrayDelete(classrooms.value,data.deleteValue)
                    } 
                ).catch(()=>
                    {
                        console("canceled...")
                    }
                )
        }
        
        const HandleSingleDelete = (value)=>{
            ElMessageBox.confirm(
                "确认删除吗?",
                "警告",
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(
                ()=>{
                    classrooms.value = SingleDelete(classrooms.value,value) 
                } 
            ).catch(()=>
                {
                    console("canceled...")
                }
            )

            
        }
        
        return {
            ...toRefs(data),
            courses,
            CourseStore,
            HandleArrayDelete,
            HandleSingleDelete,
            HandleSelectChange,
            HandleAddClick,
            HandleEditClick,
            rowStyle,
        }
    }
}

</script>

<style scoped>
    .List{
        background: white;
        padding: 10px;
        margin: 10px;
        border:solid 2px #F0F2F5;
    }   

    .buttonMenu{
        display: flex;
        justify-content: flex-start;
        margin: 0px 0px 10px 0px;   
    }

    tbody td .cell .RowButtons{
        display: flex;
        flex-wrap: nowrap;
    }

    .el-table{
        border:solid 2px #F0F2F5;
    }

</style>