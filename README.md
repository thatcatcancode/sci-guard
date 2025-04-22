# sci-guard
Protects important scientific research from being mistakenly defunded due to the use of common, yet banned words. 

## About

- Scientists upload research papers (.txt, .docx, or .pdf).

- Scans the text for banned words or phrases.

- Returns the problematic sentences.

- Suggests replacement sentences, using sentiment analysis and generative AI.

## 🧱 Full-Stack Architecture

🖼️ Frontend (Web UI)

- Framework: React (or Next.js if you want SSR)

- Components:

-- File upload dropzone

-- Progress/loading indicator

-- Results view (problematic sentence + suggested fix)

Requests:

POST /analyze-paper with file (as FormData)

Render structured results returned from backend

🧠 Backend (FastAPI)
Endpoints:

POST /analyze-paper: handles file upload, returns flagged sentences + suggestions

Logic Flow:

Accept and parse document (.txt, .docx, or .pdf)

Run keyword scan for banned words

Extract sentences that contain them

Feed each into a sentiment analyzer (optional)

Use generative AI (e.g., OpenAI API or local model) to propose alternatives

Return: [{ "banned": "trigger phrase", "sentence": "...", "suggestion": "..." }]

🗃️ Database (Optional)
Use cases:

Logging uploads

Tracking flagged sentences

User history (if login is involved)

Could be: PostgreSQL, SQLite, or NoSQL like MongoDB

⚙️ NLP/AI Components
Keyword Scanner: Regex / spaCy / custom dictionary-based matching

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


## Models

# BERT vs GPT
# Need a large context window to accept large documents

```
In the context of GPT and other large language models (LLMs), a context window refers to the maximum amount of text the model can process at one time when generating a response. It's measured in tokens, which are roughly equivalent to words, and includes both the user's input (prompt) and the model's own generated text

```