//routes auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ensure correct path
import Reviewer from "../models/Reviewer.js";

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

    // 1️⃣ Check for Admin login
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ userId: "admin", role: "Admin" }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).json({
        token,
        user: {
         
          name: "Admin",
          email,
          role: "Admin",
        },
      });
    }

    // 2️⃣ Check for Reviewer login (loop over 4 reviewers)
    for (let i = 1; i <= 4; i++) {
      if (
        email === process.env[`REVIEWER${i}_EMAIL`] &&
        password === process.env[`REVIEWER${i}_PASSWORD`]
      ) {
        const token = jwt.sign({ userId: `reviewer${i}`, role: "Reviewer" }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(200).json({
          token,
          user: {
            name: `Reviewer ${i}`,
            email,
            role: "Reviewer",
          },
        });
      }
    }

    // 3️⃣ If not Admin or Reviewer, check as Author from DB
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
     const reviewer = await Reviewer.findOne({ email });
     
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });


    const token = jwt.sign({ userId: user._id, role: user.role, reviewer: reviewer._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    const userWithReviewer = {
  ...user.toObject(),
  reviewer: reviewer?._id || null
};
    res.status(200).json({ token, user: userWithReviewer });

  } catch (error) {
    console.error("🔥 Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});




export default router;
