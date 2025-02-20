import request from "@/utils/request"

//发送登录请求
export const userLogin = (param)=>{
    return request.post('login',{
        ...param
    })
}   