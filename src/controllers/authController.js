const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { signUpSchema, loginSchema } = require('../validators/joiValidator')

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, favorite_food } = req.body;

    await signUpSchema.validateAsync({ username, email, password, favorite_food });

    const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const errorMessage = existingUser.username === username ? 'Username already exists' :
        existingUser.email === email ? 'Email already exists' : 'Phone number already exists';
      return res.status(400).send({ message: errorMessage });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user record with the given data
    const newUser = await userModel.create({ username, email, password: hashedPassword, favorite_food });

    return res.status(201).send({ message: 'Sign Up Successful', userDetails: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });
    if (error) {
      return res.status(400).send({ status: false, message: error.details[0].message });
    }

    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      return res.status(401).send({ status: false, message: "Invalid credentials" });
    }

    const cmprPassword = await bcrypt.compare(password, foundUser.password);
    if (!cmprPassword) {
      return res.status(401).send({ status: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: foundUser._id }, 'groot', { expiresIn: '48h' });
    return res.status(200).send({
      status: true,
      message: "User login successful",
      data: { userId: foundUser._id, token },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: "Internal server error" });
  }
};


exports.resetPassword = async (req, res) => {
  const { newPassword, newPasswordRepeat, favorite_food } = req.body;
  const { userId } = req.params;

  try {
    // Fetch the user from the database by user ID
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ status: false, message: "User not found." });
    }
    // Check if the user's favorite food matches the one in the request body
    if (user.favorite_food !== favorite_food) {
      return res.status(400).send({ status: false, message: "Security wrong inputs please correct it if you are a valid user." });
    }

    // Check if both passwords match
    if (newPassword !== newPasswordRepeat) {
      return res.status(400).send({ status: false, message: "New password and password repeat do not match." });
    }

    // Update the user's password in the database
    user.password = newPassword;
    await user.save();

    res.status(200).send({ status: true, message: "Password updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: false, message: err.message });
  }
};
