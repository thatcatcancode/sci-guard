from fastapi.responses import JSONResponse
from utils.extractor import extract_text
import nltk
nltk.download("punkt")
nltk.download('punkt_tab')
from nltk.tokenize import sent_tokenize
from services.rewriter import rewrite_sentence

def process_file(file, banned_words):
    print("Processing file...")
    text = extract_text(file)
    if not text:
        return JSONResponse(status_code=400, content={"error": "File unreadable or empty"})

    sentences = sent_tokenize(text)
    flagged = []
    for sentence in sentences:
        for word in banned_words:
            print('word', word)
            if word.lower() in sentence.lower():
                print('found!', word)
                suggestion = rewrite_sentence(sentence, word)
                flagged.append({
                    "banned": word,
                    "sentence": sentence,
                    "suggestion": suggestion,
                })
    return {"results": flagged}


# TODO Use spaCy instead of nltk
# import spacy
# from spacy.matcher import PhraseMatcher

# banned_words = ["destroy", "obliterate", "dominate"]
# nlp = spacy.load("en_core_web_sm")
# matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
# patterns = [nlp.make_doc(word) for word in banned_words]
# matcher.add("BANNED", patterns)

# doc = nlp("This groundbreaking study obliterates previous research.")
# matches = matcher(doc)

# for match_id, start, end in matches:
#     print("Matched:", doc[start:end].text)
