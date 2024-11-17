const express = require("express");
const router = express.Router();
const {
  addFields,
  getFields,
  updateFields,
  deleteFields,
} = require("../Controllers/HeadingController");
// Route to add text fields
router.post("/fields", addFields);

// Route to get the text fields
router.get("/fields", getFields);
router.post("/fields/delete", deleteFields);

// Route to update text fields
router.post("/fields/update", updateFields);

module.exports = router;
