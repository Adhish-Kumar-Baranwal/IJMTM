import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Reviewer from "../models/Reviewer.js";

dotenv.config();
const router = express.Router();

// Register Reviewer
router.post("/register", async (req, res) => {
  try {
    const { name, contact, email, designation, publishedPapers, password } = req.body;

    // Check if user already exists
    let existingReviewer = await Reviewer.findOne({ email });
    if (existingReviewer) {
      return res.status(400).json({ message: "Reviewer already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new reviewer
    const newReviewer = new Reviewer({
      name,
      contact,
      email,
      designation,
      publishedPapers,
      password: hashedPassword,
    });

    await newReviewer.save();
    res.status(201).json({ message: "Reviewer registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Reviewer Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find reviewer by email
    const reviewer = await Reviewer.findOne({ email });
    if (!reviewer) {
      return res.status(400).json({ message: "Reviewer not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, reviewer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: reviewer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
