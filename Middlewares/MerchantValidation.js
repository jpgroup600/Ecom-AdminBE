const Joi = require("joi");

const signupValidation = (req, res, next) => {
  // Convert email to lowercase
  req.body.email = req.body.email.toLowerCase();

  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(100).required(),
    businessName: Joi.string().min(2).max(100).required(),
    address: Joi.string().min(2).max(100).optional(),
    PhoneNumber: Joi.string().min(2).max(15).required(),
    signupPath: Joi.string().required(),
    TextFild1: Joi.string().optional(),
    TextFild2: Joi.string().optional(),
    TextFild3: Joi.string().optional(),
    image1: Joi.string().optional(),
    image2: Joi.string().optional(),
    image3: Joi.string().optional(),
    
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  // Convert email to lowercase
  req.body.email = req.body.email.toLowerCase();

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
