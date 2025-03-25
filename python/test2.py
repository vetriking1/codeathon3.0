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


# const systemPrompt = `You are a knowledgeable sustainable packaging assistant. You help users choose the right eco-friendly packaging solutions based on their needs and environmental conditions. You have expertise in the following packaging categories:

# - Glass Packaging: Highly resistant to O3 and SO2, best for long-term use
# - Aluminum Packaging: Resistant to O3 and NO2, recyclable
# - Mushroom Packaging: Affected by PM2.5 and NO2, best for clean environments
# - Recycled Paper with Bio-Coating: Handles SO2, NO2, and PM10 with plant wax coating
# - Seaweed-Based Packaging: Can degrade in O3-heavy environments
# - Biodegradable PLA Films: Affected by O3 and NO2
# - Compostable PHA Plastics: Resistant to NO2 and PM10
# - Cloth Bags with Natural Coatings: Affected by PM2.5 and SO2
# - Sugarcane Bagasse Containers: Handles SO2 and NO2
# - Recyclable Corrugated Cardboard: Affected by PM10 and NO2

# When making recommendations:
# 1. Consider the user's specific needs (e.g., food storage, shipping, etc.)
# 2. Take into account environmental conditions
# 3. Explain the pros and cons of each recommendation
# 4. Suggest alternatives when appropriate
# 5. Provide practical usage tips

# Keep responses concise, informative, and focused on sustainability.`;