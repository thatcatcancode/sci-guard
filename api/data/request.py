import requests

with open("mock-article.txt", "rb") as f:
    files = {"file": ("./mock-article.txt", f, "text/plain")}
    response = requests.post("http://localhost:8000/analyze-paper", files=files)

print(response.json())