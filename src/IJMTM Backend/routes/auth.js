import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ensure correct path

const router = express.Router();

// JWT Secret from .env
const JWT_SECRET = process.env.JWT_SECRET;
//Auhtor info table
router.get("/authors", async (req, res) => {
  try {
    const authors = await User.find({ role: "Author" }).select("-password");
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch authors" });
  }
});

// REGISTER Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, designation, contactNumber, publishedPapers } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      name,
      email,
      password, 
      designation,
      contactNumber,
      publishedPapers,
    });

    await newUser.save();
    console.log("Registering user:", email, "with password:", password);
    console.log("Saved (hashed) password:", newUser.password); // should now show hashed one from schema

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


// LOGIN Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request body:", req.body);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("✅ Login successful:", user.email);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});


export default router;
