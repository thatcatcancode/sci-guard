from transformers import pipeline

# Load the generator only once at startup
generator = pipeline("text2text-generation", model="google/flan-t5-base")

# sentence example: "We performed a transcriptomics analysis to study the new gene."
# banned word detected: "trans" in "transcriptomics"
# outcome: rewrite the sentence but replace "transcriptomics" with "gene expression analysis"
# catch: the new phrase must also not have banned subword. 
# "expression" is also a banned word - need recursive solution for this?
def rewrite_sentence(sentence: str, word: str, banned_word: str) -> str:
    prompt = f"""
    Rewrite this scientific sentence by replacing the word "{word}" with a completely different term.
    Original word to replace: "{word}"
    Banned substring to avoid: "{banned_word}"

    Rules:
    1. MUST replace "{word}" with a different scientific term
    2. MUST NOT use any words containing "{banned_word}"
    3. MUST maintain scientific accuracy
    4. MUST be a complete, grammatical sentence
    5. MUST be different from the input

    Original sentence: "{sentence}"

    Rewritten sentence:
    """.strip()
    
    return generator(
        prompt,
        max_length=200,
        do_sample=True,
        temperature=0.9,        # Increased from 0.5 to encourage more variation
        top_p=0.9,
        top_k=50,              # Added to help with diversity
        num_return_sequences=1,
        repetition_penalty=1.5  # Increased from 1.2 to discourage copying
    )[0]["generated_text"]
    
