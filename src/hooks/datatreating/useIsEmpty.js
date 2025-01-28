
export const isEmpty = (value)=>{
    return !(value.toString().replace(/\s+/g,'').length != 0)
}
