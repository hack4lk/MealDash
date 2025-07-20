
import sys
from retrieval import ask_llm_with_context

if __name__ == "__main__":
    query = sys.argv[1]
    list_of_meals = sys.argv[2] if len(sys.argv) > 2 else None
    date = sys.argv[3] if len(sys.argv) > 3 else None
    print(ask_llm_with_context(query, list_of_meals, date))
