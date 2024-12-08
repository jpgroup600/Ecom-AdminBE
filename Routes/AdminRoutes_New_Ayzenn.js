const router = require("express").Router();
const {
  GetAllListFunction,
} = require("../Controllers/AdminControllers_Ayzenn/GetAllListFunction");
const {
  GetAllProductsFunction,
} = require("../Controllers/AdminControllers_Ayzenn/GetAllProductsFunction");
const {
  UserJoinedFunction,
} = require("../Controllers/AdminControllers_Ayzenn/UserJoinedFunction");
const {
  ApproveProductFunction,
} = require("../Controllers/AdminControllers_Ayzenn/ApproveProductFunction");
const {
  DeleteProductFunction,
} = require("../Controllers/AdminControllers_Ayzenn/DeleteProductFunction");
const {
  GetAllMerchantsFunction,
} = require("../Controllers/AdminControllers_Ayzenn/GetAllMErchants");
const {
  GetAllUsersFunction,
} = require("../Controllers/AdminControllers_Ayzenn/GetAllUsers");
const {
  GetAllProductsAddedDate,
} = require("../Controllers/AdminControllers_Ayzenn/GetAllProductsAddedDate");
const {
  Signup,
  Login,
} = require("../Controllers/AdminControllers_Ayzenn/AdminAutController");

const {
  GetAllMerchantsPage,
} = require("../Controllers/AdminControllers_Ayzenn/GetAllMerchantsPage");

const Banners = require("../Models/Banners");
router.get("/GetAllList", GetAllListFunction);
router.get("/allBanners/", async (req, res) => {
  try {
    // Fetch all banners, ensuring that you do not try to filter by _id by mistake.
    const banners = await Banners.find().select("-__v"); // Only select 'url' field

    if (!banners) {
      return res.status(404).json({ message: "No banners found" });
    }

    // Respond with the fetched banners
    res.status(200).json({ images: banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res
      .status(500)
      .json({ message: "Error fetching banners", error: error.message });
  }
});
router.post("/delImg", async (req, res) => {
  try {
    const { id } = req.body; // Correct destructuring from req.body

    // Attempt to delete the banner with the provided id
    const deletedBanner = await Banners.findOneAndDelete({ _id: id });

    // If no banner was deleted, return a 404 error
    if (!deletedBanner) {
      return res.status(201).json({ message: "Banner not found" });
    }

    // Respond with a success message
    res
      .status(200)
      .json({ message: "Banner deleted successfully", deletedBanner });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res
      .status(500)
      .json({ message: "Error deleting banner", error: error.message });
  }
});
router.get("/UserJoinedList", UserJoinedFunction);
router.get("/GetAllProducts", GetAllProductsFunction);
router.post("/ApproveProduct", ApproveProductFunction); //already builded by sir tahir
router.delete("/DeleteProduct", DeleteProductFunction); //already builded by sir tahir
router.get("/GetAllMerchants", GetAllMerchantsFunction);
router.get("/GetAllUsers", GetAllUsersFunction);
router.get("/GetAllProductsDate", GetAllProductsAddedDate);
router.post("/signup", Signup);
router.post("/login", Login);
router.get("get-all-merchants", GetAllMerchantsPage); // get all merchants with no pagination
module.exports = router;
