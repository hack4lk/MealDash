
# Meal Forecast LLM Project

## 🔧 Setup
0. Requirements:
   - Node JS > 18
   - Python 3

1. Install dependencies:
   - Python: `pip install -r requirements.txt`
   - Node: `npm install express`

2. Add your OpenAI API key and Python path to the `.env` file.

OPENAI_API_KEY=YOURKEY
PYTHON_PATH=PATH_TO_YOUR_PYTHON_EXEC

3. Place your CSV dataset at: `data/order_history_kaggle_data.csv`

## 🚀 Run
Start the API server:

Inside server folder.

```
node api/server.js
```

POST to `/forecast` to trigger forecast and vector index generation.

POST to `/ask` to get prediction based on date

## 📂 Output
- `data/meal_forecast_per_meal.csv`
- `data/meal_forecast_lookup.csv`
- `data/meal_forecast_index.faiss`
