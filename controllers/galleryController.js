const {GalleryImage} = require("../models")
const _ = require("lodash")

const addImage = async (req,res)=>{
   const galleryImage = await GalleryImage.create(_.pick(req.body,['link','title','description']));
    res.status(201).json(galleryImage);
}

const removeImage = async (req,res)=>{
    try {
        const galleryImage = await GalleryImage.findByPk(req.body.imageId);
        if (galleryImage) {
            await galleryImage.destroy();
            res.status(200).json({status:"image deleted"});
        }else {
            res.status(404).json({status: "image not found"});
        }
    }catch (error) {
        res.status(400).send(error);
    }
}

const getGalleryImages = async (req, res)=>{
    const galleryImages = await GalleryImage.findAll();
    res.json([...galleryImages]);
}

module.exports = {
    addImage,
    removeImage,
    getGalleryImages
}
