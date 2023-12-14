const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const {randomInt} = require('crypto');
const createHttpError = require("http-errors");
const { AuthMessage } = require("./auth.message");
const Jwt = require('jsonwebtoken')
require("dotenv").config();

class AuthService{
    #model
    constructor(){
        autoBind(this)
        this.#model = UserModel
    }
    async sendOtp(mobile){
        const user = await this.#model.findOne({mobile})
        const now = new Date().getTime()
        const otp = {
            code: randomInt(10000,99999),
            expiresIn: now + (1000 * 60 * 2)
        }
        if(!user) {
            const newUser = await this.#model.create({mobile , otp})
            return newUser
        }
        if(user.otp && user.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired)
        }
        user.otp = otp
        await user.save()
        return user
    }
    async checkOtp(mobile,code){
        const user = await this.checkExistByMobile(mobile)
        const now = new Date().getTime()
        if(user?.otp?.expiresIn < now) throw new createHttpError.Unauthorized(AuthMessage.OtpCodeExpired)
        if(user?.otp?.code !== code) throw new createHttpError.Unauthorized(AuthMessage.OtpCodeIsIncorrect)
        if(!user.verifiedMobile){
            user.verifiedMobile = true
        }
        const accessToken = this.signToken({mobile, id: user._id } )
        user.accessToken = accessToken
        await user.save()
        return user
    }
    async checkExistByMobile(mobile){
        const user = await this.#model.findOne({mobile})
        if(!user) throw new createHttpError.NotFound(AuthMessage.NotFound)
        return user
    }
    signToken(payload){
        return Jwt.sign(payload , process.env.JWT_SECRET_KEY , {expiresIn: '1y'})
    }
}


module.exports = new AuthService()