import { defineStore } from "pinia";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import { EditArray } from "@/hooks/input/useEdit";
import { initialCampuses } from "@/data/locations"

export const useCampusStore = defineStore('campus', {
    state: () => ({
        campuses: [],
        // {
        //     id:"string",
        //     name:"string",
        //     remark:"string"
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
                    this.campuses = ArrayDelete(this.campuses, deleteValue)
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
                    this.campuses = SingleDelete(this.campuses, value)
                }
            )


        }
    }


})