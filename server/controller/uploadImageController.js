const asyncHandler = require("express-async-handler");
const uploadImageCloudinary = require("../utils/uploadImageCloudinary");

const uploadImageController = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded", success: false });
  }
  try {
    // Upload to Cloudinary
    const result = await uploadImageCloudinary(req.file);
    return res.status(200).json({ success: true, image: result.secure_url });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = { uploadImageController }; 