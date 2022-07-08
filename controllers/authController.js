const { User, Teacher, Student, Parent,Class } = require("../models");
const bcrypt = require("bcrypt");

const {Op} = require("sequelize")
require("dotenv").config();
const {
  signupValidationSchema,
  loginValidationSchema,
} = require("../schemas/authSchemas");
const { logInTeacher } = require("../services/loginService");

exports.signup = async (req, res) => {
  console.log(req.body)
  // Save User to Database
  try {
    // Validate user input
    // const { error } = signupValidationSchema.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // // check if user exist in our database
    const isUserExists = await User.findOne({ 
      where:{ 
        [Op.or]: [
         {phone: req.body.phone},
          {email:req.body.email}
        ]
      }
    });
    console.log(isUserExists)
    if (isUserExists) return res.status(400).send("User already exists");

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user in our database
    console.log(req.body)

    const user = new User({
      name: req.body.name,
      phone: req.body.phone,
      password: encryptedPassword,
      roleId: req.body.roleId,
      email:req.body.email
    });
    await user.save();

    if (req.body.roleId == 2) {
      const student = await Student.create({
        userId: user.id,
        gender: req.body.gender,
        birth_date: req.body.birth_date,
        classId:req.body.classId
      });
      if(student) res.json({user,student})
    }
    if (req.body.roleId == 1) {
      const teacher = await Teacher.create({
        userId: user.id,
        courseId: req.body.courseId,
      });
      for (const element of req.body.classes) {
        let classRoom = await Class.findByPk(element)
        teacher.addClass(classRoom)
      }
      if(teacher) res.json({user,teacher})

    }
    if (req.body.roleId == 3) {
      const parent = await Parent.create({
        userId: user.id,
        studentId: req.body.studentId,
      });
      if(parent) res.json({user,parent})
    }
    // if (user) return res.status(200).send(user);

  }
  catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signupTeacher = async (req,res)=>{

}
exports.signin = async (req, res) => {
  try {
  
    
    // check if user exist in our database
    const user = await User.findOne({ where: { phone: req.body.phone } });
    if (!user) return res.status(404).send("User not found");

    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    if(user.roleId === 1)
    {
      let data = await logInTeacher(await user.getTeacher())
      res.status(200).json(data);
    }

    
  }
  catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};