const express = require('express');
const multer = require('multer');
const Pdf = require('../models/PdfModel');
const auth = require('../middlewares/authMiddleware');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadDir = path.join(__dirname, '../UploadedPDFs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/upload', auth, upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const newPdf = new Pdf({
      fileName: req.file.originalname,
      filePath: req.file.path,
      userId: req.user.userId 
    });

    console.log('New PDF object:', newPdf);

    await newPdf.save();
    res.status(201).send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const pdfs = await Pdf.find({ userId: req.user.userId }); 
    res.json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).send('Error fetching PDFs');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) {
      return res.status(404).send('PDF not found');
    }
    if (pdf.userId.toString() !== req.user.userId) {
      res.sendFile(path.resolve(pdf.filePath));
    }

  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).send('Error fetching PDF');
  }
});


module.exports = router;