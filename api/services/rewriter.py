from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load the generator only once at startup
# generator = pipeline("text2text-generation", model="google/flan-t5-base")

# Use SciFive model fine-tuned on PubMed data
model_name = "razent/SciFive-base-Pubmed"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# sentence example: "We performed a transcriptomics analysis to study the new gene."
# banned word detected: "trans" in "transcriptomics"
# outcome: rewrite the sentence but replace "transcriptomics" with "gene expression analysis"
# catch: the new phrase must also not have banned subword. 
# "expression" is also a banned word - need recursive solution for this?
def rewrite_sentence(sentence: str, word: str, banned_word: str) -> str:
    prompt = f"Paraphrase this sentence: {sentence}"

    inputs = tokenizer(prompt, return_tensors="pt")
    
    print("Prompt:", prompt)
    print("Tokens:", inputs)
    
    output = model.generate(
        **inputs,
        max_length=200,
        do_sample=True,
        temperature=0.8,
        top_p=0.9,
        top_k=50,
        num_return_sequences=1,
    )
    
    return tokenizer.decode(output[0], skip_special_tokens=True)

    
        # Problematic word to replace: "{word}"
        # Banned substring to avoid: "{banned_word}"

        # Rules:
        # 1. MUST replace "{word}" with a different scientific term
        # 2. MUST NOT use any words containing "{banned_word}"
        # 3. MUST maintain scientific accuracy
        # 4. MUST be a complete, grammatical sentence
        # 5. MUST be different from the input