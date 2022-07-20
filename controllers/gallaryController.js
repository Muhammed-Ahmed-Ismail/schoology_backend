const {GallaryImage} = require("../models")
const _ = require("lodash")

const addImage = async (req,res)=>{
   const gallaryImage = await GallaryImage.create(_.pick(req.body,['link','title','description']))
    res.status(201).json(gallaryImage)
}
const removeImage = async (req,res)=>{
    try {
        const gallaryImage = await GallaryImage.findByPk(req.body.imageId)
        await gallaryImage.destroy()
        res.status(201).json({success:"image deleted"})
    }catch (error) {
        res.status(400).send(error)
    }

}

const getGallaryImages = async (req,res)=>{
    const gallaryImages = await GallaryImage.findAll()
    res.json(gallaryImages)
}


module.exports = {
    addImage,
    removeImage,
    getGallaryImages
}