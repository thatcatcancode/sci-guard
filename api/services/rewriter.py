import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def rewrite_sentence(sentence: str, word: str, banned_word: str) -> str:
    words = ", ".join([word, banned_word])
    prompt = (
        f"Rewrite the following sentence to avoid using the words {words}:\n"
        f"Original: {sentence}\n"
        f"Rewritten:"
    )

    response = client.chat.completions.create(model="gpt-4o-mini",  # or "gpt-3.5-turbo"
    messages=[
        {"role": "system", "content": "You are a helpful academic writing assistant."},
        {"role": "user", "content": prompt}
    ],
    temperature=0.7,
    max_tokens=150)

    return response.choices[0].message.content.strip()


# from transformers import T5Tokenizer, T5ForConditionalGeneration

# # Use SciFive model fine-tuned on PubMed data
# model_name = "google/flan-t5-base"
# tokenizer = T5Tokenizer.from_pretrained(model_name)
# model = T5ForConditionalGeneration.from_pretrained(model_name)

# input_text = "translate English to German: How old are you?"
# input_ids = tokenizer(input_text, return_tensors="pt").input_ids

# outputs = model.generate(input_ids)
# print(tokenizer.decode(outputs[0]))



# sentence example: "We performed a transcriptomics analysis to study the new gene."
# banned word detected: "trans" in "transcriptomics"
# outcome: rewrite the sentence but replace "transcriptomics" with "gene expression analysis"
# catch: the new phrase must also not have banned subword. 
# "expression" is also a banned word - need recursive solution for this?
# def rewrite_sentence(sentence: str, word: str, banned_word: str) -> str:
#     prompt = f"Rewrite the folowing sentence, but do not use the word '{word}': {sentence}"

#     input_ids = tokenizer(prompt, return_tensors="pt").input_ids

#     output = model.generate(
#         input_ids,
#         max_length=200,
#         do_sample=True,
#         temperature=0.8,
#         top_p=0.9,
#         top_k=50,
#         num_return_sequences=1,
#     )

#     return tokenizer.decode(output[0], skip_special_tokens=True)


        # Problematic word to replace: "{word}"
        # Banned substring to avoid: "{banned_word}"

        # Rules:
        # 1. MUST replace "{word}" with a different scientific term
        # 2. MUST NOT use any words containing "{banned_word}"
        # 3. MUST maintain scientific accuracy
        # 4. MUST be a complete, grammatical sentence
        # 5. MUST be different from the input