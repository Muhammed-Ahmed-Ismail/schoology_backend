const isTeacher = async (req, res, next) => {

    if(req.user.roleId === 1){
        next()
    }else{
        return res.status(403).send('user is not a teacher')
    }
}

const isStudent = async (req, res, next) => {

    if(req.user.roleId === 2){
        next()
    }else{
        return res.status(403).send('user is not a student')
    }
}

const isParent = async (req, res, next) => {

    if(req.user.roleId === 3){
        next()
    }else{
        return res.status(403).send('user is not a parent')
    }
}

const isAdmin = async (req, res, next) => {

    if(req.user.roleId === 4){
        next()
    }else{
        return res.status(403).send('user is not a admin')
    }
}

module.exports = {isTeacher , isStudent ,isParent, isAdmin}
