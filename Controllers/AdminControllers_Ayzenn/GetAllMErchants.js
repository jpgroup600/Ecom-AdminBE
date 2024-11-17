const MerchantModel = require('../../Models/Merchant');

const GetAllMerchantsFunction = async (req, res) => {
    try {
        const page = parseInt(req.params.pagenumber) || 1; 
        const limit = parseInt(req.params.limit) || 10; 
        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            return res.status(400).json({ error: "Invalid page number or limit." });
        }
        const skip = (page - 1) * limit;
        const merchants = await MerchantModel.find({})
            .skip(skip)
            .limit(limit);
        const totalMerchants = await MerchantModel.countDocuments();
        res.status(200).json({
            totalMerchants,
            totalPages: Math.ceil(totalMerchants / limit),
            currentPage: page,
            merchants,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    GetAllMerchantsFunction,
};