function NotFoundHandler(app){
    app.use((req,res,next) => {
        req.status(404).json({
            message:'Not Found Route'
        })
    })
}

module.exports = NotFoundHandler