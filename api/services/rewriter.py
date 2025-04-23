from transformers import pipeline

# Load the generator only once at startup
generator = pipeline("text2text-generation", model="google/flan-t5-base")

def rewrite_sentence(sentence: str, banned_word: str) -> str:
    prompt = f"Rewrite the sentence in a more professional and neutral tone, without using the word {banned_word}: \"{sentence}\""
    result = generator(prompt, max_length=80, do_sample=True, top_p=0.9)[0]["generated_text"]
    return result
