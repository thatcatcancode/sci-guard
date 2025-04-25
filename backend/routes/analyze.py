from fastapi import APIRouter, UploadFile, File
from services.scanner import process_file
from data.banned_words_nih import get_nih_banned_words

router = APIRouter()

@router.post("/analyze-paper")
async def analyze_paper(file: UploadFile = File(...)):
    banned_words = get_nih_banned_words()
    return process_file(file, banned_words)
