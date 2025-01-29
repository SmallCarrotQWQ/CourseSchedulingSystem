import { defineStore } from "pinia";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import { EditArray } from "@/hooks/input/useEdit";
import { initialClassrooms,initialclassroomTypes } from "@/data/locations";


export const useClassroomStore = defineStore('classroom', {
    state: () => ({

        // {
        //     id:"string",
        //     campusName:"string",
        //     classroomName:"string",
        //     classroomAddress:"string",
        //     capacity:"int",
        //     classroomRemark:"string"      
        // }
    }),
    actions: {
       
        HandleArrayDelete(deleteValue) {
            ElMessageBox.confirm(
                "确认删除吗?",
                "警告",
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(
                () => {
                    this.classrooms = ArrayDelete(this.classrooms, deleteValue)
                }
            ).catch(() => {
                console.log("canceled...")
            }
            )
        },



        HandleSingleDelete(value) {
            ElMessageBox.confirm(
                "确认删除吗?",
                "警告",
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(
                () => {
                    this.classrooms = SingleDelete(this.classrooms, value)
                }
            )


        }

    }


})