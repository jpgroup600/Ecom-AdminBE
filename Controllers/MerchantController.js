const MerchantModel = require("../Models/Merchant");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Merchant signup
const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      businessName,
      address,
      PhoneNumber,
      signupPath,
      TextFild1,
      TextFild2,
      TextFild3,
      image1,
      image2,
      image3,
    } = req.body;

    const merchant = await MerchantModel.findOne({ email });
    if (merchant) {
      return res.status(409).json({
        message: "Merchant already exists, please login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const merchantModel = new MerchantModel({
      name,
      email,
      password: hashedPassword,
      businessName,
      address,
      PhoneNumber,
      signupPath,
      TextFild1,
      TextFild2,
      TextFild3,
      image1,
      image2,
      image3,
    });

    await merchantModel.save();

    res
      .status(201)
      .json({ message: "Merchant Signup Successful", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Merchant login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errorMsg = "Authentication Failed, Username or Password is incorrect";

    const merchant = await MerchantModel.findOne({ email });
    if (!merchant) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, merchant.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      {
        email: merchant.email,
        _id: merchant._id,
        businessName: merchant.businessName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "20d" }
    );

    res.status(200).json({
      message: "Merchant Login Successful",
      success: true,
      jwtToken,
      email: merchant.email,
      businessName: merchant.businessName,
      name: merchant.businessName,

      address: merchant.address,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
