const ProductModel = require("../Models/Product");
const Approverouter = require("express").Router();
const Notification = require("../Models/Notification");


Approverouter.post('/SendMessage', async (req, res) => {
  const { email, message } = req.body;
  const notification = new Notification({
    productId: "관리자",
    receiver: email,
    message: message
  });
  await notification.save();
  res.status(200).json({ message: 'Message sent successfully' });
});


Approverouter.post("/user-approve", async (req, res) => {
  try {
    const {productId,email} = req.body; // Ensure this is the correct identifier
    console.log("Approving product with ID:", productId);

    const product = await ProductModel.findById(productId);

    // Update the product with the given ID
    const result = await ProductModel.updateMany(
      { _id: productId,
        "registeredUsers.email": email
       }, // Assuming you're filtering by _id
       { 
        $set: { 
            "registeredUsers.$[elem].status": "approved"
        }
    },
    {
        arrayFilters: [{ "elem.email": email }]
    }
    );

    // Check if any products were modified
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given ID" });
    }
    const notification = new Notification({
      productId: productId,
      receiver: email,
      message: ` "${product.campaignName}"이 승인되었습니다`
    });
    await notification.save();
   
    res
      .status(200)
      .json({ message: "Products updated to approved successfully" });
  } catch (error) {
    console.error("Error approving products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while approving the products." , error: error});
  }
});

Approverouter.post("/user-pending", async (req, res) => {
  try {
    const {productId,email} = req.body; // Ensure this is the correct identifier
    console.log("Approving product with ID:", productId);

    const product = await ProductModel.findById(productId);

    // Update the product with the given ID
    const result = await ProductModel.updateMany(
      { _id: productId,
        "registeredUsers.email": email
       }, // Assuming you're filtering by _id
       { 
        $set: { 
            "registeredUsers.$[elem].status": "pending"
        }
    },
    {
        arrayFilters: [{ "elem.email": email }]
    }
    );

    // Check if any products were modified
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given ID" });
    }
    const notification = new Notification({
      productId: productId,
      receiver: email,
      message: ` "${product.campaignName}"이 대기중으로 변경되었습니다`
    });
    await notification.save();
   
    res
      .status(200)
      .json({ message: "Products updated to approved successfully" });
  } catch (error) {
    console.error("Error approving products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while approving the products." , error: error});
  }
});

Approverouter.post("/user-reject", async (req, res) => {
  try {
    const {productId,email} = req.body; // Ensure this is the correct identifier
    console.log("Approving product with ID:", productId);

    const product = await ProductModel.findById(productId);

    // Update the product with the given ID
    const result = await ProductModel.updateMany(
      { _id: productId,
        "registeredUsers.email": email
       }, // Assuming you're filtering by _id
       { 
        $set: { 
            "registeredUsers.$[elem].status": "rejected"
        }
    },
    {
        arrayFilters: [{ "elem.email": email }]
    }
    );

    // Check if any products were modified
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given ID" });
    }
    const notification = new Notification({
      productId: productId,
      receiver: email,
      message: ` "${product.campaignName}"이 거절되었습니다`
    });
    await notification.save();
   
    res
      .status(200)
      .json({ message: "Products updated to approved successfully" });
  } catch (error) {
    console.error("Error approving products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while approving the products." , error: error});
  }
});







Approverouter.post("/approve", async (req, res) => {
  try {
    const {productId} = req.body; // Ensure this is the correct identifier
    console.log("Approving product with ID:", productId);

    const product = await ProductModel.findById(productId);

    // Update the product with the given ID
    const result = await ProductModel.updateMany(
      { _id: productId }, // Assuming you're filtering by _id
      { $set: { status: "approved" } }
    );

    // Check if any products were modified
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given ID" });
    }
    const notification = new Notification({
      productId: productId,
      receiver: product.email,
      message: `당신 상품 "${product.campaignName}"이 등록되었습니다`
    });
    await notification.save();
   
    res
      .status(200)
      .json({ message: "Products updated to approved successfully" });
  } catch (error) {
    console.error("Error approving products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while approving the products." , error: error});
  }
});







Approverouter.post("/pending", async (req, res) => {
  try {
    const {productId} = req.body; // Ensure this is the correct identifier
    console.log("Approving product with ID:", productId);

    const product = await ProductModel.findById(productId);

    // Update the product with the given ID
    const result = await ProductModel.updateMany(
      { _id: productId }, // Assuming you're filtering by _id
      { $set: { status: "pending" } }
    );

    // Check if any products were modified
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given ID" });
    }
    const notification = new Notification({
      productId: productId,
      receiver: product.email,
      message: `당신 상품 "${product.campaignName}"이 대기로 변경되었습니다`
    });
    await notification.save();
   
    res
      .status(200)
      .json({ message: "Products updated to approved successfully" });
  } catch (error) {
    console.error("Error approving products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while approving the products." , error: error});
  }
});


Approverouter.post("/reject", async (req, res) => {
  try {
    const {productId} = req.body; // Ensure this is the correct identifier
    console.log("Approving product with ID:", productId);

    const product = await ProductModel.findById(productId);

    // Update the product with the given ID
    const result = await ProductModel.updateMany(
      { _id: productId }, // Assuming you're filtering by _id
      { $set: { status: "rejected" } }
    );

    // Check if any products were modified
    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given ID" });
    }
    const notification = new Notification({
      productId: productId,
      receiver: product.email,
      message: `당신 상품 "${product.campaignName}"이 거절되었습니다`
    });
    await notification.save();
   
    res
      .status(200)
      .json({ message: "Products updated to rejected successfully" });
  } catch (error) {
    console.error("Error approving products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while approving the products." , error: error});
  }
});


Approverouter.delete("/delete", async (req, res) => {
  console.log("Delete request received asdfasdfasdf", req.body);
  try {
    const productId = req.body.productId; // Get productId from request body
    console.log("Deleting product with ID:", productId);

    // Delete the product with the given ID (assuming _id is the identifier)
    const result = await ProductModel.deleteOne({ _id: productId }); // Filter condition
    console.log("result", result);
    // Check if any products were deleted
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No product found with the given ID" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the product." });
  }
});

Approverouter.post('/setcampaign', async (req, res) => {
  try {
    const { productId } = req.body.data;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    console.log("Setting campaign with Product ID:", productId);

    const result = await ProductModel.updateOne(
      { _id: productId },
      { $set: { setToCompaign: true } }
    );
    console.log("updated ", result)

    // Check if any products were modified
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given ID" });
    }

    res
      .status(200)
      .json({ message: "Product updated to campaign successfully" });
  } catch (error) {
    console.error("Error setting campaign for product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while setting the campaign." });
  }
});

Approverouter.post('/remove-campaign', async (req, res) => {
  try {
    const { productId } = req.body.data;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    console.log("Setting campaign with Product ID:", productId);

    const result = await ProductModel.updateOne(
      { _id: productId },
      { $set: { setToCompaign: false } }
    );
    console.log("updated ", result)

    // Check if any products were modified
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given ID" });
    }

    res
      .status(200)
      .json({ message: "Product updated to campaign successfully" });
  } catch (error) {
    console.error("Error setting campaign for product:", error);
    res
      .status(500)
      .json({ message: "An error occurred while setting the campaign." });
  }
});

Approverouter.post('/add-product', async (req, res) => {
  console.log("Add product request received", req.body);

  try {
    console.log("User:", req.body);

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
      email,
      channel,
      uploadedDate,
      registeredUsers,
    } = req.body;


    const product = new ProductModel({
      email: "email not exist",
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
      uploadedDate,
      registeredUsers,
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

});




async function CreateNotification(
  sender = "Test",
  receiver,
  message,
  type = "registerStatus"
) {
  const notification = new Notification({ sender, receiver, message, type });
  await notification.save();
  return notification;
}
module.exports = Approverouter;
