import { defineStore } from "pinia";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import { EditArray } from "@/hooks/input/useEdit";
import {
    initialClassrooms,
    initialTeachingBuildings,
    initialclassroomTypes
} from "@/data/locations"

import { getCampusListApi } from "@/api/campus.api";
import { ElMessage } from "element-plus";



export const useLocationStore = defineStore('location', {
    state: () => ({
        campuses: [],
        teachingbuildings: [],
        classrooms: [],
        classroomtypes: [],
        classroomMap: new Map(),
        classroomNameMap: new Map(),
        classroomTypeMap: new Map(),
        classroomTypeNameMap: new Map(),
        campusMap: new Map(),
        campusNameMap: new Map(),
        teachingbuildingMap: new Map(),
        teachingbuildingNameMap: new Map(),
        locationDataInitiate: false
    }),
    actions: {
        initLocationDatas() {
            if (!this.locationDataInitiate) {
                this.initCampuses()
                this.initTeachingBuildings()
                this.initClassrooms()
                this.initClassroomTypes()
                this.locationDataInitiate = true
            }
        },
        refreshCampus(parm) {
            ElMessage({
                message: "刷新中...",
                type: "info"
            })
            getCampusListApi(parm).then(response => {
                this.campuses = response.data.campuses
                this.campusNameMap = new Map(this.campuses.map(c => [c.id, c.name]))
                this.campusMap = new Map(this.campuses.map(c => [c.id, c]))
                ElMessage({
                    message: "刷新成功!",
                    type: "success"
                })
            }).catch(error => {
                ElMessage({
                    message: `刷新失败! 错误信息${error}`,
                    type: "error"
                })
                return error
            })
           
        },
        getClassroomsByCampus(campusId) {
            return this.classrooms.filter((classroom) => {
                return classroom.campusId == campusId
            })
        },
        getClassroomsByBuilding(BuildingId) {
            return this.classrooms.filter((classroom) => {
                return classroom.teachingbuildingId == BuildingId
            })
        },
        getClassroomsByType(TypeId) {
            return this.classrooms.filter((classroom) => {
                return classroom.typeId == TypeId
            })
        },
        getBuildingsByCampus(campusId) {
            return this.teachingbuildings.filter((building) => {
                return building.campusId == campusId
            })
        },
        getClassroomsByBuildingAndType(BuildingId, typeId) {
            return this.classrooms.filter((classroom) => {
                return classroom.teachingbuildingId == BuildingId && classroom.typeId == typeId
            })
        },
        getClassroomsByCampusAndType(campusId, typeId) {
            return this.classrooms.filter((classroom) => {
                return classroom.campusId == campusId && classroom.typeId == typeId
            })
        },



        initCampuses() {
            getCampusListApi().then(response => {
                this.campuses = response.data.campuses
                this.campusNameMap = new Map(this.campuses.map(c => [c.id, c.name]))
                this.campusMap = new Map(this.campuses.map(c => [c.id, c]))
            }).catch(error => {
                console.log(error);
                return new Error(error)
            })

        },
        AddCampus(value) {
            this.campuses.push(value)
        },

        EditCampus(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.campuses, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            return true
        },
        initTeachingBuildings() {
            this.teachingbuildings = initialTeachingBuildings;
            this.teachingbuildingMap = new Map(this.teachingbuildings.map(t => [t.id, t]))
            this.teachingbuildingNameMap = new Map(this.teachingbuildings.map(t => [t.id, t.name]))
            console.log(this.teachingbuildingNameMap);
        },
        AddTeachingBuilding(value) {
            this.teachingbuildings.push(value)
        },

        EditTeachingBuilding(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.teachingbuildings, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            return true
        },
        initClassrooms() {
            this.classrooms = initialClassrooms;
            this.classroomtypes = initialclassroomTypes;
            this.classroomNameMap = new Map(this.classrooms.map(c =>[c.id,c.name]))
        },
        AddClassroom(value) {
            this.classrooms.push(value)
        },
        EditClassroom(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.classrooms, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            return true
        },
        initClassroomTypes() {
            this.classroomtypes = initialclassroomTypes
            this.classroomTypeMap = new Map(this.classroomtypes.map(c => [c.id, c]))
            this.classroomTypeNameMap = new Map(this.classroomtypes.map(c => [c.id, c.name]))
        },
        AddType(value) {
            this.classroomtypes.push(value)
        },
        EditType(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.classroomtypes, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            return true
        },






        // Add(value) {
        //     this.campuses.push(value)
        // },
        // edit(obj) {
        //     if (obj) {
        //         for (const key of Object.keys(obj)) {
        //             if (key == "id") continue
        //             EditArray(this.campuses, key, obj[key], obj.id)
        //         }
        //     }
        //     else {
        //         return false
        //     }
        //     return true
        // },
        HandleArrayDelete(deleteValue) {
            ElMessageBox.confirm(
                "确认删除吗?",
                "警告",
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(
                () => {
                    this.campuses = ArrayDelete(this.campuses, deleteValue)
                }
            ).catch(() => {
                console.log("canceled...")
            }
            )
        },



        HandleSingleDelete(value) {
            ElMessageBox.confirm(
                "确认删除吗?",
                "警告",
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(
                () => {
                    this.campuses = SingleDelete(this.campuses, value)
                }
            )


        }
    }


})