import express from "express";
import mongoose from "mongoose";
import postModel from "../models/rateModel.js";

const router = express.Router();

router.post('/:postId/rate', async (req, res) => {
  const { postId } = req.params;
  const { userId, rating } = req.body;

  // Validate postId format
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: 'Invalid postId format' });
  }

  // Validate rating value
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    // Find the post by ID
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user has already rated
    const existingRatingIndex = post.ratings.findIndex(r => r.userId.toString() === userId);

    if (existingRatingIndex !== -1) {
      // Update the existing rating
      post.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add a new rating
      post.ratings.push({ userId, rating });
    }

    // Recalculate the average rating
    const total = post.ratings.reduce((sum, r) => sum + r.rating, 0);
    post.averageRating = total / post.ratings.length;

    // Save the updated post
    await post.save();

    res.json({ newAverage: post.averageRating });
  } catch (error) {
    console.error("Error occurred while processing the rating:", error);
    res.status(500).json({ error: 'Failed to update rating', details: error.message });
  }
});

export default router;
