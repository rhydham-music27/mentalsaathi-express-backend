export const profileUploadController = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploaded = req.file;

    return res.status(201).json({
      message: "Uploaded!",
      file: {
        url: uploaded.path, // Cloudinary-hosted URL
        originalName: uploaded.originalname,
        mime: uploaded.mimetype,
        size: uploaded.size
      }
    });

  } catch (error) {
    console.error("Upload Error:", error.stack || error);
    return res.status(500).json({
      message: "Upload failed on server",
      error: error.message
    });
  }
};
