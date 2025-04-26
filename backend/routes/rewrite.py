from fastapi import APIRouter
from schemas import FlaggedResult
from services.rewriter import rewrite_sentence

router = APIRouter()

@router.post("/sentence/rewrite")
async def rewrite(result: FlaggedResult):
    rewritten_result = rewrite_sentence(result)
    return rewritten_result

# @router.post("/sentences/rewrite")
# async def rewrite_all(sentences: list[str], word: str, banned_word: str):
#     return [rewrite_sentence(sentence, word, banned_word) for sentence in sentences]