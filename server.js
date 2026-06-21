const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const path = require("path");
const cors = require("cors");
const bookingRoute = require("./routes/bookingRoute");

dotenv.config();
// console.log("TEST KEY:", process.env.CLOUDINARY_API_KEY);

const app = express();
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("Rental Jewellery Backend Running");
});
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/product", productRoute);
app.use("/api/contact", contactRoute);
app.use("/api/booking", bookingRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
