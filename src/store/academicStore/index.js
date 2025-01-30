
import { defineStore } from "pinia";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import { EditArray } from "@/hooks/input/useEdit";
import {
    initialDepartments,
    initialDepartmentTypes,
} from "@/data/academic"


export const useAcademicStore = defineStore('academic', {
    state: () => ({
        departments: [],
        departmentTypes: [],
        majors: [],
        courses: [],
        departmentMap: new Map(),
        departmentTypeMap: new Map(),
        AcademicDataInitiate:false
    }),
    actions: {
        initAcademicDatas(){
            if (!this.AcademicDataInitiate) {
                this.initDepartments()
                this.initDepartmentTypes()
                this.AcademicDataInitiate = true
            }
        },
        // getClassroomsByCampus(campusId) {
        //     return this.classrooms.filter((classroom) => {
        //         return classroom.campusId == campusId
        //     })
        // },
       
        // getClassroomsByCampusAndType(campusId, typeId) {
        //     return this.classrooms.filter((classroom) => {
        //         return classroom.campusId == campusId && classroom.typeId == typeId
        //     })
        // },



        initDepartments() {
            this.departments = initialDepartments;
            this.departmentMap = new Map(this.departments.map(c => [c.id, c]))
        },
        AddDepartment(value) {
            this.departments.push(value)
        },

        EditDepartment(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.departments, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            return true
        },
       
        initDepartmentTypes() {
            this.departmentTypes = initialDepartmentTypes;
            this.departmentTypeMap = new Map(this.departmentTypes.map(c => [c.id, c]))
        },
        AddDepartmentType(value) {
            this.departmentTypes.push(value)
        },

        EditDepartmentType(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.departmentTypes, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            return true
        },
       

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