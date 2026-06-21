import bookingModel from "../models/bookingModel.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const {
      userId,
      userName,
      productId,
      productName,
      price,
      rentDate,
      returnDate,
    } = req.body;

    const booking = new bookingModel({
      userId,
      userName,
      productId,
      productName,
      price,
      rentDate,
      returnDate,
    });

    await booking.save();

    res.json({ success: true, message: "Booking created" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET ALL BOOKINGS 👇 THIS IS REQUIRED
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find().sort({ date: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const booking = await bookingModel.findById(id);
    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    const updateData = { status };
    if (status === "Cancelled") {
      updateData.refundAmount = Math.round(booking.price * 0.5);
    } else {
      updateData.refundAmount = 0;
    }

    await bookingModel.findByIdAndUpdate(id, updateData);

    res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await bookingModel.find({ userId });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
