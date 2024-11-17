const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductController");
// const { authenticate } = require("../Middlewares/ProductValidation");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products for the current user
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/:email ", ProductController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: The product was successfully created.
 */
router.post("/add", ProductController.addProduct);
router.get(
  "/specificProduct/:productId",
  ProductController.getSpecificProducts
);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: The product was successfully updated.
 */
router.put("/:id", ProductController.updateProduct);
router.get("/getRegisteredUsers/:id", ProductController.registeredUsers);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product was successfully deleted.
 *       404:
 *         description: Product not found
 */
router.delete("/delete", ProductController.deleteProduct);

module.exports = router;
