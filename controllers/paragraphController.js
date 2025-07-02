const axios = require('axios'); // Axios is used to make HTTP requests

/**
 * Tries to generate content from the Gemini API using a specific model.
 * @param {string} modelName - The name of the Gemini model (e.g., 'gemini-1.5-pro-001')
 * @param {string} prompt - The prompt string to send to the model
 * @returns {Promise<string|null>} - The generated content or null if failed
 */
async function tryGenerateContent(modelName, prompt) {
  // Build the full API URL using the model name and API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  console.log(`🔄 Sending request to Gemini API for model: ${modelName} with prompt: "${prompt}"`);

  try {
    // Send a POST request with the prompt in the required structure
    const response = await axios.post(url, {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Attempt to extract the text content from the API response
    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (text) {
      console.log(`✅ Extracted content from ${modelName}:`, text);
      return text;
    } else {
      console.warn(`⚠️ No valid text returned by model: ${modelName}`);
      return null;
    }
  } catch (err) {
    // Catch and log any errors from Axios or the API
    console.warn(`⚠️ Axios error for model ${modelName}:`, err.response?.data || err.message);
    return null;
  }
}

/**
 * Iterates over a list of models and tries to generate content with each until one succeeds.
 * @param {Array<{name: string}>} models - List of model objects to try
 * @param {string} prompt - Prompt to send to the models
 * @returns {Promise<string|null>} - The first successfully generated content or null if all fail
 */
async function amove(models, prompt) {
  console.log('🔄 Starting content generation cycle...');
  
  // Loop through each model and attempt to generate content
  for (const model of models) {
    console.log(`🔄 Trying to generate content using model: ${model.name}`);
    const content = await tryGenerateContent(model.name, prompt);

    if (content) {
      console.log(`✅ Successfully generated content using model: ${model.name}`);
      return content; // Return the first successful result
    } else {
      console.warn(`⚠️ Model ${model.name} failed to generate content.`);
    }
  }

  return null; // If all models fail to generate content
}

/**
 * Express API handler to generate a paragraph based on a difficulty level.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getParagraph = async (req, res) => {
  const { difficulty = 'easy' } = req.query; // Get difficulty level from query params (default = easy)

  // Prompts categorized by difficulty level
  const easyPrompts = [
    "Write a short paragraph (2-3 sentences) for Pet animals.",
    "Describe a sunny day in the park.",
    "Write about your favorite food.",
    "What is your favorite ice cream?"
  ];

  const mediumPrompts = [
    "Tell me about important personalities in Pakistan.",
    "Write a story about beauty of Pakistan.",
    "Tell me about adventure places in Pakistan?"
  ];

  const hardPrompts = [
    "Write a complex paragraph on the history of artificial intelligence.",
    "Describe the process of quantum computing in detail.",
    "Write a paragraph on climate change and its global effects.",
    "Discuss the ethical implications of autonomous machines."
  ];

  // Choose a random prompt based on difficulty
  let prompt = '';
  if (difficulty === 'medium') {
    prompt = `Write a short paragraph (no more than 3 lines) on this topic: ${mediumPrompts[Math.floor(Math.random() * mediumPrompts.length)]}`;
  } else if (difficulty === 'hard') {
    prompt = `Write a concise paragraph (max 3 lines) on this topic: ${hardPrompts[Math.floor(Math.random() * hardPrompts.length)]}`;
  } else {
    prompt = `Write a very short paragraph (2-3 lines max) on this topic: ${easyPrompts[Math.floor(Math.random() * easyPrompts.length)]}`;
  }

  try {
    // List of Gemini model names to try in order of preference
    const models = [
      { name: 'gemini-1.5-pro-001' },
      { name: 'gemini-1.5-pro-002' },
      { name: 'gemini-1.5-flash' },
      { name: 'gemini-2.0-flash' },
      { name: 'gemini-2.0-flash-001' }
    ];

    console.log('🔄 Attempting to generate paragraph using models...');

    // Try generating content using the amove helper function
    const content = await amove(models, prompt);

    if (content) {
      console.log('✅ Successfully generated a paragraph.');
      return res.json({ paragraph: content }); // Return the paragraph as a JSON response
    }

    // If none of the models were able to generate valid content
    console.warn('⚠️ All model attempts failed to generate paragraph.');
    res.status(500).json({ error: '❌ All model attempts failed to generate paragraph.' });

  } catch (error) {
    // Handle any unexpected server or logic errors
    console.error('🚨 Gemini API error:', error.message);
    res.status(500).json({ error: `Failed to fetch paragraph: ${error.message}` });
  }
};
