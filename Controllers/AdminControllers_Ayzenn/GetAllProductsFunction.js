
const ProductModel = require('../../Models/Product');
const GetAllProductsFunction = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    GetAllProductsFunction,
};