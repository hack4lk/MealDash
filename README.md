# MealDash 🍽️

**Intelligent Meal Forecasting for Food Service Excellence**

MealDash is a comprehensive predictive application that empowers food establishments to forecast meal preparation quantities with precision, ensuring maximum throughput while minimizing waste. By combining intelligent algorithms with user-friendly interfaces, MealDash transforms how restaurants, cafeterias, and food service operations plan their daily meal production.

## 🌟 Overview

MealDash addresses a critical challenge in the food service industry: **how many servings of each meal should be prepared on any given day?** Our solution provides data-driven recommendations that help establishments:

- 📈 **Maximize Efficiency** - Prepare the right quantities to meet demand
- 🗑️ **Minimize Waste** - Reduce food waste and associated costs
- 💰 **Optimize Resources** - Better allocation of ingredients and staff time
- 📊 **Improve Planning** - Make informed decisions based on predictive analytics

## 🏗️ Architecture

MealDash is built as a full-stack application with a clean separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                     MealDash System                        │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React + TypeScript)                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Meal Input  │  │ Date Picker │  │ Results     │        │
│  │ Interface   │  │ Component   │  │ Dashboard   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  API Layer (Express.js)                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Input       │  │ Prediction  │  │ Response    │        │
│  │ Validation  │  │ Engine      │  │ Formatter   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  Core Logic                                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Meal Quantity Prediction Algorithm                  │   │
│  │ • Seasonal adjustments                             │   │
│  │ • Demand pattern analysis                          │   │
│  │ • Complementary meal suggestions                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 How It Works

### 1. **Input Collection**

- Users specify meals they want predictions for
- Select the date for meal preparation
- Optionally set confidence levels for fine-tuning

### 2. **Intelligent Processing**

- Validates input parameters (meal types, date format)
- Analyzes seasonal patterns and demand trends
- Applies prediction algorithms to generate recommendations

### 3. **Smart Recommendations**

- Returns specific serving quantities for each meal
- Suggests complementary meals based on input
- Provides confidence scores and total serving counts
- Includes actionable insights for meal planning

### 4. **Results Delivery**

- Structured JSON response with detailed recommendations
- Visual dashboard displaying meal quantities
- Historical tracking for pattern analysis

## 🚀 Quick Start Guide

### Prerequisites

- **Node.js** (v20 or higher)
- **npm** or **yarn**
- **Python** (v3 or higher)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd MealDash
   ```

2. **Place the environment variables on .env file**
  
  ```
  OPENAI_API_KEY=YOURKEY
  PYTHON_PATH=PATH_TO_YOUR_PYTHON_EXEC

  ```

2. **Set up the Backend API**

   ```bash
   cd server
   npm install
   node server/api/server.js
   ```

   Server runs on: `http://localhost:3001`

3. **Set up the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

### Basic Usage

1. **Open the MealDash application** in your browser
2. **Enter meal items** you want predictions for (e.g., "pasta", "salad")
3. **Select the preparation date** using the date picker
4. **Set confidence level** (optional, defaults to 0.8)
5. **Get predictions** - receive detailed serving recommendations

## 🎯 Example Workflow

```json
Input:
{
  "meals": ["pasta", "chicken salad", "vegetable soup"],
  "date": "2025-07-19",
  "query": ""
}

Output:
{
    "predictions": [
        {
            "Date": "2025-02-05",
            "Item": "Animal Fries",
            "Orders": 5
        },
        {
            "Date": "2025-02-05",
            "Item": "Angara Paneer Melt",
            "Orders": 3
        }
    ],
    "confidence_level": 90
}
```

## 📁 Project Structure

```
MealDash/
├── README.md                    # Main documentation (this file)
├── .gitignore                   # Git ignore rules
│
├── frontend/                    # React application
│   ├── README.md               # Frontend-specific documentation
│   ├── package.json            # Frontend dependencies
│   ├── src/
│   │   ├── App.tsx            # Main React component
│   │   ├── main.tsx           # Application entry point
│   │   └── components/        # Reusable UI components
│   ├── public/                # Static assets
│   └── .env                   # Environment configuration
│
└── server/                     # Express.js API server
    ├── README.md               # Backend-specific documentation
    ├── package.json            # Backend dependencies
    ├── api/                    # Server entry point
    ├── data/                   # Data files
    ├── python/                 # Python scripts
    ├── routes/
    │   └── forecastRoutes.js   # API route definitions
    └── .env                    # Environment configuration
```


## 📁 Data Set Used

- **Kaggle Data Set**: Used real data kaggle data set for prediction

## 📁 Prediction Algorythm

- **SARIMAX**: Used for prediction calculation using python and attached to a faiss vector db

## 🔧 Components

### Frontend Application

- **Technology**: React 19 + TypeScript + Vite
- **Purpose**: User interface for meal input and results display
- **Features**: Responsive design, real-time validation, intuitive UX
- **Port**: 5173 (development)

### Backend API Server

- **Technology**: Express.js + Node.js
- **Purpose**: RESTful API for meal predictions
- **Features**: Input validation, prediction algorithms, error handling
- **Port**: 3000

### Core Prediction Engine

- **Algorithm**: Intelligent meal quantity forecasting
- **Capabilities**:
  - Seasonal demand adjustments
  - Complementary meal suggestions
  - Confidence-based recommendations
  - Historical pattern analysis
- **SARIMAX**: Used for prediction calculation using python and attached to a faiss vector db
- **OPENAI API**: Used for RAG functionalities

## 🌐 API Endpoints

| Method | Endpoint       | Description                         |
| ------ | -------------- | ----------------------------------- |
| `GET`  | `/`            | Health check and server status      |
| `POST`  | `/ask`        | Gets prediction data                |
| `POST`  | `/forecast`   | Endpoint that generates the forecast|

### API Request Format

```bash
curl -X POST http://localhost:3001/ask \
  -H "Content-Type: application/json" \
  -d '{
    "item_lines": "dish1,dish2",
    "date": "2025-07-19",
    "query": ""
  }'
```

## 🎨 Key Features

### ✅ **Intelligent Predictions**

- Advanced algorithms for accurate quantity forecasting
- Seasonal and temporal pattern recognition
- Complementary meal suggestions

### ✅ **User-Friendly Interface**

- Intuitive React-based frontend
- Real-time input validation
- Responsive design for all devices

### ✅ **Robust API**

- RESTful architecture
- Comprehensive error handling
- Detailed response formatting

### ✅ **Flexible Input**

- Support for multiple meal types
- Date-based planning

### ✅ **Actionable Output**

- Specific serving quantities
- Total preparation counts
- Confidence scores and insights

## 🔮 Future Enhancements

### Phase 1: Enhanced Analytics

- 📊 Historical data visualization
- 📈 Trend analysis dashboard
- 🎯 Accuracy tracking metrics

### Phase 2: Advanced Intelligence

- 📅 Multi-day planning capabilities
- 🔄 Real-time demand adjustments

### Phase 3: Enterprise Features

- 👥 Multi-location support
- 🔐 User authentication system
- 📱 Mobile application
- 🔗 POS system integration

## 🤝 Contributing

We welcome contributions to make MealDash even better! Please see individual component READMEs for specific development guidelines:

- [Frontend Development Guide](./frontend/README.md)
- [Backend Development Guide](./server/README.md)

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions, issues, or feature requests:

- Check component-specific README files
- Review API documentation
- Test with provided examples

## 📄 License

This project is available under the terms specified in the LICENSE file.

---

**MealDash** - _Transforming food service through intelligent meal forecasting_ 🍽️✨