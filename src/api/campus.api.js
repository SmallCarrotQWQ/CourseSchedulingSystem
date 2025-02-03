import request from "@/utils/request"


export const getCampusInfos = ()=>{
    return request({
        url:"/campuses",
        method:"get",
    })
}