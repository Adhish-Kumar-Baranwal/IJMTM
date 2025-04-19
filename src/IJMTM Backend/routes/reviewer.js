//routes //reviewer.js
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
    const {
      firstName,
      lastName,
      contact,
      email,
      designation,
      degree,
      experience,
      domain,
      institute,
      whyBeReviewer,
      password,
    } = req.body;

    const existingReviewer = await Reviewer.findOne({ email });
    if (existingReviewer) {
      return res.status(400).json({ message: "Reviewer already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newReviewer = new Reviewer({
      firstName,
      lastName,
      contact,
      email,
      designation,
      degree,
      experience,
      domain,
      institute,
      whyBeReviewer,
      password: hashedPassword,
    });

    await newReviewer.save();
    res.status(201).json({ message: "Reviewer registered successfully" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Approve Reviewer
router.patch("/approve/:id", async (req, res) => {
  try {
    const reviewer = await Reviewer.findById(req.params.id);
    if (!reviewer) return res.status(404).json({ message: "Reviewer not found" });

    reviewer.isApproved = true;
    await reviewer.save();

    res.status(200).json({ message: "Reviewer approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

//Applied 
router.get("/reviewers-applied", async (req, res) => {
  try {
    const reviewers = await Reviewer.find();
    res.json(reviewers);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});


// Reviewer Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const reviewer = await Reviewer.findOne({ email });
    if (!reviewer) return res.status(400).json({ message: "Reviewer not found" });

    const isMatch = await bcrypt.compare(password, reviewer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    if (!reviewer.isApproved) {
      return res.status(403).json({ message: "Your account has not been approved yet." });
    }

    const token = jwt.sign({ id: reviewer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// PATCH /api/approve/:id
router.patch("/approve/:id", async (req, res) => {
  try {
    const reviewer = await Reviewer.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );

    if (!reviewer) {
      return res.status(404).json({ message: "Reviewer not found" });
    }

    // Check if reviewer is already a User
    const existingUser = await User.findOne({ email: reviewer.email });
    if (existingUser) {
      return res.status(200).json({ message: "Reviewer already approved as user", reviewer });
    }

    // Create User from reviewer
    const newUser = new User({
      name: `${reviewer.firstName} ${reviewer.lastName}`,
      email: reviewer.email,
      password: reviewer.password, // assuming you're storing it in plaintext (not ideal!)
      designation: reviewer.designation,
      contactNumber: reviewer.contact,
      role: "Reviewer",
    });

    await newUser.save();

    res.status(200).json({ message: "Reviewer approved and added as user", reviewer, newUser });
  } catch (error) {
    console.error("Approval Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
