
import pandas as pd
import numpy as np
import faiss
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

forecast_df = pd.read_csv("data/meal_forecast_per_meal.csv")
forecast_df['text'] = forecast_df.apply(lambda row: f"{row['date']}: Predicted {row['num_orders']} orders of {row['meal']}", axis=1)

texts = forecast_df['text'].tolist()
embeddings = [
    client.embeddings.create(input=text, model="text-embedding-ada-002").data[0].embedding
    for text in texts
]

vectors = np.array(embeddings).astype("float32")
index = faiss.IndexFlatL2(vectors.shape[1])
index.add(vectors)

faiss.write_index(index, "data/meal_forecast_index.faiss")
forecast_df[['date', 'meal', 'num_orders', 'text']].to_csv("data/meal_forecast_lookup.csv", index=False)
