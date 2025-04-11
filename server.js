import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import { MongoClient, ObjectId } from 'mongodb';
import { Readable } from 'stream';
import connectDB from "./src/IJMTM Backend/config/db.js";
import authRoutes from './src/IJMTM Backend/routes/auth.js';
import Reviewer from "./src/IJMTM Backend/models/Reviewer.js";
import cors from 'cors';

dotenv.config();
connectDB();
const app = express();
app.use(cors({
  origin: ['http://localhost:4173', 'http://localhost:5173/'],
  credentials: true
}));


const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI);
let bucket;

// Connect and create GridFSBucket
client.connect().then(() => {
  const db = client.db();
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: 'uploads'
  });
  console.log("✅ GridFSBucket initialized");
}).catch(console.error);

// Multer config: store in memory
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // limit to 20MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are allowed!'));
    }
    cb(null, true);
  }
});

// Routes
app.use('/api/auth', authRoutes);

// Upload route
app.post('/api/upload-paper', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, noAuthors, authors, documentType, abstract } = req.body;
    const fileStream = Readable.from(req.file.buffer);
    const filename = `${Date.now()}-${req.file.originalname}`;

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: 'application/pdf'
    });

    fileStream.pipe(uploadStream)
      .on('error', (error) => {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'File upload failed' });
      })
      .on('finish', async () => {
        const db = client.db();
        const collection = db.collection('submissions');

        const doc = {
          title,
          noAuthors: parseInt(noAuthors),
          authors: JSON.parse(authors),
          documentType,
          abstract,
          pdfFileId: uploadStream.id,
          submittedAt: new Date()
        };

        await collection.insertOne(doc);

        res.status(201).json({ message: 'Submission successful', fileId: uploadStream.id });
      });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Optional: Serve PDF file
app.get('/api/papers/:id', async (req, res) => {
  try {
    const fileId = new ObjectId(req.params.id);
    const downloadStream = bucket.openDownloadStream(fileId);
    res.set('Content-Type', 'application/pdf');
    downloadStream.pipe(res);
  } catch (err) {
    res.status(404).json({ message: 'File not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
