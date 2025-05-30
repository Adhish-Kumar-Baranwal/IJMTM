//server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import { MongoClient, ObjectId } from "mongodb";
import { Readable } from "stream";
import cors from "cors";
import jwt from "jsonwebtoken";

// Custom imports
import connectDB from "./src/IJMTM Backend/config/db.js";
import authRoutes from "./src/IJMTM Backend/routes/auth.js";
import researchPaperRoutes from "./src/IJMTM Backend/routes/researchPaper.js";
import reviewRoutes from "./src/IJMTM Backend/routes/review.js";
import reviewerRoutes from "./src/IJMTM Backend/routes/reviewer.js";
import Reviewer from "./src/IJMTM Backend/models/Reviewer.js";
import User from "./src/IJMTM Backend/models/User.js";
import Submission from "./src/IJMTM Backend/models/Submission.js";

// Middleware for Role-Based Access Control
const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (!user || (allowedRoles.length && !allowedRoles.includes(user.role))) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fw9vjsxr-5173.inc1.devtunnels.ms",
      "https://t4hxj7p8-5173.inc1.devtunnels.ms",
    ],
    credentials: true,
  })
);

const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);
let bucket;

// Connect and create GridFSBucket
client
  .connect()
  .then(() => {
    const db = client.db();
    bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "uploads",
    });
    console.log("✅ GridFSBucket initialized");
  })
  .catch(console.error);

// Multer config
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed!"));
    }
    cb(null, true);
  },
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/research-paper", researchPaperRoutes);
app.use("/api/review", authMiddleware(["Reviewer", "Admin"]), reviewRoutes);
// app.use("/api/reviewer", authMiddleware(["Admin"]), reviewerRoutes);
app.post("/api/reviewer/apply", async (req, res) => {
  try {
    const reviewerData = {
      ...req.body,
      appliedDate: new Date(), // Add the current timestamp
    };

    const reviewer = new Reviewer(reviewerData);
    await reviewer.save();

    res.status(201).json({ message: "Reviewer application submitted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//applied reviewers route
app.use("/api", reviewerRoutes); // NOT /api/reviewers-applied

app.post(
  "/api/upload-paper",
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { title, domain, noAuthors,keywords, authorId, authors, documentType, abstract } =
        req.body;
      const fileStream = Readable.from(req.file.buffer);
      const filename = `${Date.now()}-${req.file.originalname}`;

      const uploadStream = bucket.openUploadStream(filename, {
        contentType: "application/pdf",
      });

      fileStream
        .pipe(uploadStream)
        .on("error", (error) => {
          console.error("Upload error:", error);
          res.status(500).json({ message: "File upload failed" });
        })
        .on("finish", async () => {
          // Validate and parse noAuthors
          let numAuthors = parseInt(noAuthors, 10);
          if (isNaN(numAuthors)) {
            return res.status(400).json({ message: "Invalid number of authors" });
          }

          let parsedAuthors;
          try {
            parsedAuthors = JSON.parse(authors);
            if (!Array.isArray(parsedAuthors)) throw new Error();
          } catch {
            return res.status(400).json({ message: "Invalid authors format" });
          }

          const doc = new Submission({
            title,
            domain,
            keywords,
            noAuthors: numAuthors,
            authorId,
            authors: parsedAuthors,
            documentType,
            abstract,
            pdfFileId: uploadStream.id,
            submissionDate: new Date(),
          });

          await doc.save();

          res.status(201).json({
            message: "Submission successful",
            fileId: uploadStream.id,
          });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);
//submission route
app.get("/api/recent-submissions", async (req, res) => {
  try {
    const submissions = await Submission.find({ status: "Submitted" })
      .sort({ submissionDate: -1 })
      .limit(5);

    if (submissions.length === 0) {
      return res
        .status(404)
        .json({ message: "No submitted submissions found" });
    }

    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching recent submissions:", err);
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
});

// View PDF File
app.get("/api/papers/:id", async (req, res) => {
  try {
    const fileId = new ObjectId(req.params.id);
    const downloadStream = bucket.openDownloadStream(fileId);
    res.set("Content-Type", "application/pdf");
    downloadStream.pipe(res);
  } catch (err) {
    res.status(404).json({ message: "File not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
