from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError
import os
# from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from datetime import datetime
import random
import string

from database import connect_to_mongo, close_mongo_connection, certificates_collection
from models import CertificateCreate, Certificate

# load_dotenv()

app = FastAPI(title="Tech Certificate Generator API", version="1.0")

# CORS middleware
origins = ["*"]  # For development; restrict in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

async def generate_unique_id() -> str:
    """Generate an 8-digit unique ID with collision check."""
    while True:
        candidate_id = str(random.randint(10000000, 99999999))
        existing = await certificates_collection.find_one({"id": candidate_id})
        if not existing:
            return candidate_id

@app.post("/api/certificates", response_model=Certificate)
async def create_certificate(certificate_data: CertificateCreate):
    try:
        # Generate unique ID
        cert_id = await generate_unique_id()
        certificate_id = f"CERT{cert_id}"
        
        # Create full certificate object
        certificate = Certificate(
            id=cert_id,
            certificate_id=certificate_id,
            full_name=certificate_data.full_name,
            email=certificate_data.email,
            domain=certificate_data.domain,
            registration_number=certificate_data.registration_number,
            issue_date=certificate_data.issue_date,
            created_at=datetime.utcnow()
        )
        
        # Insert into database
        result = await certificates_collection.insert_one(certificate.dict())
        
        if not result.get('acknowledged', False):
            raise HTTPException(status_code=500, detail="Failed to create certificate")
        
        return certificate
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"{type(e).__name__}: {str(e)}")

@app.get("/api/certificates", response_model=List[Certificate])
async def get_all_certificates():
    try:
        certificates = await certificates_collection.find().to_list(length=100)
        return certificates
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/certificates/{cert_id}", response_model=Certificate)
async def get_certificate_by_id(cert_id: str):
    try:
        certificate = await certificates_collection.find_one({"certificate_id": f"CERT{cert_id}"})
        if not certificate:
            raise HTTPException(status_code=404, detail="Certificate not found")
        return certificate
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.exception_handler(ValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
