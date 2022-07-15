const {Exam , StudentExam , Student , User,Class,Course,Teacher} = require("../models")

const listAvailableGradesByTeacherId = async (req,res)=>{
    const teacher = await req.user.getTeacher();
    const students = []
    let submittedExams = await teacher.getExams({where:{submitted:true},include:[{model:Class,as:'class',attributes:['name','id']}]});
    // for (const exam of availableGrades) {
    //     let studentsExams = await exam.getStudentExams()
    //     exam.students = await studentsExams.map(async (exam)=>{
    //         let students = await exam.getStudent()
    //         return students
    //     })
    //     console.log("students",exam)
    // }
    for (let exam of submittedExams) {
       exam =  { ...exam,students: Object.values(await getStudents(await exam.getStudentExams()))}
        // console.log(exam)
        // exam.students =

    }
    console.log(submittedExams)
    res.json({submittedExams,students})
}


const getStudents = async (studentExams)=>{
    const students = []
    for(const studentExam of studentExams)
    {
        students.push(await studentExam.getStudent())
    }
    console.log("students ",students)
    return students

}
module.exports = {
    listAvailableGradesByTeacherId
}