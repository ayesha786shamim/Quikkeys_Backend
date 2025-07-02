// Import Express framework
const express = require('express');

// Create a new Express Router instance
const router = express.Router();

// Import the controller function to handle paragraph generation
const { getParagraph } = require('../controllers/paragraphController');

/**
 * GET /api/paragraph
 * 
 * This route handles requests to generate a short paragraph.
 * You can pass a query parameter `difficulty` with values 'easy', 'medium', or 'hard'.
 * 
 * Example:
 *   GET /api/paragraph?difficulty=medium
 * 
 * The controller will handle prompt selection and use Gemini API to generate a paragraph.
 */
router.get('/', getParagraph);

// Export the router so it can be used in the main app
module.exports = router;
