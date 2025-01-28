import { defineStore } from "pinia";
import { ArrayDelete,SingleDelete } from "@/hooks/list/useDelete.js" ;
import { EditArray } from "@/hooks/input/useEdit";


export const useFacultyStore = defineStore('faculty',{
    state:()=>({
        faculties:[],
        // {
        //     id:"string",
        //     campusName:"string",
        //     classroomName:"string",
        //     classroomAddress:"string",
        //     capacity:"int",
        //     classroomRemark:"string"      
        // }
    }),
    actions:{
        Add(value){
            this.faculties.push(value) 
        },
        
        edit(obj){
            if(obj){
                for(const key of Object.keys(obj)){
                    if(key == "id")continue
                    EditArray(this.faculties,key,obj[key],obj.id)
                }
            }
            else{
                return false
            }
            return true
        },


        HandleArrayDelete(deleteValue){
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
                        this.faculties = ArrayDelete(this.faculties,deleteValue)
                   } 
               ).catch(()=>
                   {
                       console.log("canceled...")
                   }
               )
       },


       
       HandleSingleDelete(value){
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
                   this.faculties = SingleDelete(this.faculties,value) 
               } 
           )

           
       }

    }

})