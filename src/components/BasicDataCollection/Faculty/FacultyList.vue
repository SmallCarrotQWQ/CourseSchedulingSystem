<template>
    <div class="List">
        <div class="buttonMenu">
            <el-button type="primary" @click="HandleAddClick">添加</el-button>
            <el-button type="danger" v-show="isDeleteShow" @click="HandleArrayDelete(deleteValue)">删除选中</el-button>
        </div>

        <el-table :data="faculties" 
        :row-style="rowStyle"
        @selection-change='HandleSelectChange' 
        >
            <el-table-column type="selection" 
            :selectable="selectable" 
             width="55"
             />
            <el-table-column prop="id" label="id"/>
            <el-table-column prop="name" label="院系名称"/>   
            <el-table-column label="操作" v-slot="scope" >  
                <div class="RowButtons">
                    <el-button type="primary" @click="HandleEditClick(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="HandleSingleDelete(scope.row)">删除</el-button>
                </div>
            </el-table-column>
        </el-table>
        
    </div>
    <FacultyEditDialog/>
</template>

<script>
import bus from '@/bus/bus.js';
import { reactive,toRefs } from 'vue';
import FacultyEditDialog from './FacultyEditDialog.vue';
import { useFacultyStore } from '@/store/faculty';
import { storeToRefs } from 'pinia';



export default {
    name:"FacultyList",
    components:{
        FacultyEditDialog,
    },
    setup(){
        const facultyStore = useFacultyStore()
        const { faculties } = storeToRefs(facultyStore)
        const { HandleArrayDelete,HandleSingleDelete } = toRefs(facultyStore)
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
            bus.emit('showFacultyAdd')
        }

        const HandleEditClick = (value)=>{
            bus.emit('showFacultyEdit',value)
        }
        
        return {
            ...toRefs(data),
            faculties,
            HandleSelectChange,
            HandleAddClick,
            HandleEditClick,
            rowStyle,
            HandleSingleDelete,
            HandleArrayDelete,
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