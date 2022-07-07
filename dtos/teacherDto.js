const _ = require("lodash")

const picTeacherResource = (dbResponse)=>{
    // console.log("pre",dbResponse.classes.dataValues)
    let classes = dbResponse.classes.map(element => {
        return _.pick(element['dataValues'],['id','name'])
    })
    console.log(classes)
    return resource = {
        ... dbResponse,
        classes,
        course:_.pick(dbResponse.course,['id','name'])
    }
}

module.exports={picTeacherResource}