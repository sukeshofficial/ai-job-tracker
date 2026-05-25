from fastapi import FastAPI
from app.database import db

app = FastAPI(
    title="AI Job Tracker Service",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "message": "AI Service is Running"
    }

@app.get("/health")
async def health():
    await db.command("ping")

    return {
        "mongodb": "connected",
        "ai_service": "running"
    }