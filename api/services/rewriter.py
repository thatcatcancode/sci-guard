from transformers import pipeline

# Load the generator only once at startup
generator = pipeline("text2text-generation", model="google/flan-t5-base")

def rewrite_sentence(sentence: str, banned_word: str) -> str:
    prompt = f"Rewrite the sentence in a neutral tone using alternative scientific term instead of the subword {banned_word}: \"{sentence}\""
    result = generator(prompt, max_length=100, do_sample=True, top_p=0.9)[0]["generated_text"]
    return result
