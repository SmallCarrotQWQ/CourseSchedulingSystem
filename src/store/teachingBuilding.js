import { defineStore } from "pinia";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import { EditArray } from "@/hooks/input/useEdit";
import { initialTeachingBuildings } from "@/data/locations";

export const useTeachingBuildingStore = defineStore('teachingBuilding', {
    state: () => ({

        // {
        //     id:"string",
        //     name:"string",
        //     remark:"string"
        // }    
    }),
    actions:{
        
        // HandleArrayDelete(deleteValue) {
        //     ElMessageBox.confirm(
        //         "确认删除吗?",
        //         "警告",
        //         {
        //             confirmButtonText: '确认',
        //             cancelButtonText: '取消',
        //             type: 'warning',
        //         }
        //     ).then(
        //         () => {
        //             this.teachingBuildings = ArrayDelete(this.teachingBuildings, deleteValue)
        //         }
        //     ).catch(() => {
        //         console.log("canceled...")
        //     }
        //     )
        // },



        // HandleSingleDelete(value) {
        //     ElMessageBox.confirm(
        //         "确认删除吗?",
        //         "警告",
        //         {
        //             confirmButtonText: '确认',
        //             cancelButtonText: '取消',
        //             type: 'warning',
        //         }
        //     ).then(
        //         () => {
        //             this.teachingBuildings = SingleDelete(this.teachingBuildings, value)
        //         }
        //     )


        // }
    }


})