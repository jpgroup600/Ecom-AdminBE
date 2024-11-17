const express = require("express");
const router = express.Router();
const GetSpecificProduct = require("../Controllers/GetSpecificProduct");

router.get("/:id", GetSpecificProduct.getProductById);

module.exports = router; // Correct way to export the router
