
# Meal Forecast LLM Project

## 🔧 Setup
1. Install dependencies:
   - Python: `pip install -r requirements.txt`
   - Node: `npm install express`

2. Add your OpenAI API key and Python path to the `.env` file.

3. Place your CSV dataset at: `data/order_history_kaggle_data.csv`

## 🚀 Run
Start the API server:
```
node api/index.js
```

POST to `/forecast` to trigger forecast and vector index generation.

## 📂 Output
- `data/meal_forecast_per_meal.csv`
- `data/meal_forecast_lookup.csv`
- `data/meal_forecast_index.faiss`
