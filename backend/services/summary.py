from typing import List, Dict
from schemas import FlaggedResult, SummaryAnalysis
from collections import Counter

def summarize_results(results: List[FlaggedResult]) -> SummaryAnalysis:

    if not results:
        return SummaryAnalysis(
            total_flagged_words=0,
            total_flagged_sentences=0,
            banned_word_counts={},
            summary="No banned words were found in the document."
        )
    
    # Count occurrences of each banned word
    banned_word_counts = Counter([result.banned_word for result in results])
    
    # Calculate total unique sentences (some sentences might contain multiple banned words)
    unique_sentences = {result.sentence for result in results}
    
    return SummaryAnalysis(
        total_flagged_words=len(results),
        total_flagged_sentences=len(unique_sentences),
        banned_word_counts=dict(banned_word_counts),
        summary=generate_summary_text(results, banned_word_counts)
    )

def generate_summary_text(results: List[FlaggedResult], banned_word_counts: Dict[str, int]) -> str:
    """Generate the human-readable summary text."""
    summary = f"Found {len(results)} instances of potentially 'problematic' language across {len(banned_word_counts)} different banned words.\n\n"
    

    return summary
    