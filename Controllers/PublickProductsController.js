const ProductModel = require("../Models/Product");
const getAllProductsPublic = async (req, res) => {
  try {
    const products = await ProductModel.find(); 
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

module.exports = {
  getAllProductsPublic,
};
