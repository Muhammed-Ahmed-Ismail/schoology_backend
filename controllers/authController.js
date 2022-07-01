const User = require("../models/user");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
  // Save User to Database
  try {
    // Validate user input
    if (!(req.body.username && req.body.phone)) {
      res.status(400).send("All input is required");
    }

    // check if user exist in our database
    const isUserExists = await User.findOne({ phone: req.body.phone });
    if (isUserExists) return res.status(400).send("User already exists");

    // Create user in our database
    const user = await User.create({
      username: req.body.username,
      phone: req.body.phone,
    });

    if (user) return res.status(200).send({ message: "User registered successfully!" });
  }
  catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.signin = async (req, res) => {
  try {
    // Validate user input
    if (!(req.body.username && req.body.phone)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({
      where: {
        phone: req.body.phone,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // const token = jwt.sign({ id: user.id }, config.secret, {
    //   expiresIn: 86400, // 24 hours
    // });
    // Generate token
    const token = sign(
      { userID: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      phone: user.phone,
    });
  } catch (error) {
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