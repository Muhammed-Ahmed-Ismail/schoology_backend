let { Course, User, Teacher } = require("../models")

// Post a course
exports.createCourse = async (req, res) => {
    try {
        const courseDetails = await Course.create({
            name: req.body.name,
        });
        return res.status(201).json(courseDetails);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

// get all Courses
exports.getAll = async (req, res) => {
    try {
        const getCourses = await Course.findAll();
        return res.status(201).json(getCourses);
    }
    catch (error) {
        return res.status(400).send(error);
    }
};

exports.getTeacherCourse = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const teacher = await Teacher.findOne({where: {userId: user.id}})
        const courses = await teacher.getCourse();
        return res.status(200).json([courses])
    }catch (e) {
       return res.status(500).send(e);
    }
}

// Find a course by Id
exports.findByPk = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        return res.status(201).json(course);
    }
    catch (error) {
        return res.status(400).send(error);
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.update({
            name: req.body.name,
        },
        { where: { id: req.params.id } });
        return res.status(201).json(updatedCourse);
    }
    catch (error) {
        return res.status(400).send(error);
    }
};

// Delete a course by Id
exports.deleteCourse = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedCourse = await Course.destroy({
            where: { id: id },
        });
        return res.status(201).json(deletedCourse);
    }
    catch (error) {
        return res.status(400).send(error);
    }
};
