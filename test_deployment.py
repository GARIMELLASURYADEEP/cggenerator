# Test API Endpoint
import requests

def test_api():
    # Test the deployed backend
    try:
        response = requests.get('https://cggenerator-production.up.railway.app/docs')
        print(f"Backend Status: {response.status_code}")
        if response.status_code == 200:
            print("✅ Backend is working!")
        else:
            print("❌ Backend has issues")
    except Exception as e:
        print(f"❌ Backend error: {e}")
    
    # Test API endpoint
    try:
        response = requests.get('https://cggenerator-production.up.railway.app/api/certificates')
        print(f"API Status: {response.status_code}")
        if response.status_code == 200:
            print("✅ API is working!")
        else:
            print("❌ API has issues")
    except Exception as e:
        print(f"❌ API error: {e}")

if __name__ == "__main__":
    test_api()
