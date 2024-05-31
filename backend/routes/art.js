const express = require('express');
const Art = require('../models/Art');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all arts
router.get('/', async (req, res) => {
  try {
    const arts = await Art.find();
    res.json(arts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new art
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'creatorImage', maxCount: 1 }]), async (req, res) => {
  const art = new Art({
    image: req.files['image'][0].path,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    creatorName: req.body.creatorName,
    creatorImage: req.files['creatorImage'][0].path
  });

  try {
    const newArt = await art.save();
    res.status(201).json(newArt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
