let { Class , Student ,Parent} = require("../models")

// Post a Class
exports.createClass = async (req, res) => {
    try {
        const ClassDetails = await Class.create({
            name: req.body.name,
        });
        return res.status(201).json(ClassDetails);
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

// get all Classes
exports.getAll = async (req, res) => {
    try {
        const getClasses = await Class.findAll();
        return res.status(201).json(getClasses);
    }
    catch (error) {
        return res.status(400).send(error);
    }
};

// Find a Class by Id
exports.findByPk = async (req, res) => {
    try {
        const getClass = await Class.findByPk(req.params.id);
        return res.status(201).json(getClass);
    }
    catch (error) {
        return res.status(400).send(error);
    }
};


// Update a Class
exports.updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.update({
            name: req.body.name,
        },
            { where: { id: req.params.id } });
        return res.status(201).json(updatedClass);
    }
    catch (error) {
        return res.status(400).send(error);
    }
};

// Delete a Class by Id
exports.deleteClass = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedClass = await Class.destroy({
            where: { id: id },
        });
        return res.status(201).json(deletedClass);
    }
    catch (error) {
        return res.status(400).send(error);
    }
};

//get class students with their parents
exports.getClassStudentsWithParents = async (req, res) => {
    let classId = req.params.id;
    // try {
        let classx = await Class.findByPk(classId);
        let students = await Student.findAll({
            where: {classId: classx.id},
            include: [{
              model: Parent, // TO DO establish relation between user and parent
              as: 'parent'
            }]});
        return res.status(200).send(students);
    // }
    // catch (error) {
    //     return res.status(400).send(error);
    // }
};