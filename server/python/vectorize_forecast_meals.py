
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

print("Generating embeddings for forecast texts...")
texts = forecast_df['text'].tolist()
print(f"Number of texts to embed: {len(texts)}")
def batch_embed(texts, batch_size=100):
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i + batch_size]
        response = client.embeddings.create(
            input=batch,
            model="text-embedding-3-small"
        )
        embeddings = [d.embedding for d in response.data]
        all_embeddings.extend(embeddings)
    return all_embeddings
embeddings = batch_embed(texts)
print(len(embeddings))
vectors = np.array(embeddings).astype("float32")
index = faiss.IndexFlatL2(vectors.shape[1])
print("Indexing vectors...")
index.add(vectors)
print("Indexing complete. Number of vectors indexed:", index.ntotal)
faiss.write_index(index, "data/meal_forecast_index.faiss")
forecast_df[['date', 'meal', 'num_orders', 'text']].to_csv("data/meal_forecast_lookup.csv", index=False)
