const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

   const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET
);

res.json({
  success: true,
  token,
});
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
      userId: user._id,
      userName: user.name,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = { registerUser, loginUser };