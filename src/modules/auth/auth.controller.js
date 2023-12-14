const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { AuthMessage } = require("./auth.message");
const CookieNames = require("../../common/constant/cookie.enum");
const NodeEnv = require("../../common/constant/env.enum");
require("dotenv").config();
const { StatusCodes:  HttpStatus} = require("http-status-codes");
const { getOtpSchema, checkOtpShema } = require("./auth.validate");


class AuthController{
    #service
    constructor(){
        autoBind(this)
        this.#service = authService
    }
    async sendOtp(req,res,next){
        try {
            await getOtpSchema.validateAsync(req.body)
            const {mobile} = req.body
            await this.#service.sendOtp(mobile)    
            return res.json({
                message: AuthMessage.SendOtpSuccessfully
            })
        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req,res,next){
        try {
            await checkOtpShema.validateAsync(req.body)
            const {mobile , code} = req.body
            const token = await this.#service.checkOtp(mobile,code)
            return res.cookie(CookieNames.AccessToken , token , {
                httpOnly : true ,
                secure: process.env.NODE_ENV === NodeEnv.Production
            }).status(HttpStatus.OK).json({
                message : AuthMessage.LoginSuccessfully
            })

        } catch (error) {
            next(error)
        }
    }
    async logOut(req,res,next){
        try {
            return res.clearCookie(CookieNames.AccessToken).status(HttpStatus.OK).json({
                message: AuthMessage.LogoutSuccessfully
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new AuthController()