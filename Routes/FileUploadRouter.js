const express = require("express");
const multer = require("multer");
const Image = require("../Models/FileUpload");
const path = require("path");
const fs = require("fs");
const Banners = require("../Models/Banners");

const router = express.Router();

// Ensure the upload directory exists
const uploadDirectory = path.join(__dirname, "/uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
  },
});

// File type validation (allow only image files)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, GIF are allowed."));
  }
};

// Multer instance with storage and file validation
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Route for uploading single or multiple images
router.post("/upload", upload.array("images", 10), async (req, res) => {
  try {
    // Check if files exist in the request
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Save each image file to the database
    const uploadedImages = [];
    for (const file of req.files) {
      const newImage = new Image({
        filename: file.filename,
        path: file.path,
      });
      await newImage.save();

      const currentHost = `${req.protocol}://${req.get('host')}`;
      const imageUrl = `${currentHost}/uploads/${file.filename}`;

      uploadedImages.push(imageUrl);
    }

    // Return all uploaded image URLs in response
    res.status(201).json({
      message: "Images uploaded successfully",
      uploadedImages,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error uploading images", error: err.message });
  }
});
router.post("/save", async (req, res) => {
  try {
    const { links } = req.body;

    const bannerPromises = links.map(async (link) => {
      const newBanner = new Banners({ url: link });
      await newBanner.save(); // Save each banner asynchronously
    });

    // Wait for all banner saves to complete
    await Promise.all(bannerPromises);

    res.status(201).json({ message: "Banners saved successfully" });
  } catch (error) {
    console.error("Error saving banners:", error);
    res
      .status(500)
      .json({ message: "Error saving banners", error: error.message });
  }
});

// Route to fetch an image by its ID
router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Ensure the file exists before attempting to send it
    const filePath = path.resolve(image.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "Image file not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching image", error: err.message });
  }
});

module.exports = router;
