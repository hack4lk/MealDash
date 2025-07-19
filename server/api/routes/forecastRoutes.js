const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecastController');

router.post('/forecast', forecastController.generateForecast);
router.post('/ask', forecastController.askForecast);
router.get('/', (req, res) => {
  res.json({
    message: 'MealDash API',
    version: '1.0.0',
    endpoints: [
      {
        path: '/forecast',
        method: 'POST',
        description: 'Generate forecast for meals based on base data',
        requiredQueryParams: ['days']
      },
      {
        path: '/ask',
        method: 'POST',
        description: 'Generate forecast data based on list of meals and date',
        requiredBodyParams: ['date',"item_lines","query"]
      }
    ]
  });
});
module.exports = router;
