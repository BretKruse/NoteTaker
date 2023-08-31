const express = require('express');
const path = require('path');
// Import and use routes
const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');
const app = express();

// creating environment variable port
const PORT = process.env.PORT || 3001;

// Use path.join to ensure correct path for files
app.use(express.static(path.join(__dirname, 'public')));

// sets up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Use imported routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//starts the server
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`); // Corrected the log message
});
