const ProductModel = require("../Models/Product");
const router = require("express").Router();
const ReviewerRouter = require("express").Router();

router.get("/showAll/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find all products where the user is a reviewer
    const products = await ProductModel.find({
      reviewers: userId,
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found where this user is a reviewer." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the products." });
  }
});

module.exports = ReviewerRouter;
