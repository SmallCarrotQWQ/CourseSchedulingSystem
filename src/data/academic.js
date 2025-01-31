


export const initialDepartmentTypes = [
    {
        id: "dsfvdsfdsf",
        name: "院系"
    },
    {
        id: "gdfesfdhfd",
        name: "行政类"
    },
    {
        id: "jkyjghj",
        name: "其它"
    },
    {
        id: "dsagfhgfb",
        name: "科研机构"
    },
]


export const initialDepartments = [
    {
        id: "fac11111",
        code: "114514",
        name: "计算机科学与技术学院",
        ename: "School of Computer Science and Technology",
        abbr: "计科",
        type: { id: "dsfvdsfdsf", name: "院系" },
        teachingbuildingId: "",
        isEntity: true,
        isCourseOffering: true,
        isTeaching: true,
        isEnabled: true,
        isTeachingResearchOffice: true
    },
    {
        id: "fac22222",
        code: "222222",
        name: "水利水电学院",
        englishname: "slsdxy",
        abbr: "水专",
        isEntity: true,
        type: { id: "dsfvdsfdsf", name: "院系" },
        teachingbuildingId: "",
        isCourseOffering: true,
        isTeaching: true,
        isEnabled: true,
        isTeachingResearchOffice:false
    },
    {
        id: "fac33333",
        code: "12345",
        name: "教务处",
        englishname: "teachMe",
        abbr: "教÷",
        isEntity: true,
        type: {
            id: "gdfesfdhfd",
            name: "行政类"
        },
        teachingbuildingId: "",
        isCourseOffering: false,
        isTeaching: false,
        isEnabled: true,
        isTeachingResearchOffice:false
    },
    {
        id: "gggraet",
        code: "114444",
        name: "学校领导",
        englishname: "boss",
        abbr: "学校のking",
        isEntity: true,
        type: {
            id: "gdfesfdhfd",
            name: "行政类"
        },
        teachingbuildingId: "",
        isCourseOffering: false,
        isTeaching: false,
        isEnabled: true,
        isTeachingResearchOffice:false
    },
]

