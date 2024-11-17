const ProductModel = require("../Models/Product");

// Get a product by ID
const getProductById = async (req, res) => {
  try {
    // Find product by ID
    const product = await ProductModel.findById(req.params.id);
    
    // If product not found, return 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Send the product in the response
    res.status(200).json(product);
  } catch (err) {
    // If there's an error, return 500 and the error message
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

module.exports = {
  getProductById,
};
