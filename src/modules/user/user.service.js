const autoBind = require("auto-bind");

class UserService{
    constructor(){
        autoBind(this)
    }
    async whoami(req,res,next){
        try {
            const user = req.user
            return res.json(user)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserService()