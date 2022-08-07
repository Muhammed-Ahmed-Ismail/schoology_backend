const bcrypt = require("bcrypt");
const {Op} = require("sequelize")
require("dotenv").config();

const {User, Teacher, Student, Parent, Class} = require("../models");
const {
    signupValidationSchema,
    loginValidationSchema,
} = require("../schemas/authSchemas");
const {logInTeacher, logInStudent, logInParent, logInAdmin} = require("../services/loginService");

exports.signup = async (req, res) => {
    console.log(req.body)
    try {
        // check if user exist in our database
        const isUserExists = await User.findOne({
            where: {
                [Op.or]: [
                    {phone: req.body.phone},
                    {email: req.body.email}
                ]
            }
        });
        console.log(isUserExists);
        if (isUserExists) return res.status(400).send("User already exists");

        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        // set user password to hashed password
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);

        console.log(req.body);

        // Create user in our database
        const user = new User({
            name: req.body.name,
            phone: req.body.phone,
            password: encryptedPassword,
            roleId: req.body.roleId,
            email: req.body.email
        });
        await user.save();

        if (parseInt(req.body.roleId) === 1) {
            const teacher = await Teacher.create({
                userId: user.id,
                courseId: req.body.courseId,
            });
            for (const element of req.body.classes) {
                let classRoom = await Class.findByPk(element);
                teacher.addClass(classRoom);
            }
            if (teacher) res.json({signup: true, user, teacher});

        }

        if (parseInt(req.body.roleId) === 2) {
            const student = await Student.create({
                userId: user.id,
                gender: req.body.gender,
                birth_date: req.body.birth_date,
                classId: req.body.classId
            });
            if (student) res.json({user, student});
        }

        if (parseInt(req.body.roleId) === 3) {
            const user = await User.findByPk(req.body.studentId);
            const student = await user.getStudent();
            const parent = await Parent.create({
                userId: user.id,
                studentId: student.id,
            });
            if (parent) res.json({signup: true, user, parent});
        }

        if (parseInt(req.body.roleId) === 4) {
            const admin = await User.create({
                ...req.body
            });
            if (admin) res.json({signup: true, user, admin});
        }

    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

exports.signin = async (req, res) => {
    try {
        // check if user exist in our database
        const user = await User.findOne({
                where: {phone: req.body.phone}
        });
        if (!user) return res.status(404).send({
            signin: false,
            message: "wrong phone, not found"
        });
        if (!user.active) {
            return res.status(400).send({
                signin: false,
                message: "this user is not active"
            })
        }

        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({
                signin: false,
                message: "wrong password"
            });
        }

        let data = {}
        if (user.roleId === 1) {
            data = await logInTeacher(await user.getTeacher())
        } else if (user.roleId === 2) {
            data = await logInStudent(await user.getStudent())
        } else if (user.roleId === 3) {
            data = await logInParent(await user.getParent())
        } else if (user.roleId === 4) {
            data = await logInAdmin(user)
        }

        res.status(200).json({
            signin: true,
            ...data
        });
    } catch (error) {
        return res.status(500).send({message: error.message});
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

exports.deactivateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        console.log(req.params)
        if (user.active) {
            await User.update({
                    active: false,
                },
                {where: {id: user.id}}
            );

            return res.status(200).send({message: "successfully deactivated!"});
        } else {
            return res.send({message: "user already deactivated!"});
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.activateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        console.log(req.params)
        if (!user.active) {
            await User.update({
                    active: true,
                },
                {where: {id: user.id}}
            );

            return res.status(200).send({message: "successfully activated!"});
        } else {
            return res.send({message: "user already activated!"});
        }

    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.updateUser = async (req, res) => {
    try {
        if(!req.body.roleId) {
            return res.status(400).json(
                {update: false, message: "role not specified in body"}
            );
        }

        const user = await User.findByPk(req.params.id);

        const phoneChanged = req.body.phone && user.phone !== req.body.phone;
        const emailChanged = req.body.email && user.email !== req.body.email;

        if ((phoneChanged && await User.findOne({where: {phone: req.body.phone}})) ||
            (emailChanged && await User.findOne({where: {email: req.body.email}}))) {
            return res.status(400).send({
                update: false,
                message: "User already exists"
            });
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.encryptedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = req.body.encryptedPassword;
        }
        // copy params to user and save
        Object.assign(user, req.body);
        await user.save();

        if (req.body.roleId === 1) {
            const teacher = await Teacher.findOne({where: {userId: user.id}});
            if (teacher){
                Object.assign(teacher, req.body);
                await teacher.save();
                for (const element of req.body.classes) {
                    let classRoom = await Class.findByPk(element);
                    teacher.classUpdate(classRoom);
                }
                res.json({update: true, user, teacher});
            }else {
                res.status(400).json({update: false, message: "user is not a teacher"});
            }
        }
        else if (req.body.roleId === 2) {
            const student = await Student.findOne({where: {userId: user.id}});
            if (student) {
                Object.assign(student, req.body);
                await student.save();
                res.json({update: true, user, student});
            }else {
                res.status(400).json({update: false, message: "user is not a student"});
            }
        }
        else if (req.body.roleId === 3) {
            const parent = await Parent.findOne({userId: user.id});
            if (parent) {
                Object.assign(parent, req.body);
                await parent.save();
                res.json({update: true, user, parent});
            }else {
                res.status(400).json({update: false, message: "user is not a parent"});
            }
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.resetPassword = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.update({password: encryptedPassword}, {
        where: {
            id: req.body.id
        }
    });
    if (user) {
        res.json({update: true, message: 'user password updated'});
    } else {
        res.json({update: false, message: 'user password was not updated'});
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json([...users]);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['name', 'phone', 'email'],
            }],

        })
        return res.status(200).json([...teachers]);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['name', 'phone', 'email']
            }]
        });
        return res.status(200).json([...students]);
    }catch (e) {

    }
}

exports.getAllStudentsWithoutParents = async (req, res) => {
    try {
        const students = []
        const studentsUsers = await User.findAll({where: {roleId: 2}});
        for (const studentUser of studentsUsers) {
            const student = await studentUser.getStudent();
            if (!await student.getParent()) {
                students.push(studentUser)
            }
        }
        return res.status(200).json([...students])
    } catch (error) {
        return res.status(500).json(error.message)
    }
}
