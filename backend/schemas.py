from pydantic import BaseModel
from typing import Optional, List, Dict

class FlaggedResult(BaseModel):
    id: str 
    sentence: str
    word: str
    banned_word: str
    suggestion: Optional[str] = None
    highlighted_sentence: str
    
class SummaryAnalysis(BaseModel):
    total_flagged_words: int
    total_flagged_sentences: int
    banned_word_counts: Dict[str, int]  # Maps banned word to its count
    summary: Optional[str] = None
    
class AnalyzePaperResponse(BaseModel):
    results: List[FlaggedResult]
    summary: SummaryAnalysis
    
    