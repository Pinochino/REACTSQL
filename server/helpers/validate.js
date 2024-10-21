import Joi from "joi";

export const validateLogin = (data) => {
    const userSchema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(4).required()
    })

    return userSchema.validate(data)
}

export const validateRegister = (data) => {
    const userSchema = Joi.object({
        username: Joi.string().min(4).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(4).required()
    })
    return userSchema.validateRegister(data)
}