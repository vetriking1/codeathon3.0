import sys
import requests

sys.stdout.reconfigure(encoding='utf-8')  # Ensure UTF-8 encoding

API_KEY = "799baf8abdc81da6e98902b9cab7a754"
LAT, LON = 13.0351104, 80.2029568

def test_openweather_api():
    url = f"https://api.openweathermap.org/data/2.5/air_pollution?lat={LAT}&lon={LON}&appid={API_KEY}"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        print("✅ API Key is valid. Response Data:")
        print(response.json())  # Print air quality data
    elif response.status_code == 401:
        print("❌ Unauthorized: Invalid API Key")
    else:
        print(f"⚠ Error {response.status_code}: {response.text}")

if __name__ == "__main__":
    test_openweather_api()
