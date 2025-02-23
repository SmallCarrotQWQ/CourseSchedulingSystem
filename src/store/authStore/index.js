import { defineStore } from "pinia";
import { getRoutes } from "@/api/routes.api";
import router from "@/router";
import { getUserInfo } from "@/api/user.api";
const modules = import.meta.glob('../../views/**/**')

export const useAuthStore = defineStore('auth', {
    state: () => ({
        routes: {},
        userInfo:{}
    }),
    actions: {
        Logout(){
            localStorage.clear()
            sessionStorage.clear()
            this.$reset()
        },

        setRoutes(){
            return getRoutes().then(res => {
                this.routes = res.data.routes
            }).then(()=>{
                const childrens = this.setRouterList(this.routes.children)
                router.addRoute({
                    path: this.routes.path,
                    name: this.routes.name,
                    meta: this.routes.meta,
                    redirect: this.routes.redirect,
                    component: modules[`../../views${this.routes.componmentUrl}`],
                    children: childrens
                })
                console.log(childrens);
                console.log(router.getRoutes());
            })
        },
        setRouterList(data) {
            let res = []
            data.forEach((c) => {
                if (c.path == "/home/index") {
                    res.push({
                        name: c.name,
                        path: c.path,
                        meta: c.meta,
                        component: modules[`../../views${c.componmentUrl}`],
                    })
                } else {
                    const childrens = []
                    c.children.forEach((c2) => {
                        console.log("c2",c2);
                        childrens.push({
                            name: c2.name,
                            path: c2.path,
                            meta: c2.meta,
                            component: modules[`../../views${c2.componmentUrl}`]
                        })
                    })
                    res.push({
                        path: c.path,
                        name: c.name,
                        meta: c.meta,
                        redirect: c.redirect,
                        children:childrens
                    })
                }
            })
            console.log("res",res);
            return res

        },

        getUserInfo(){
            getUserInfo().then(res=>{
                this.userInfo = res.data
            })

        }
    }
})

