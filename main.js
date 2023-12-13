const SwaggerConfig = require('./src/config/swagger.config')
const dotenv = require('dotenv')
const express = require('express')
const AllExceptionHandler = require('./src/common/exception/all-exception.handler')
const NotFoundHandler = require('./src/common/exception/not-found.handler')
const mainRouter = require('./src/modules/app.routes')
dotenv.config()

async function main(){
    const app = express()
    const port = process.env.PORT
    require('./src/config/mongoose.config')
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    SwaggerConfig(app)
    app.use(mainRouter)
    NotFoundHandler(app)
    AllExceptionHandler(app)
    app.listen(port , ()=> {
        console.log(`server: http://localhost:${port}`)
    })
}

main()