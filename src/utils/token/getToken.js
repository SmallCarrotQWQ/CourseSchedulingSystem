



export const getToken = ()=>{
        if(sessionStorage.getItem("token")){
            return sessionStorage.getItem("token")
        }else{
            if(localStorage.getItem("token")){
                return localStorage.getItem("token")
            }else{
                return false
            }
        }
}