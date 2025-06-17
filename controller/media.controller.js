export const profileUploadController = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    return res.status(201).json({
      message: "Profile picture uploaded successfully",
      file: {
        url: req.file.path,          // Cloudinary-hosted image URL
        public_id: req.file.filename // Cloudinary public ID
      }
    });

  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({
      message: "Internal server error during file upload",
      error: error.message || error
    });
  }
};
