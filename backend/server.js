const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const artRoutes = require('./routes/art');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://ayofe70:Adebayo20@cluster0.fgluhet.mongodb.net/artmarketplace';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Create 'uploads' directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(uploadDir));

app.use('/api/arts', artRoutes);

let artStatus = {}; 
let buyArtStatus = {};

app.get('/api/artStatus', (req, res) => {
  res.json(artStatus);
});

app.post('/api/artStatus', (req, res) => {
  artStatus = req.body;
  res.status(200).json({ message: 'Art status updated successfully' });
});

app.get('/api/buyArtStatus', (req, res) => {
  res.json(buyArtStatus);
});

app.post('/api/buyArtStatus', (req, res) => {
  buyArtStatus = req.body;
  res.status(200).json({ message: 'Buy art status updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
