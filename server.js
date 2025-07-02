// Import core dependencies
const express = require('express');        // Express framework for building web APIs
const cors = require('cors');              // Middleware to enable Cross-Origin Resource Sharing
const paragraphRoutes = require('./routes/paragraphRoutes'); // Import route definitions
require('dotenv').config();                // Load environment variables from .env file

const app = express(); // Initialize the Express app

// Ensure the required API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY is not defined in .env file.');
  process.exit(1); // Exit the application if the key is missing
}

// === Middlewares ===
app.use(cors());            // Allow requests from any origin (useful for frontend integration)
app.use(express.json());    // Automatically parse incoming JSON payloads

// === API Routes ===
// All requests to /api/paragraph will be handled by the paragraphRoutes router
app.use('/api/paragraph', paragraphRoutes);

// === Start the Server ===
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
