const { Router } = require("express");
const { AuthRouter } = require("./auth/auth.routes");

const mainRouter = Router()

mainRouter.use('/auth' , AuthRouter)
module.exports = mainRouter