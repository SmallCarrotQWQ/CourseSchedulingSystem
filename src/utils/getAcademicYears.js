export default ()=>{
    var startYear = 2019
    var endYear =  new Date().getFullYear()+10
    var resYears = []
    for(var i = startYear;i<endYear;i++){
        resYears.push(`${i}-${i+1}`)
    }
    return resYears
}