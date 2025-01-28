import { defineStore } from "pinia";
import { ArrayDelete,SingleDelete } from "@/hooks/list/useDelete.js" ;
import { EditArray } from "@/hooks/input/useEdit";

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
        Add(value) {
            this.campuses.push(value)
        },

        edit(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.campuses, key, obj[key], obj.id)
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