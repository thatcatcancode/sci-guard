from fastapi import APIRouter, UploadFile, File
from services.scanner import process_file

router = APIRouter()

@router.post("/analyze-paper")
async def analyze_paper(file: UploadFile = File(...)):
    return process_file(file)
