const MerchantModel = require('../../Models/Merchant');
const GetAllMerchantsPage = async (req, res) => {
    try {
        const merchants = await MerchantModel.find({});
        const totalMerchants = merchants.length;
         res.status(200).json({
            totalMerchants,
            merchants,
            changed: "2024-11-26"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    GetAllMerchantsPage
 }