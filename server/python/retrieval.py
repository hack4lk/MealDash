
import faiss
import numpy as np
import pandas as pd
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def embed_query(text):
    return client.embeddings.create(input=text, model="text-embedding-3-small").data[0].embedding

def search_similar_meals(query_text,date_text,k=5):
    recs = []
    for item in query_text.split(","):
        item = item.strip()
        if not item:
            continue
        item_text = f"{date_text}: {item}"
        vector = np.array(embed_query(item_text)).astype("float32").reshape(1, -1)
        index = faiss.read_index("data/meal_forecast_index.faiss")
        dist, indices = index.search(vector, k)
        df = pd.read_csv("data/meal_forecast_lookup.csv")
        res = df.iloc[indices[0]].to_dict(orient="records")
        recs = recs + res
    return recs

def ask_llm_with_context(query, list_of_meals, date_text):
    context_entries = search_similar_meals(list_of_meals, date_text, 5)
    context_text = "\n".join([entry["text"] for entry in context_entries])
    prompt = f"Context:\n{context_text}\n\nUser Question: {query}\n\nAnswer:"
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            { "role": "system", "content": "You are a helpful assistant for meal forecast inquiries." },
            { "role": "user", "content": prompt }
        ]
    )
    return response.choices[0].message.content



