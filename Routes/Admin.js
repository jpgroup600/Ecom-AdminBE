const ProductModel = require("../Models/Product");
const Approverouter = require("express").Router();
const Notification = require ("../Models/Notification");
Approverouter.post("/approve", async (req, res) => {
  try {
    const { productId, userId } = req.body; // Ensure this is the correct identifier
    console.log("Approving product with ID:", productId);

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
    await CreateNotification(
      "admin",
      userId,
      "Your product has been Approved id is " + productId,
      "AdminNotif"
    );
    res
      .status(200)
      .json({ message: "Products updated to approved successfully" });
  } catch (error) {
    console.error("Error approving products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while approving the products." });
  }
});
Approverouter.post("/reject", async (req, res) => {
  try {
    const { productId, userId } = req.body.id; // Ensure this is the correct identifier
    console.log("Approving product with ID:", productId);

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
    await CreateNotification(
      "admin",
      userId,
      "Your product has been Rejected by Admin id is " + productId,
      "AdminNotif"
    );
    res
      .status(200)
      .json({ message: "Products updated to Rejected successfully" });
  } catch (error) {
    console.error("Error approving products:", error);
    res
      .status(500)
      .json({ message: "An error occurred while approving the products." });
  }
});
Approverouter.delete("/delete", async (req, res) => {
  try {
    const productId = req.body.id; // Get productId from request body
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
