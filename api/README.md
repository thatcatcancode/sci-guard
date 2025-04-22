## Install deps

```
# virtual env (recommended)
cd /api
py -m venv venv
source venv/bin/activate 

# to verify in virtual env:
echo $VIRTUAL_ENV
# will return a fil
e path to your venv

# install deps
pip install fastapi uvicorn python-docx PyPDF2 nltk docx2txt

# create symlink to certifcate bundle
/Applications/Python\ 3.13/Install\ Certificates.command

# install cli 
pip install "fastapi[standard]"
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