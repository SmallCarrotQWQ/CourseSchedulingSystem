
import { defineStore } from "pinia";
import { ArrayDelete, SingleDelete } from "@/hooks/list/useDelete.js";
import { EditArray } from "@/hooks/input/useEdit";
import {
    initialDepartments,
    initialDepartmentTypes,
    initialMajors,
    educationalLevels,
    initialClassses,
    iniitialclasstypies,
} from "@/data/academic"


export const useAcademicStore = defineStore('academic', {
    state: () => ({
        departments: [],
        classes:[],
        majors: [],
        specializations:[],

        departmentTypes: [],
        educationalLevels:[],
        classTypies:[],

        departmentMap: new Map(),
        departmentNameMap: new Map(),
        departmentTypeMap: new Map(),
        majorMap:new Map(),
        majorNameMap:new Map(),
        classMap:new Map(),
        classNameMap:new Map(),
        specializationNameMap:new Map(),
        AcademicDatainitiate:false
    }),
    getters:{
        faculties:(state)=>{
            return state.departments.filter(d=>{
                return d.type == "院系"
            })
        },
    },
    actions: {
        initAcademicDatas(){
            if (!this.AcademicDatainitiate) {
                this.initDepartments()
                this.initDepartmentTypes()
                this.initMajors()
                this.initClasses()
                this.classTypies = iniitialclasstypies
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
        getMajorsByfaculty(facultyId){
            return this.majors.filter((major)=>{
                return major.facultyId == facultyId
            })
        },


        initDepartments() {
            this.departments = initialDepartments;
            this.departmentMap = new Map(this.departments.map(c => [c.id, c]))
            this.departmentNameMap = new Map(this.departments.map(c => [c.id, c.name]))
        },
        AddDepartment(value) {
            this.departments.push(value)
            this.departmentMap = new Map(this.departments.map(c => [c.id, c]))
            this.departmentNameMap = new Map(this.departments.map(c => [c.id, c.name]))
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
            this.departmentMap = new Map(this.departments.map(c => [c.id, c]))
            this.departmentNameMap = new Map(this.departments.map(c => [c.id, c.name]))
            return true
        },
       
        initDepartmentTypes() {
            this.departmentTypes = initialDepartmentTypes;
            this.departmentTypeMap = new Map(this.departmentTypes.map(c => [c.id, c]))
        },
        AddDepartmentType(value) {
            this.departmentTypes.push(value)
            this.departmentTypeMap = new Map(this.departmentTypes.map(c => [c.id, c]))
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
            this.departmentTypeMap = new Map(this.departmentTypes.map(c => [c.id, c]))
            return true
        },
        initMajors() {
            this.majors = initialMajors;
            this.majorNameMap = new Map(this.majors.map(c => [c.id, c.name]))
            this.majorMap = new Map(this.majors.map(c => [c.id, c]))
        },
        AddMajor(value) {
            this.majors.push(value)
            this.majorNameMap = new Map(this.majors.map(c => [c.id, c.name]))
            this.majorMap = new Map(this.majors.map(c => [c.id, c]))
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
            this.majorNameMap = new Map(this.majors.map(c => [c.id, c.name]))
            this.majorMap = new Map(this.majors.map(c => [c.id, c]))
            return true
        },

        initSpecializations() {
            this.specializations = initialMajors;
            this.majorNameMap = new Map(this.majors.map(c => [c.id, c.name]))
            this.majorMap = new Map(this.majors.map(c => [c.id, c]))
        },
        AddMajor(value) {
            this.majors.push(value)
            this.majorNameMap = new Map(this.majors.map(c => [c.id, c.name]))
            this.majorMap = new Map(this.majors.map(c => [c.id, c]))
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
            this.majorNameMap = new Map(this.majors.map(c => [c.id, c.name]))
            this.majorMap = new Map(this.majors.map(c => [c.id, c]))
            return true
        },

        initClasses() {
            this.classes = initialClassses;
            this.classNameMap = new Map(this.classes.map(c => [c.id, c.name]))
            this.classMap = new Map(this.classes.map(c => [c.id, c]))
        },
        AddClass(value) {
            this.classes.push(value)
            this.classNameMap = new Map(this.classes.map(c => [c.id, c.name]))
            this.classMap = new Map(this.classes.map(c => [c.id, c]))
        },

        EditClass(obj,oldId) {
            if (obj){
                for (const key of Object.keys(obj)) {
                    if (key == "id"){
                        if(obj.id != oldId){
                            this.classes.filter((c)=>{
                                return c.id == oldId
                            })[0].id = obj.id
                            continue
                        }
                        continue
                    }
                    EditArray(this.classes, key, obj[key], obj.id)
                }
            }
            else {
                return false
            }
            this.classNameMap = new Map(this.classes.map(c => [c.id, c.name]))
            this.classMap = new Map(this.classes.map(c => [c.id, c]))
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