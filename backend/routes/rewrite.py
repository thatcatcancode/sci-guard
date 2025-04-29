from fastapi import APIRouter
from schemas import FlaggedResult
from data.banned_words_nih import get_nih_banned_words
from services.rewriter import rewrite_sentence
from services.scanner import sentence_has_banned_word
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/sentence/rewrite")
async def rewrite(result: FlaggedResult):
    rewrite_result = rewrite_sentence(result)
    if not rewrite_result or not rewrite_result.suggestion:
        return JSONResponse(status_code=500, content={"error": "Failed to rewrite sentence"})
    
    # Check if the rewritten suggestion still contains banned words
    flagged_result = sentence_has_banned_word(rewrite_result.suggestion, get_nih_banned_words(), rewrite_result)
    if flagged_result is not None:
        print('flagged - banned word still present')
        # If banned words are still present, try to rewrite again
        return rewrite_sentence(flagged_result, [rewrite_result.banned_word, rewrite_result.word])
    
    return rewrite_result

# @router.post("/sentences/rewrite")
# async def rewrite_all(sentences: list[str], word: str, banned_word: str):
#     return [rewrite_sentence(sentence, word, banned_word) for sentence in sentences]