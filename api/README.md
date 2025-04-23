## Api Setup

```
cd /api

# set python version for env
pyenv local 3.10.13

# start virtual env
# py -m venv venv
/Users/ladams/.pyenv/versions/3.10.13/bin/python3.10 -m venv env

source env/bin/activate 

# verify in virtual env:
echo $VIRTUAL_ENV
# will return a file path to your venv

# create symlink to certifcate bundle
# necessary to install nltk
/Applications/Python\ 3.13/Install\ Certificates.command

# set openai key
export OPENAI_API_KEY=your-key-here

# install deps
pip install fastapi uvicorn python-docx PyPDF2 nltk docx2txt transformers torch sentencepiece openai

# install fastapi cli 
pip install "fastapi[standard]"

deactivate  # exit current venv
rm -rf venv/  # remove old one
```

## Run the app

Run the app either using fastapi or uvicorn

```
fastapi dev main.py
# --or--
uvicorn app.main:app --reload
```

## Directory

sciguard-api/
├── app/
│   ├── main.py
│   ├── routes/
│   │   └── analyze.py
│   ├── services/
│   │   └── scanner.py
│   └── utils/
│       └── extractor.py
├── requirements.txt
└── README.md