const TextField = require("../Models/Heading"); // Import the TextField model

// Add new text fields to MongoDB
const addFields = async (req, res) => {
  const { field1, field2, field3, field4, field5 } = req.body;

  try {
    // Create a new TextField document with the provided fields
    const newTextFields = new TextField({
      field1,
      field2,
      field3,
      field4,
      field5,
    });

    // Save the new document to MongoDB
    await newTextFields.save();

    // Return the saved document as response
    res.status(201).json(newTextFields);
  } catch (error) {
    // Handle any errors that occur while saving
    res.status(400).json({ message: error.message });
  }
};
const deleteFields = async (req, res) => {
  const { field } = req.body; // e.g., 'field1', 'field2', etc.

  try {
    // Use $unset to remove the specified field from the document
    const updatedTextField = await TextField.findOneAndUpdate(
      { _id: "672cb3bfb331ad858221c491" },
      { $set: { [field]: "..." } }, // Dynamically unset the field passed in the request
      { new: true } // Return the updated document
    );

    if (!updatedTextField) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json(updatedTextField);
  } catch (error) {
    res.status(500).json({ message: "Error deleting field", error });
  }
};
// Get the text fields from MongoDB (only one document in this case)
const getFields = async (req, res) => {
  try {
    // Fetch the first document (since there's only one set of fields)
    const textFields = await TextField.findOne();

    // If no fields exist, return an error message
    if (!textFields) {
      return res.status(404).json({ message: "No text fields found" });
    }

    // Return the found document as a response
    res.status(200).json(textFields);
  } catch (error) {
    // Handle any errors that occur while fetching
    res.status(500).json({ message: error.message });
  }
};

// Update the text fields in MongoDB (only one document to update)
const updateFields = async (req, res) => {
  const { field1, field2, field3, field4, field5 } = req.body;

  try {
    // Fetch the first document (there should only be one)
    const textField = await TextField.findOne();

    // If no fields exist, return an error message
    if (!textField) {
      return res.status(404).json({ message: "No text fields found" });
    }

    // Update the fields (only those provided, others remain unchanged)
    textField.field1 = field1 || textField.field1;
    textField.field2 = field2 || textField.field2;
    textField.field3 = field3 || textField.field3;
    textField.field4 = field4 || textField.field4;
    textField.field5 = field5 || textField.field5;

    // Save the updated document back to MongoDB
    await textField.save();

    // Return the updated document as a response
    res.status(200).json(textField);
  } catch (error) {
    console.log(error);

    // Handle any errors that occur during the update process
    res.status(400).json({ message: error.message });
  }
};

// Export the controller methods
module.exports = {
  addFields,
  getFields,
  updateFields,
  deleteFields,
};
