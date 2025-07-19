
import pandas as pd
import numpy as np
from statsmodels.tsa.statespace.sarimax import SARIMAX
from datetime import timedelta
import sys

query = sys.argv[1] if len(sys.argv) > 1 else "7"

df = pd.read_csv("data/order_history_kaggle_data.csv")
df['order_date'] = pd.to_datetime(df['Order Placed At']).dt.date

grouped = df.groupby(['order_date', 'Item Name']).size().reset_index(name='num_orders')

forecasts = []

for meal in grouped['Item Name'].unique():
    meal_df = grouped[grouped['Item Name'] == meal].set_index('order_date').sort_index()
    if len(meal_df) < 14:
        continue

    try:
        model = SARIMAX(meal_df['num_orders'], order=(1,1,1), seasonal_order=(1,1,1,7))
        result = model.fit(disp=False)

        pred = result.get_forecast(steps=int(query))
        dates = [meal_df.index[-1] + timedelta(days=i) for i in range(1, int(query))]
        forecast_values = np.round(pred.predicted_mean).astype(int)

        for d, val in zip(dates, forecast_values):
            forecasts.append({'date': d, 'meal': meal, 'num_orders': val})
    except Exception as e:
        print(f"Error forecasting {meal}: {e}")

forecast_df = pd.DataFrame(forecasts)
forecast_df.to_csv("data/meal_forecast_per_meal.csv", index=False)
