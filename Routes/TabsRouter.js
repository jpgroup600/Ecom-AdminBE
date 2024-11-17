// /routes/myRoute.js
const express = require("express");
const router = express.Router();
const {
  handleArrayStrings,
  deleteTab,
  updateTab,
  getTabs,
} = require("../Controllers/TabsController");

// POST route to accept an array of strings
router.post("/array", handleArrayStrings);
router.post("/deleteTab", deleteTab);
router.put("/updateTab", updateTab);
router.get("/getTab", getTabs);
module.exports = router;
