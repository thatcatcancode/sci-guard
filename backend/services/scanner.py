from fastapi.responses import JSONResponse
from typing import List, Optional
from schemas import FlaggedResult
import uuid
from utils.extractor import extract_text
import nltk
nltk.download("punkt")
nltk.download('punkt_tab')
from nltk.tokenize import sent_tokenize, word_tokenize
from services.rewriter import rewrite_sentence

def highlight_word_in_sentence(sentence: str, word: str) -> str:
    """
    Highlights a word in a sentence by wrapping it in a span tag.
    """
    # Create a case-insensitive regex pattern
    import re
    pattern = re.compile(re.escape(word), re.IGNORECASE)
    # Replace the word with a highlighted version
    highlighted = pattern.sub(
        lambda match: f'<span class="highlight">{match.group(0)}</span>',
        sentence
    )
    return highlighted

def sentence_has_banned_word(sentence: str, banned_words: List[str], original_result: Optional[FlaggedResult]) -> Optional[FlaggedResult]:
    for word in word_tokenize(sentence):
        for banned_word in banned_words:
            if banned_word.lower() in word.lower():
                return FlaggedResult(
                    id=original_result.id if original_result else str(uuid.uuid4()),
                    banned_word=banned_word,
                    word=word,
                    sentence=original_result.sentence if original_result else sentence,
                    highlighted_sentence=original_result.highlighted_sentence if original_result else highlight_word_in_sentence(sentence, word),
                )
    return None

def process_file(file, banned_words) -> List[FlaggedResult]:
    print("Processing file...")
    text = extract_text(file)
    if not text:
        return JSONResponse(status_code=400, content={"error": "File unreadable or empty"})

    sentences = sent_tokenize(text)
    flagged = []
    for sentence in sentences:
        flagged_result = sentence_has_banned_word(sentence, banned_words, None)
        if flagged_result:
            highlighted_sentence = highlight_word_in_sentence(sentence, flagged_result.word)
            flagged.append(FlaggedResult(
                id=flagged_result.id,
                banned_word=flagged_result.banned_word,
                word=flagged_result.word,
                sentence=sentence,
                highlighted_sentence=highlighted_sentence
            ))
    return flagged


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
