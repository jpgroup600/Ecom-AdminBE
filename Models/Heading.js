const mongoose = require("mongoose");

// Define the schema for text fields (you can add more fields as needed)
const textFieldSchema = new mongoose.Schema({
  field1: { type: String, required: true },
  field2: { type: String, required: true },
  field3: { type: String, required: true },
  field4: { type: String, required: true },
  field5: { type: String, required: true },
});

const TextField = mongoose.model("TextField", textFieldSchema);

module.exports = TextField;
