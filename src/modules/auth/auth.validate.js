const Joi = require('@hapi/joi')
const createHttpError = require('http-errors')
const { AuthMessage } = require('./auth.message')
const getOtpSchema = Joi.object({
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest(AuthMessage.InvalidMobileNumber))
})
const checkOtpShema = Joi.object({
    mobile: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest(AuthMessage.InvalidMobileNumber)),
    code: Joi.string().min(4).max(6).error(createHttpError.BadRequest(AuthMessage.OtpCodeIsIncorrect))
})

module.exports = {
    getOtpSchema,
    checkOtpShema
}