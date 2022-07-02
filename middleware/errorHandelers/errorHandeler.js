const handelError = (err,req,res,next)=>{
    res.status(err.status).json(err)
}

module.exports=handelError