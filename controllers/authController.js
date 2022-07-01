const { User, Teacher, Student } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  signupValidationSchema,
  loginValidationSchema,
} = require("../schemas/authSchemas");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    // Validate user input
    const { error } = signupValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // // check if user exist in our database
    const isUserExists = await User.findOne({ where: { phone: req.body.phone } });
    if (isUserExists) return res.status(400).send("User already exists");

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user in our database
    const user = new User({
      name: req.body.name,
      phone: req.body.phone,
      password: encryptedPassword,
      roleId: req.body.roleId,
    });
    await user.save();

    if (req.body.roleId == 1) {
      const student = await Student.create({
        userId: user.id,
        gender: req.body.gender,
        birth_date: req.body.birth_date,
      });
    }
    if (req.body.roleId == 2) {
      const teacher = await Teacher.create({
        userId: user.id,
        courseId: req.body.courseId,
      });
    }
    if (user) return res.status(200).send(user);

  }
  catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    // Validate user input
    const { error } = loginValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exist in our database
    const user = await User.findOne({ where: { phone: req.body.phone } });
    if (!user) return res.status(404).send("User not found");

    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userId: user._id,
    }

    const token = jwt.sign(data, jwtSecretKey);

    res.status(200).json({ user: { name: user.name, phone: user.phone }, token });
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