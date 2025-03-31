import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Ensure correct path

const router = express.Router();

// REGISTER Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, designation, contactNumber, publishedPapers } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      designation,
      contactNumber,
      publishedPapers
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
