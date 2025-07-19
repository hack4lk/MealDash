# MealDash

A predictive application that helps food establishments forecast meal preparation quantities to ensure maximum throughput and minimize waste. The system provides intelligent meal recommendations with specific serving quantities based on input meals and dates.

## Features

- 🍽️ **Meal Quantity Prediction**: Get recommendations for how many servings of each meal to prepare
- 📅 **Date-Based Planning**: Meal recommendations consider the specific date for seasonal and demand patterns
- 🎯 **Confidence Scoring**: Optional confidence parameters for fine-tuning predictions
- 📊 **Comprehensive Analytics**: Detailed response with scores, totals, and timestamps
- ✅ **Input Validation**: Robust parameter validation and error handling
- 🚀 **RESTful API**: Clean, well-documented API endpoints

## API Server

The MealDash API server is built with Express.js and provides meal prediction services through RESTful endpoints.

### Quick Start

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start the Server**

   ```bash
   npm start
   ```

   Or for development with auto-reload:

   ```bash
   npm run dev
   ```

3. **Server will be running at**: `http://localhost:3000`

### API Endpoints

#### Health Check

- **GET** `/` - Server health check and basic information

#### API Information

- **GET** `/api/` - API documentation and available endpoints

#### Meal Prediction

- **POST** `/api/predict` - Get meal quantity recommendations
- **GET** `/api/predict` - Endpoint documentation and examples

### API Usage

#### Predict Meal Quantities

**Endpoint**: `POST /api/predict`

**Required Parameters**:

- `meals` (string|array): Meal name(s) to get predictions for
- `date` (string): Date in YYYY-MM-DD format

**Optional Parameters**:

- `confidence` (number): Confidence level for predictions (0.0-1.0)

**Example Request**:

```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "meals": ["pasta", "salad", "soup"],
    "date": "2025-07-19",
    "confidence": 0.9
  }'
```

**Example Response**:

```json
{
  "success": true,
  "data": {
    "inputMeals": ["pasta", "salad", "soup"],
    "date": "2025-07-19",
    "confidence": 0.9,
    "recommendations": {
      "meals": [
        {
          "name": "pasta",
          "quantity": 8,
          "unit": "servings"
        },
        {
          "name": "salad",
          "quantity": 6,
          "unit": "servings"
        },
        {
          "name": "soup",
          "quantity": 4,
          "unit": "servings"
        },
        {
          "name": "grilled chicken",
          "quantity": 5,
          "unit": "servings"
        }
      ],
      "totalServings": 23,
      "score": 87.3,
      "message": "Based on your meal preferences and date, here are our recommended meals with quantities!",
      "timestamp": "2025-07-19T15:30:45.123Z"
    }
  }
}
```

### Response Structure

The API returns structured data including:

- **inputMeals**: Original meals requested
- **date**: Date for the prediction
- **confidence**: Confidence level used
- **recommendations**:
  - `meals`: Array of meal objects with name, quantity, and unit
  - `totalServings`: Sum of all recommended servings
  - `score`: Prediction confidence score (0-100)
  - `message`: Human-readable description
  - `timestamp`: When the prediction was generated

### Error Handling

The API provides detailed error messages for:

- Missing required parameters
- Invalid date formats
- Invalid date values
- Server errors

**Error Response Example**:

```json
{
  "error": "Missing required parameter",
  "message": "meals parameter is required"
}
```

## Project Structure

```
MealDash/
├── README.md
└── server/
    ├── package.json
    ├── index.js          # Main server file
    ├── .env              # Environment configuration
    └── routes/
        └── api.js        # API routes and logic
```

## Environment Variables

Create a `.env` file in the server directory:

```env
PORT=3000
NODE_ENV=development
```

## Dependencies

- **express**: Web framework for Node.js
- **cors**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable loader
- **nodemon**: Development auto-reload (dev dependency)

## Development

The server includes:

- Comprehensive input validation
- Error handling middleware
- CORS support for web applications
- Development-friendly logging
- Mock prediction algorithm (ready for ML integration)

## Future Enhancements

- Machine learning integration for actual predictions
- Historical data analysis
- Seasonal demand patterns
- Integration with inventory management
- Real-time demand monitoring
- User authentication and analytics
