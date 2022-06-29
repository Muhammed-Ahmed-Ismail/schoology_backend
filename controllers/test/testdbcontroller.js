const {User} = require("../../models")
 const createUser = async (req,res,next)=>{
    let firstName = "ahmed"
    let lastname = "aho"
    let email = "mail.com"
    let user = await User.create({firstName,lastname,email})

    res.json(user)
}

module.exports={createUser}