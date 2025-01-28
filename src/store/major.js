import { defineStore } from "pinia";
import { ArrayDelete,SingleDelete } from "@/hooks/list/useDelete.js" ;
import { EditArrayWhenInputNotEmpty,EditArray } from "@/hooks/input/useEdit";
import { reactive } from "vue";

export const useMajorStore = defineStore('major',{
    state:()=>({
        majors:[],
        // {
        //     id:"string",
        //     faculty:"string"
        //     majorName:"string"
        // }
    }),
    actions:{
        Add(value){
            this.majors.push(value) 
        },
        
        edit(obj){
            if(obj){
                for(const key of Object.keys(obj)){
                    if(key == "id")continue
                    EditArray(this.majors,key,obj[key],obj.id)
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
                        this.majors = ArrayDelete(this.majors,deleteValue)
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
                   this.majors = SingleDelete(this.majors,value) 
               } 
           )

           
       }

    }

})