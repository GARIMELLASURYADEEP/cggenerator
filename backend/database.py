import json
import os
from typing import List, Dict, Any

# File-based storage for certificates
CERTIFICATES_FILE = "certificates.json"

# In-memory storage
certificates_data = []

async def connect_to_mongo():
    """Initialize file-based storage"""
    global certificates_data
    if os.path.exists(CERTIFICATES_FILE):
        try:
            with open(CERTIFICATES_FILE, 'r') as f:
                certificates_data = json.load(f)
        except (json.JSONDecodeError, FileNotFoundError):
            certificates_data = []
    else:
        certificates_data = []
    print("Connected to file-based storage")

async def close_mongo_connection():
    """Save data to file"""
    with open(CERTIFICATES_FILE, 'w') as f:
        json.dump(certificates_data, f, indent=2, default=str)
    print("Disconnected from file-based storage")

class MockCollection:
    async def find_one(self, query: Dict[str, Any]) -> Dict[str, Any]:
        """Find one certificate by query"""
        for cert in certificates_data:
            if all(cert.get(k) == v for k, v in query.items()):
                return cert
        return None
    
    async def find(self) -> List[Dict[str, Any]]:
        """Find all certificates"""
        return certificates_data
    
    async def insert_one(self, document: Dict[str, Any]) -> Dict[str, Any]:
        """Insert one certificate"""
        certificates_data.append(document)
        return {"acknowledged": True, "inserted_id": document.get("id")}
    
    async def to_list(self, length: int = None) -> List[Dict[str, Any]]:
        """Convert cursor to list"""
        return certificates_data[:length] if length else certificates_data

certificates_collection = MockCollection()
