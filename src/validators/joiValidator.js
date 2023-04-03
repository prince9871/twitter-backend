const Joi = require("joi");

let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

const signUpSchema = Joi.object({
    username: Joi.string().min(1).required(),
    email: Joi.string().min(1).email().required(),
    password: Joi.string().pattern(passwordRegex).required(),
    favorite_food: Joi.string().min(2).required()
});

const loginSchema = Joi.object({ 
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordRegex).required(),
  });

module.exports = { signUpSchema, passwordRegex,loginSchema }