from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional
from datetime import datetime
import random
import string

class CertificateCreate(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    domain: str = Field(..., min_length=1, max_length=50)
    registration_number: Optional[str] = Field(None, max_length=50)
    issue_date: str = Field(..., min_length=1, max_length=20)  # e.g., "2023-10-01"

    @validator('domain')
    def validate_domain(cls, v):
        allowed_domains = ["AI", "Web Development", "Cyber Security", "Data Science", "Cloud Computing"]
        if v not in allowed_domains:
            raise ValueError(f'Domain must be one of: {", ".join(allowed_domains)}')
        return v

class Certificate(CertificateCreate):
    id: str = Field(default_factory=lambda: str(random.randint(10000000, 99999999)).zfill(8))
    certificate_id: str = Field(...)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    def generate_certificate_id(self):
        self.certificate_id = f"CERT{self.id}"

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {datetime: lambda v: v.isoformat()}
