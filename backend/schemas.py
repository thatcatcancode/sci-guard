from pydantic import BaseModel
from typing import Optional, List

class FlaggedResult(BaseModel):
    id: str 
    sentence: str
    word: str
    banned_word: str
    suggestion: Optional[str] = None
    
class AnalyzePaperResponse(BaseModel):
    results: List[FlaggedResult]