#!/usr/bin/env python3
"""
Simple test script for the Portfolio Backend API
"""

import requests
import json
from typing import Dict, Any

BASE_URL = "http://localhost:8000"

def test_health_endpoints():
    """Test health check endpoints"""
    print("🔍 Testing health endpoints...")
    
    # Test root endpoint
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"✅ Root endpoint: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Root endpoint failed: {e}")
    
    # Test general health
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"✅ Health endpoint: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Health endpoint failed: {e}")
    
    # Test contact health
    try:
        response = requests.get(f"{BASE_URL}/api/contact/health")
        print(f"✅ Contact health: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Contact health failed: {e}")

def test_contact_form():
    """Test contact form endpoint"""
    print("\n📧 Testing contact form...")
    
    # Valid test data
    test_data = {
        "name": "Test User",
        "email": "test@example.com",
        "subject": "Test Subject for API",
        "message": "This is a test message to verify the API works correctly."
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/contact",
            headers={"Content-Type": "application/json"},
            data=json.dumps(test_data)
        )
        
        if response.status_code == 200:
            print(f"✅ Contact form success: {response.json()}")
        else:
            print(f"❌ Contact form failed: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Contact form request failed: {e}")

def test_validation():
    """Test input validation"""
    print("\n🔒 Testing validation...")
    
    # Invalid data (missing required fields)
    invalid_data = {
        "name": "A",  # Too short
        "email": "invalid-email",  # Invalid format
        "subject": "Hi",  # Too short
        "message": "Short"  # Too short
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/contact",
            headers={"Content-Type": "application/json"},
            data=json.dumps(invalid_data)
        )
        
        if response.status_code == 422:
            print(f"✅ Validation working: {response.status_code}")
            errors = response.json()
            print(f"   Validation errors: {len(errors.get('detail', []))} errors found")
        else:
            print(f"❌ Validation not working: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"❌ Validation test failed: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting API tests...\n")
    print("Make sure the FastAPI server is running on http://localhost:8000")
    print("Run: python dev.py\n")
    
    test_health_endpoints()
    test_contact_form()
    test_validation()
    
    print("\n✨ Tests completed!")

if __name__ == "__main__":
    main() 