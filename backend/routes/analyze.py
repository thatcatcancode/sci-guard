from fastapi import APIRouter, UploadFile, File
from schemas import AnalyzePaperResponse
from services.scanner import process_file
from data.banned_words_nih import get_nih_banned_words

router = APIRouter()

@router.post("/analyze-paper", response_model=AnalyzePaperResponse)
async def analyze_paper(file: UploadFile = File(...)):
    banned_words = get_nih_banned_words()
    results = process_file(file, banned_words)
    return AnalyzePaperResponse(results=results)
