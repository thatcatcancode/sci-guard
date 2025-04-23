# Sci-Guard 🔬🚨📝

### What 
Sci-Guard is an AI tool that scans research papers for banned words and suggests replacements. Consider it your second (government) reviewer.

### Why 
Protects important scientific research from being mistakenly overlooked and unfunded due to banned words. 

### Banned Words
Words were sourced from [pen.org](https://pen.org/banned-words-list/) but as there is no single source of truth where an official list is hosted, this list may be incomplete or over-reaching.

Words also sourced from [NYT report](https://www.forbes.com/sites/brucelee/2025/03/15/these-197-terms-may-trigger-reviews-of-your-nih-nsf-grant-proposals/), said to be specific to NIH grant funding. 

It is often subwords that are discovered problematic and therefore this project aims to replace those occurrences as well.

For example: `trans` in `transcriptomics` might be flagged with a suggested revision of `gene expression analysis`. 

## Workflow 

- Scientists upload research papers (.txt, .docx, or .pdf).

- Scans the text for banned words or phrases.

- Returns the problematic sentences.

- Suggests replacement sentences, using sentiment analysis and generative AI.


## 🖼️ Frontend (Web UI)

- React
- Components: File upload dropzone, Progress/loading indicator, Results view (problematic sentence + suggested fix)
- [Cloudfare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/) to verify user is not a robot (optional)


## 🧠 Backend (FastAPI)
Endpoints:

Swagger Docs

- POST  /analyze-paper: handles file upload, returns flagged sentences + suggestions
- GET   /banned-words: returns list of banned words by government
- DEL   /analyze-paper/{id}: deletes the history of the paper to protect scientist IP (optional)

Logic Flow:

1. Accept and parse document (.txt, .docx, or .pdf)

2. Run keyword scan for banned words.

3. Extract sentences that contain them.

4. Feed each into BERT for sentiment analysis (optional).

5. Use generative AI (e.g., OpenAI API or local model) to propose alternatives.

6. Return: [{ "banned": "trigger phrase", "sentence": "...", "suggestion": "..." }]

## 🗃️ Database (Optional)
Use cases:

Logging uploads

Tracking flagged sentences

Could be: PostgreSQL, SQLite, or NoSQL like MongoDB

## ⚙️ NLP/AI Components
Keyword Scanner: ntlk / spaCy / custom dictionary-based matching

Sentiment Analysis: transformers library (distilbert-base-uncased-finetuned-sst-2-english)

Generative AI: OpenAI GPT-4, Mistral, Claude, or locally hosted LLM

## Flow 

[1] Scientist uploads paper → 
[2] Frontend sends file to backend API →
[3] Backend extracts + tokenizes text →
[4] Banned word scanner runs →
[5] Problematic sentences are extracted →
[6] Generative AI suggests replacements →
[7] Backend returns structured response →
[8] Frontend displays flagged sentences + suggestions
[9] Displays sentiment score based on neutral science objectivity.
[10] Scientist has option to delete paper from model and database.


## Models

### BERT vs GPT
- Need a large context window to accept large documents if doing sentiment analysis on entire document
- Might make sense to only do sentiment analysis on sentence with the banned word + the surrounding sentences to reduce cost + carbon, and increase performance.

```
In the context of GPT and other large language models (LLMs), a context window refers to the maximum amount of text the model can process at one time when generating a response. It's measured in tokens, which are roughly equivalent to words, and includes both the user's input (prompt) and the model's own generated text

```
