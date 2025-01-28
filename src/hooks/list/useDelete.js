

   export const ArrayDelete= (Array,delArray)=>{
        Array = Array.filter((value)=>{
            return delArray.indexOf(value) == -1
        })
        return Array
    }

    export const SingleDelete= (Array,delObj)=>{
        Array = Array.filter((value)=>{
            return value != delObj
        })
        return Array
    }
