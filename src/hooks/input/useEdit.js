import {EditObjectInArray} from "@/hooks/list/useEdit.js"
import { isEmpty } from "../datatreating/useIsEmpty";


export const EditArrayWhenInputNotEmpty = (Array,inputKey,inputValue,id)=>{
    if(!isEmpty(inputValue)){
        console.log("@@@@@@@@@",inputValue);
        EditObjectInArray(Array,inputKey,inputValue,id)
        return true
    }
    console.log(inputKey,false);
    return false
}

export const EditArray = (Array,inputKey,inputValue,id)=>{
    EditObjectInArray(Array,inputKey,inputValue,id)
}   