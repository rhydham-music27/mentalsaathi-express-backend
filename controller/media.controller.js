export const profileUploadController = (req, res) => {
  try {
    console.log("REQ.FILE:", req.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { path, filename } = req.file;
    return res.status(201).json({
      message: "Uploaded!",
      file: {
        url: path,
        public_id: filename
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
