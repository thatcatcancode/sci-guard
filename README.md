# Sci-Guard 🔬🚨📝

### What 
Sci-Guard is an AI tool that scans research papers for banned words and suggests replacements. Consider it your second (government) reviewer.

### Why 
Protects important scientific research from being mistakenly overlooked and unfunded due to banned words. Saving science one mistakenly-banned word at a time.

### Banned Words

There is no single source of truth where an official list is hosted for public use. As such, this list may be incomplete or over-reaching.

Words also sourced from [NYT report](https://www.forbes.com/sites/brucelee/2025/03/15/these-197-terms-may-trigger-reviews-of-your-nih-nsf-grant-proposals/), said to be specific to NIH grant funding. 

Words were also sourced from [pen.org](https://pen.org/banned-words-list/)

It is often subwords that are discovered problematic and therefore this project aims to replace those occurrences as well.

For example: `trans` in `transcriptomics` might be flagged with a suggested revision of `gene expression analysis`. 

## Workflow 

- Scientists upload research grant proposal (.txt, .docx, or .pdf).

- Scans the text for banned words or phrases.

- Returns a summarized report

- Returns the problematic sentences with the banned words highlighted.

- Suggests replacement sentences, using generative AI.


## 🖼️ Frontend (Web UI)

- React
- Components: File upload dropzone, Chart.js, Results view (problematic sentence + suggested fix)
- [Cloudfare Turnstile](https://www.cloudflare.com/application-services/products/turnstile/) to verify user is not a robot (optional)


## 🧠 Backend (FastAPI)
Endpoints:

Swagger Docs

- POST  /paper/analyze: handles file upload, returns flagged sentences and analysis of paper
- POST /sentence/rewrite: rewrites sentence without banned words using LLM, recursive


## ⚙️ NLP/AI Components
Keyword Scanner: ntlk / spaCy / custom dictionary-based matching

Generative AI: OpenAI GPT-4x



```
In the context of GPT and other large language models (LLMs), a context window refers to the maximum amount of text the model can process at one time when generating a response. It's measured in tokens, which are roughly equivalent to words, and includes both the user's input (prompt) and the model's own generated text

```
