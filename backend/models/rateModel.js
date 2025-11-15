import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, required: true },
    },
  ],
  averageRating: { type: Number, default: 0 },
});

const postModel = mongoose.model('Post', postSchema);
export default postModel
