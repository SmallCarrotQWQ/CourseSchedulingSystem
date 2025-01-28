

export const Add = (Array,Obj)=>{
    if(inputValue.replace(/\s+/g,'').length !=0){
        Array.push(Obj)
        return true
    }
    return false
}

export const EditArray = (Array,inputKey,inputValue,id)=>{
    EditObjectInArray(Array,inputKey,inputValue,id)
}