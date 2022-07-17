let { Message } = require("../models")
const { messages } = require("../middleware/requestValidators/Auth/signupStudent")

const createMessage = async (req, res) => {

    let senderId = req.user.id 
    console.log(req.user.id)
    try {
        let messagex = await Message.create({
            message: req.body.message,
            senderId: senderId, 
            recieverId: req.body.recieverId,
        })
        return res.json(messagex)
    } catch (error) {
        res.send(error)
    }
}


const listBySenderAndReciever = async (req, res) => {

    let senderId = req.user.id 

    try {
        let messages = await Message.findAll({
                where: { senderId: senderId , recieverId: req.params.id}
                ,
                order: [
                    ['createdAt', 'ASC'],
                ],
            }) 
        return res.json(messages)
        } 

    catch (error) {
        res.send('"status":"Something went wrong"')
    }

}

const createAnnouncment = async (req, res) => {
    let allRecords = []
    let recievers = req.body.recieverId
    for (let i = 0; i < recievers.length; i++) {
        let recordToInsert = {
            message: req.body.message,
            senderId: req.user.id, 
            recieverId: recievers[i],
        }
        allRecords.push(recordToInsert)
    }
    console.log(allRecords)
    try {
        let messagex = await Message.bulkCreate(
            allRecords
        )
        console.log(messagex)
        return res.send(messagex)
    } catch (error) {
        res.send(error)
    }
}

const create = async (req, res) => {
    let recievers = req.body.recieverId
    if(Array.isArray(recievers)){
        createAnnouncment(req,res)
    }else{
        createMessage(req,res)
    }
}

module.exports = { create , listBySenderAndReciever}