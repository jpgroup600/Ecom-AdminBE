const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  campaignName: {
    type: String,
    required: true,
  },
  setToCompaign: {
    type:Boolean,
    default: false,
    required:false,
  },
  isVisitOrShip: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  checkDay: {
    type: String,
    required: true,
  },
  availableTime: {
    type: String,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  textArea1: {
    type: String,
    required: true,
  },
  textArea2: {
    type: String,
    required: true,
  },
  textArea3: {
    type: String,
    required: true,
  },
  textArea4: {
    type: String,
    required: true,
  },
  textArea5: {
    type: String,
    required: true,
  },
  channel: {
    type: [String], // Array to hold multiple values
    required: true,
  },
  uploadedDate: {
    type: Date,
  },
  registeredUsers: {
    type: [mongoose.Schema.Types.ObjectId], // Array of ObjectId references to users
    ref: "users",
    required: false,
  },
  image1: {
    type: String,
    required: false,
  },
  image2: {
    type: String,
    required: false,
  },
  image3: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "expired","rejected"], 
    required: false,
    default: "pending", 
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  registeredUsers: {type: [Object], required: false}, 
  merchant : {type: mongoose.Schema.Types.ObjectId, ref: 'merchants'}
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
