


export const initialCampuses = [
    { id: "fkxq4vivo50", name: "下沙校区" },
    { id: "epyc1048596", name: "南浔校区" },
    { id: "cristinawww", name: "wzz校区" },
]

export const initialTeachingBuildings = [
    { id: "11451419778", name: "求实楼", code: "XDNYSXZX", campusId: "epyc1048596", available: true },
    { id: "konosibalax", name: "博学楼", code: "FKXQSVWF", campusId: "epyc1048596", available: true },
    { id: "llsssssssry", name: "炮楼", code: "QWQWQWQWQ", campusId: "cristinawww", available: false },
    { id: "awawawawawa", name: "闻潮书院", code: "SLEEPZZZZ", campusId: "fkxq4vivo50", available: true },
]
export const initialClassrooms = [
    { id: "aaaaaaaaaaa", name: "北211", code: "n211qwqw", campusId: "epyc1048596", teachingBuildingId: "konosibalax", floor: 5, tags: [], typeId: "type1", capacity: 40, describe: "", departmentId: "", classhour: 40, area: 100, desktype: "", available: true, assigned: true, airconditioner: true },
    { id: "bbbbbbbbbbb", name: "B-647", code: "QWQWQWQWQ", campusId: "fkxq4vivo50", teachingBuildingId: "awawawawawa", floor: 2, tags: [], typeId: "type1", capacity: 40, describe: "", departmentId: "", classhour: 40, area: 100, desktype: "", available: true, assigned: true, airconditioner: true },
    { id: "elpsycongro", name: "北114", code: "11451444", campusId: "fkxq4vivo50", teachingBuildingId: "awawawawawa", floor: 6, tags: [], typeId: "type1", capacity: 4, describe: "", departmentId: "", classhour: 0, area: 100, desktype: "", available: true, assigned: false, airconditioner: false },
]

export const initialclassroomTypes = [
    {id:"type1",name:"普通教室"},
    {id:"type2",name:"机房"},
    {id:"type3",name:"阶梯教室"},
    {id:"type4",name:"多媒体教室"},
]