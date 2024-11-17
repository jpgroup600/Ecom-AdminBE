const UserModel = require('../../Models/User');
const ProductModel = require("../../Models/Product");
const MerchantModel = require('../../Models/Merchant');
const GetAllListFunction = async (req, res) => {
    try {
        const userCount = await UserModel.countDocuments();
        const merchantCount = await MerchantModel.countDocuments();
        const productCount = await ProductModel.countDocuments();
        const approvedProductCount = await ProductModel.countDocuments({ status: 'approved' });

        res.status(200).json({
            users: userCount,
            merchants: merchantCount,
            products: productCount,
            approvedProducts: approvedProductCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    GetAllListFunction,
};