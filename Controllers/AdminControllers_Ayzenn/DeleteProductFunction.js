const ProductModel = require("../../Models/Product");
const DeleteProductFunction = async (req, res) => {
    const { _id } = req.body; // Retrieve the product ID from the request body
    try {
        const product = await ProductModel.findByIdAndDelete(_id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    DeleteProductFunction,
};