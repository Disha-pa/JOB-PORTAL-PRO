// app.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Static folder for serving HTML and CSS files
app.use(express.static(path.join(__dirname, 'public')));

// Setting up file upload with Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Directory to save uploaded resumes
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

const upload = multer({ storage: storage });

// Endpoint for handling form submissions
app.post('/submit', upload.single('resume'), (req, res) => {
  const { name, email, jobPosition } = req.body;
  const resumePath = req.file?.path;  

  if (!name || !email || !jobPosition || !resumePath) {
    return res.status(400).send('All fields are required.');
  }

  // Example of processing the application data (e.g., save it to a database)
  console.log('Application Received:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Job Position: ${jobPosition}`);
  console.log(`Resume Path: ${resumePath}`);

  res.send('Application submitted successfully!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});