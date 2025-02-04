

export const EditArray = (Array,inputKey,inputValue,id)=>{
    console.log("Edit:",inputKey,inputValue,id);
    Array[Array.indexOf(Array.filter((mem)=>{
       return mem.id == id
    })[0])][inputKey] = inputValue
}   