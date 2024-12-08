const ProductModel = require("../Models/Product");
const MerchantModel = require("../Models/Merchant");

const addProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("User:", req.user);

    const {
      campaignName,
      service,
      isVisitOrShip,
      location,
      checkDay,
      availableTime,
      numberOfPeople,
      image,
      image1,
      textArea1,
      textArea2,
      textArea3,
      textArea4,
      textArea5,
      email,
      channel,
      uploadedDate,
      registeredUsers,
      catagory,
      buisnessName
    } = req.body;

    const userExists = await checkUserByEmail(email);

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = new ProductModel({
      email,
      service,
      campaignName,
      isVisitOrShip,
      location,
      checkDay,
      catagory,
      availableTime,
      numberOfPeople,
      image1,
      image,
      textArea1,
      textArea2,
      textArea3,
      textArea4,
      textArea5,
      channel,
      uploadedDate,
      registeredUsers,
      buisnessName
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error("Error adding product:", err);
    console.log("이게 에러임", ProductModel);
    res
      .status(500)
      .json({ message: "Error adding product", error: err.message });
  }
};

const checkUserByEmail = async (email) => {
  try {
    const user = await MerchantModel.findOne({ email: email });
    return !!user;
  } catch (e) {
    console.error("Error checking user by email:", e);
    return false;
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  const email = req.query.email;

  const userExists = await checkUserByEmail(email);

  if (!userExists) {
    res.sendStatus(404); // User not found
    return;
  }

  try {
    const products = await ProductModel.find({ email: email });
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};
const getSpecificProducts = async (req, res) => {
  const productId = req.query.productId;

  try {
    const products = await ProductModel.find({ _id: productId });
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};
const registeredUsers = async (req, res) => {
  const productId = req.query.productId;

  try {
    const product = await ProductModel.findById(productId).populate("users");

    if (!product) {
      return { message: "Product not found" };
    }

    const resx = {
      registeredUsers: product.users, // This will return the populated users
    };
    res.status(200).json(resx);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error fetching products", error: err.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const {
      campaignName,
      isVisitOrShip,
      location,
      checkDay,
      availableTime,
      numberOfPeople,
      image,
      textArea1,
      textArea2,
      textArea3,
      textArea4,
      textArea5,
      channel,
    } = req.body;

    // Find and update the product based on product ID and email
    const product = await ProductModel.findOneAndUpdate(
      { _id: req.params.id, email: req.body.email },
      {
        campaignName,
        isVisitOrShip,
        location,
        checkDay,
        availableTime,
        numberOfPeople,
        image,
        textArea1,
        textArea2,
        textArea3,
        textArea4,
        textArea5,
        channel,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating product", error: err.message });
  }
};

// Delete a product (associated with user's email)
const deleteProduct = async (req, res) => {
  try {
    // Find and delete the product based on product ID and email
    const product = await ProductModel.findOneAndDelete({
      _id: req.body.id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.registeredUsers && product.registeredUsers.length > 0) {
      return res.status(400).json({
        message: "Product cannot be deleted as there are registered users.",
      });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSpecificProducts,
  registeredUsers,
};
