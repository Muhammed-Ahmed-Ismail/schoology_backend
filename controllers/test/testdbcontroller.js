const {User, Student, Role, Class, Meeting, Teacher} = require("../../models")
const createUser = async (req, res, next) => {
    // let eclass = await Class.findOne({name: "class1"})
    // let teacher = await Teacher.create({
    //     courseId:1,
    //     userId:1,
    //     roleId:1
    // })
    // let user = await User.create({
    //     name:"ahmed",
    //     roleId:1,
    //     phone:"123456",
    //     password:"rororo"
    // })

    // let teacher = await Teacher.create({
    //     userId:user.id,
    //     courseId:1
    // })
    // let teacher = await Teacher.findByPk( 1)

    // let meeting = await Meeting.create({
    //     link: "link1",
    //     date: "2022/1/1",
    //     teacherId:1,
    //     name:"meeting2",
    //     classId:1,
    //     courseId:1,
    //     period:2
    // })
    // res.json(meeting)
    // eclass.addMeeting()
    // let date = "2022-01-01"
    // let meetings = await teacher.isThatValidMeeting(date,2)
    // console.log(meetings)
    // res.json({meetings})
    // console.log(classroom)
    // res.json(classroom)
    res.json(req.user)
}

module.exports = {createUser}