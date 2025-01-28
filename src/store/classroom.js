import { defineStore } from "pinia";
import { ArrayDelete,SingleDelete } from "@/hooks/list/useDelete.js" ;
import { EditArray } from "@/hooks/input/useEdit";


export const useClassroomStore = defineStore('classroom', {
    state: () => ({
        classrooms: [],
        types:[]
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
        Add(value) {
            this.classrooms.push(value)
        },
        AddType(value) {
            this.types.push(value)
        },

        edit(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.classrooms, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            return true
        },

        EditType(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.types, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            return true
        },
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