import axios from "axios";


const request = axios.create({
    baseURL: "https://mock.presstime.cn/mock/679a2d5fb365a6d86942118b/testapi",
    timeout: "5000"
})

request.interceptors.request.use(
    config => {
        //在这里给header加token
        const token = "qwq"
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
        return response.data
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    console.log("请求资源不存在QAQ");
            }
        }
        return Promise.reject(error)
    }
)

export default request