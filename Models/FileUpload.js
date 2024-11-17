const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
