const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  chatFeature: {
    type: String,
    required: true,
  },
  helpfulFeatures: {
    type: [String],
    required: true,
  },
  suggestions: {
    type: String,
    required: true,
  },
  recommendation: {
    type: Number,
    required: true,
    min: 0, // Adjust range if needed (e.g., 0–10 scale)
    max: 10
  },
  email: {
    type: String,
    required: false,
    match: /.+\@.+\..+/, // Basic email pattern
  }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
