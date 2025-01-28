import { defineStore } from "pinia";

import { EditArrayWhenInputNotEmpty,EditArray } from "@/hooks/input/useEdit";

export const useCourseStore = defineStore('course',{
    state:()=>({
        courses:[],
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
            this.course.push(value) 
        },
        
        editItem(requiredArray,nullableArray,id){
            for(const obj of requiredArray){
                if(!EditArrayWhenInputNotEmpty(this.course,obj.key,obj.value,id)){
                    return false
                }
            }
            
            for(const obj of nullableArray){
                EditArray(this.course,obj.key,obj.value,id)
            }
            return true
        }
    }


})