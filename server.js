import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from "./src/IJMTM Backend/config/db.js";
import authRoutes from './src/IJMTM Backend/routes/auth.js'; // Add `.js` to the import
import Reviewer from "./src/IJMTM Backend/models/Reviewer.js"; // Import the Reviewer model

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

// Routes
app.use('/api/auth', authRoutes); // Authentication routes

// Reviewer Registration - GET method to store form data
app.get('/api/reviewers/register', async (req, res) => {
    try {
        const { name, contactNumber, email, designation, publishedPapers } = req.query;

        if (!name || !contactNumber || !email || !designation || !publishedPapers) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if reviewer already exists
        const existingReviewer = await Reviewer.findOne({ email });
        if (existingReviewer) {
            return res.status(400).json({ message: "Reviewer already registered" });
        }

        // Create new reviewer
        const newReviewer = new Reviewer({
            name,
            contactNumber,
            email,
            designation,
            publishedPapers,
        });

        await newReviewer.save();
        res.status(201).json({ message: "Reviewer registered successfully", reviewer: newReviewer });
    } catch (error) {
        console.error("Error registering reviewer:", error);
        res.status(500).json({ message: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
