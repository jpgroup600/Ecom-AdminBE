const ProductModel = require("../../Models/Product");
const ApproveProductFunction = async (req, res) => {
    const { _id } = req.body; // Retrieve the product ID from the request body
    try {
        const product = await ProductModel.findByIdAndUpdate(_id, { status: 'approved' }, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product approved', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    ApproveProductFunction,
};