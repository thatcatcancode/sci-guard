from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

class LimitPayloadSizeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        max_body_size = 20 * 1024 * 1024  # 10 MB
        body = await request.body()
        if len(body) > max_body_size:
            return Response("Payload too large", status_code=413)
        request._body = body
        return await call_next(request)

from dotenv import load_dotenv
load_dotenv()

from routes import analyze
from routes import rewrite
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(LimitPayloadSizeMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust to your frontend host
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(analyze.router)
app.include_router(rewrite.router)