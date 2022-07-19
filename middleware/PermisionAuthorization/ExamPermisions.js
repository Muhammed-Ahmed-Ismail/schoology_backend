const {isTeacher, isAdmin} = require("../roleAuthorization/role");

const canCreateExam = (req,res,next)=>{
    if(req.user.roleId === 1 || res.user.roleId === 4){
        next()
    }else{
        return res.status(403).send('User can Not Create Exam ')
    }
}

module.exports ={
    canCreateExam
}