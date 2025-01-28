
export const EditObjectInArray = (Array,key,NewValue,id)=>{
    console.log("Edit:",Array,key,NewValue,id);
    Array[Array.indexOf(Array.filter((mem)=>{
       return mem.id == id
    })[0])][key] = NewValue
}
