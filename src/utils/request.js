import axios from "axios";
import { ElMessage } from "element-plus";
import { getToken } from "./token/getToken";


const request = axios.create({
    baseURL: "https://mock.presstime.cn/mock/679a2d5fb365a6d86942118b/testapi",
    timeout: "5000"
})

request.interceptors.request.use(
    config => {
        //在这里给header加token
        const token = getToken()
        if (token) {
            config.headers = {
                ...config.headers,
                token
            }   
        }   
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
request.interceptors.response.use(
    response => {
        //在这里处理响应码
        // if(response.data.meta.code != 200){
        //     if(response.data.meta.message) ElMessage.error(response.data.meta.message)
        // }else{
        //     if(response.data.meta.message) ElMessage.success(response.data.meta.message)
        // }
        return response.data
    },
    error => {
        if (error.response) {
            console.log(error);
        }
        return Promise.reject(error)
    }
)

export default request