
const ProductModel = require('../../Models/Product');
const MerchantModel = require('../../Models/Merchant');
const GetAllProductsFunction = async (req, res) => {
    try {
        const products = await ProductModel.find();
        const enrichedProducts = await Promise.all(
            products.map(async (product) => {
                const merchant = await MerchantModel.findOne({ email: product.email });
                return { ...product._doc, merchant }; // Combine product and merchant data
            })
        );
        res.status(200).json(enrichedProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    GetAllProductsFunction,
};