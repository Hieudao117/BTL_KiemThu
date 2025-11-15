import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100, 
  },
  expirationDate: {
    type: Date, 
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true, 
  },
}, { timestamps: true });

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

export default PromoCode;