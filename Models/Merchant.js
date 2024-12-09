const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MerchantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
  },
  
  urladdress: {
    type: String,
    required: false,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  signupPath: {
    type: String,
    required: false,
  },
  userType: {
    type: String,
    required: true,
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
  
});

const MerchantModel = mongoose.model("merchants", MerchantSchema);
module.exports = MerchantModel;
