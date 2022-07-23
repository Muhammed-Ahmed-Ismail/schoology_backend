const handelError = (err,req,res,next)=>{
    res.status(err.status | 400).json(err)
}

module.exports=handelError