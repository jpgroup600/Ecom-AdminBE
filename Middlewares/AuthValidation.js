const Joi = require('joi');

const signupValidation = (req, res, next) => {
    // Convert email to lowercase
    req.body.email = req.body.email.toLowerCase();

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(100).required(),
        phoneNumber: Joi.string().required(),
        birthDate: Joi.string().optional(),
        influenceType: Joi.string().required(),
        textField1: Joi.string().optional(),
        textField2: Joi.string().optional(),
        textField3: Joi.string().optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error);
        
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
}

const loginValidation = (req, res, next) => {
    // Convert email to lowercase
    req.body.email = req.body.email.toLowerCase();

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(100).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Request", error });
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}
