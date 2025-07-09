const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");
const { uploadImageController } = require("../controller/uploadImageController");

// Route for uploading an image (expects a file named 'image')
router.post("/upload", auth, upload.single('image'), uploadImageController);

module.exports = router;

