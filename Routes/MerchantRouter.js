const { signup, login } = require("../Controllers/MerchantController");
const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/MerchantValidation");
const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
