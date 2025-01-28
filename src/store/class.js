import { defineStore } from "pinia";
import { ArrayDelete,SingleDelete } from "@/hooks/list/useDelete.js" ;
import { EditArray } from "@/hooks/input/useEdit";


export const useClassStore = defineStore('class',{
    state:()=>({
        classes:[],
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
            this.classes.push(value) 
        },
        
        edit(obj){
            if(obj){
                for(const key of Object.keys(obj)){
                    if(key == "id")continue
                    EditArray(this.classes,key,obj[key],obj.id)
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
                        this.classes = ArrayDelete(this.classes,deleteValue)
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
                   this.classes = SingleDelete(this.classes,value) 
               } 
           )

           
       }

    }

})