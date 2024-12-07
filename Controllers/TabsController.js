const Tab = require("../Models/Tabs"); // Import your model

// Add functionality to handle comma-separated string and save as an array
const handleArrayStrings = async (req, res) => {
  const { strings } = req.body;

  if (!strings || typeof strings !== "string") {
    return res
      .status(400)
      .json({ error: "Input must be a string of comma-separated values" });
  }

  // Split the string by commas and trim any extra spaces
  const stringsArray = strings.split(",").map((item) => item.trim());

  try {
    // Save the array to the database
    const newTab = await Tab.findOneAndUpdate(
      {},
      { $set: { stringsArray } }, // Set the new array value for 'stringsArray'
      { new: true } // Option to return the updated document
    );

    // Send response
    return res
      .status(200)
      .json({ message: "Array received and saved successfully", data: newTab });
  } catch (err) {
    console.error("Error saving tabs:", err);
    return res
      .status(500)
      .json({ error: "Failed to save tabs to the database" });
  }
};

// Delete functionality: Removes a tab from the 'stringsArray' by its value
const deleteTab = async (req, res) => {
  const { tabValue } = req.body;

  if (!tabValue || typeof tabValue !== "string") {
    return res.status(400).json({ error: "Tab value must be a string" });
  }

  try {
    // Find the document and remove the tab
    const updatedTab = await Tab.findOneAndUpdate(
      {},
      { $pull: { stringsArray: tabValue } },
      { new: true }
    );

    if (!updatedTab) {
      return res.status(404).json({ error: "Tab not found" });
    }

    return res
      .status(200)
      .json({
        message: "Tab deleted successfully",
        data: updatedTab.stringsArray,
      });
  } catch (err) {
    console.error("Error deleting tab:", err);
    return res
      .status(500)
      .json({ error: "Failed to delete tab from the database" });
  }
};

const updateTab = async (req, res) => {
  const { index, newTabValue } = req.body;

  if (
    typeof index !== "number" ||
    index < 0 ||
    !newTabValue ||
    typeof newTabValue !== "string"
  ) {
    return res.status(400).json({ error: "Invalid index or new tab value" });
  }

  try {
    const updatedTab = await Tab.findOneAndUpdate(
      {},
      { $set: { [`stringsArray.${index}`]: newTabValue } },
      { new: true }
    );

    if (!updatedTab) {
      return res.status(404).json({ error: "Tab not found" });
    }

    return res
      .status(200)
      .json({
        message: "Tab updated successfully",
        data: updatedTab.stringsArray,
      });
  } catch (err) {
    console.error("Error updating tab:", err);
    return res
      .status(500)
      .json({ error: "Failed to update tab in the database" });
  }
};

// Get all tabs (headings)
const getTabs = async (req, res) => {
  try {
    // Fetch all the tabs from the database
    const allTabs = await Tab.find();

    if (!allTabs.length) {
      return res.status(404).json({ error: "No tabs found" });
    }

    return res
      .status(200)
      .json({ message: "Tabs fetched successfully", data: allTabs });
  } catch (err) {
    console.error("Error fetching tabs:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch tabs from the database" });
  }
};

module.exports = { handleArrayStrings, deleteTab, updateTab, getTabs };
