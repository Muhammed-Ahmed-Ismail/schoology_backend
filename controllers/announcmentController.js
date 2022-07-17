let {Announcment} = require("../models")
const { messages } = require("../middleware/requestValidators/Auth/signupStudent")

const create = async (req, res) => {

    let senderId = req.user.id 
    console.log(req.user.id)
    try {
        let announcment = await Announcment.create({
            announcment: req.body.announcment,
            image: req.body.image,
            senderId: senderId, 
        })
        return res.json(announcment)
    } catch (error) {
        res.send(error)
    }
}


const list = async (req, res) => {
    try {
        let announcments = await Announcment.findAll({
                order: [
                    ['createdAt', 'ASC'],
                ],
            }) 
        return res.json(announcments)
        } 

    catch (error) {
        res.send('"status":"Something went wrong"')
    }

}
module.exports = { create , list }