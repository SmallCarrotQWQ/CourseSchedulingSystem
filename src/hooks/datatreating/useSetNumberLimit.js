import { isNumber } from "./useIsNumber"

export const setNumberLimit = (value,max,min)=>{
    if(!isNumber(value)){
        return false
    }
    if(value>max){
        value = max
    }
    if(value<min){
        value = min
    }
    return value
}
