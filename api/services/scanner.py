from fastapi.responses import JSONResponse
from utils.extractor import extract_text
import nltk
nltk.download("punkt")
nltk.download('punkt_tab')
from nltk.tokenize import sent_tokenize

banned_words = {"manipulate", "guarantee", "prove"}

def process_file(file):
    print("Processing file...")
    text = extract_text(file)
    if not text:
        return JSONResponse(status_code=400, content={"error": "File unreadable or empty"})

    sentences = sent_tokenize(text)
    flagged = []
    for sentence in sentences:
        for word in banned_words:
            if word.lower() in sentence.lower():
                flagged.append({
                    "banned": word,
                    "sentence": sentence,
                    "suggestion": f"[Suggestion for]: {sentence}"
                })
    return {"results": flagged}
