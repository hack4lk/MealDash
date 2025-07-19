const express = require('express');
const router = express.Router();

// Validation middleware for the predict endpoint
const validatePredictParams = (req, res, next) => {
  const { meals, date } = req.body;

  // Check for required parameters
  if (!meals) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'meals parameter is required'
    });
  }

  if (!date) {
    return res.status(400).json({
      error: 'Missing required parameter',
      message: 'date parameter is required'
    });
  }

  // Basic date validation
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({
      error: 'Invalid date format',
      message: 'date parameter should be in YYYY-MM-DD format'
    });
  }

  // Validate date is a valid date
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      error: 'Invalid date',
      message: 'date parameter is not a valid date'
    });
  }

  next();
};

// POST /api/predict endpoint
router.post('/predict', validatePredictParams, (req, res) => {
  try {
    const { meals, date, confidence } = req.body;

    // Log the received parameters
    console.log('Predict endpoint called with:', {
      meals,
      date,
      confidence: confidence || 'not provided'
    });

    // Mock prediction logic - replace with your actual prediction algorithm
    const generateMealRecommendations = (inputMeals) => {
      const mealRecommendations = [];
      
      // If meals is an array, process each meal
      if (Array.isArray(inputMeals)) {
        inputMeals.forEach(meal => {
          mealRecommendations.push({
            name: meal,
            quantity: Math.floor(Math.random() * 10) + 1, // Random quantity between 1-10
            unit: 'servings'
          });
        });
      } else {
        // If meals is a string, treat it as a single meal
        mealRecommendations.push({
          name: inputMeals,
          quantity: Math.floor(Math.random() * 10) + 1,
          unit: 'servings'
        });
      }
      
      // Add some additional recommended meals based on the date/season
      const additionalMeals = [
        { name: 'vegetable soup', quantity: Math.floor(Math.random() * 3) + 1, unit: 'servings' },
        { name: 'grilled chicken', quantity: Math.floor(Math.random() * 5) + 2, unit: 'servings' },
        { name: 'rice pilaf', quantity: Math.floor(Math.random() * 4) + 3, unit: 'servings' }
      ];
      
      // Randomly add 1-2 additional meals
      const numAdditional = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numAdditional; i++) {
        mealRecommendations.push(additionalMeals[i]);
      }
      
      return mealRecommendations;
    };

    const prediction = {
      inputMeals: meals,
      date,
      confidence: confidence || 0.8, // Default confidence if not provided
      recommendations: {
        meals: generateMealRecommendations(meals),
        totalServings: 0, // Will be calculated below
        score: Math.random() * 100,
        message: 'Based on your meal preferences and date, here are our recommended meals with quantities!',
        timestamp: new Date().toISOString()
      }
    };

    // Calculate total servings
    prediction.recommendations.totalServings = prediction.recommendations.meals.reduce((total, meal) => {
      return total + meal.quantity;
    }, 0);

    res.json({
      success: true,
      data: prediction
    });

  } catch (error) {
    console.error('Error in predict endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process prediction request'
    });
  }
});

// GET /api/predict endpoint (for testing purposes)
router.get('/predict', (req, res) => {
  res.json({
    message: 'Predict endpoint is working!',
    method: 'This endpoint expects POST requests',
    requiredParams: ['meals', 'date'],
    optionalParams: ['confidence'],
    example: {
      meals: ['pasta', 'salad'],
      date: '2025-07-19',
      confidence: 0.9
    },
    sampleResponse: {
      success: true,
      data: {
        inputMeals: ['pasta', 'salad'],
        date: '2025-07-19',
        confidence: 0.9,
        recommendations: {
          meals: [
            { name: 'pasta', quantity: 4, unit: 'servings' },
            { name: 'salad', quantity: 6, unit: 'servings' },
            { name: 'vegetable soup', quantity: 2, unit: 'servings' }
          ],
          totalServings: 12,
          score: 85.7,
          message: 'Based on your meal preferences and date, here are our recommended meals with quantities!',
          timestamp: '2025-07-19T10:30:00.000Z'
        }
      }
    }
  });
});

// General API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'MealDash API',
    version: '1.0.0',
    endpoints: [
      {
        path: '/api/predict',
        method: 'POST',
        description: 'Predict meal recommendations',
        requiredParams: ['meals', 'date'],
        optionalParams: ['confidence']
      }
    ]
  });
});

module.exports = router;
