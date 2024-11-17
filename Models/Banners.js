const mongoose = require("mongoose");

// Define the schema for text fields (you can add more fields as needed)
const Banner = new mongoose.Schema({
  url: { type: String, required: true },
});

const Banners = mongoose.model("Banner", Banner);

module.exports = Banners;
