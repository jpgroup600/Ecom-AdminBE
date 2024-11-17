const ProductModel = require('../../Models/Product');

const GetAllProductsAddedDate = async (req, res) => {
    console.log("here");
    try {
        const products = await ProductModel.find({});
        console.log(products);
        
        // Correct the access to the 'createdAt' field for each product
        const productJoinDates = products.map(product => ({
            ProductAddedDate: product.joinedDate // Use 'product' instead of 'products'
        }));

        res.status(200).json(productJoinDates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    GetAllProductsAddedDate,
};
