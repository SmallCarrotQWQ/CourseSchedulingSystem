export const setToken = (token,isRemembered)=>{
    if(token){
        if(isRemembered){
            localStorage.setItem("token",token)
        }else{
            sessionStorage.setItem("token",token)
        }
    }
}