from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.contact import router as contact_router

app = FastAPI(
    title="Portfolio Backend API",
    description="Backend API for portfolio website contact form",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://parthivnair.com",
        "https://www.parthivnair.com",
        "http://localhost:3000",  # For local development
        "http://127.0.0.1:3000"   # For local development
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Include routers
app.include_router(contact_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Portfolio Backend API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 