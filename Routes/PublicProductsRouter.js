const express = require("express");
const router = express.Router();
const PublicProductController = require("../Controllers/PublickProductsController");

/**
 * @swagger
 * /products/public:
 *   get:
 *     summary: Retrieve all products without authentication
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/public", PublicProductController.getAllProductsPublic); 

module.exports = router;
