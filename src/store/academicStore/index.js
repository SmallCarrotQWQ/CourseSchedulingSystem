
import { defineStore } from "pinia";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import { EditArray } from "@/hooks/input/useEdit";
import {
    initialDepartments,
    initialDepartmentTypes,
    initialMajors,
    educationalLevels,
    initialClassses
} from "@/data/academic"


export const useAcademicStore = defineStore('academic', {
    state: () => ({
        departments: [],
        classes:[],
        majors: [],


        departmentTypes: [],
        educationalLevels:[],
        departmentMap: new Map(),
        departmentNameMap: new Map(),
        departmentTypeMap: new Map(),
        majorMap:new Map(),
        majorNameMap:new Map(),
        classMap:new Map(),
        classNameMap:new Map(),
        AcademicDatainitiate:false
    }),
    getters:{
        faculties:(state)=>{
            return state.departments.filter(d=>{
                return d.type == "院系"
            })
        }
    },
    actions: {
        initAcademicDatas(){
            if (!this.AcademicDatainitiate) {
                this.initDepartments()
                this.initDepartmentTypes()
                this.initMajors()
                this.educationalLevels = educationalLevels
                this.AcademicDatainitiate = true
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
            this.departmentNameMap = new Map(this.departments.map(c => [c.id, c.name]))
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
        initMajors() {
            this.majors = initialMajors;
            this.majorNameMap = new Map(this.majors.map(c => [c.id, c.name]))
            this.majorMap = new Map(this.majors.map(c => [c.id, c]))
        },
        AddMajor(value) {
            this.majors.push(value)
        },

        EditMajor(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.majors, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            return true
        },

        initClasses() {
            this.classes = initialClassses;
            this.classNameMap = new Map(this.classes.map(c => [c.id, c.name]))
            this.classMap = new Map(this.classes.map(c => [c.id, c]))
        },
        AddClass(value) {
            this.classes.push(value)
        },

        EditClass(obj) {
            if (obj) {
                for (const key of Object.keys(obj)) {
                    if (key == "id") continue
                    EditArray(this.classes, key, obj[key], obj.id)
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