import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  refundAmount: { type: Number, default: 0 },

  rentDate: { type: String, required: true },
  returnDate: { type: String, required: true },

  status: {
    type: String,
    default: "pending",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;
