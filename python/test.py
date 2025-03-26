import requests

# API Endpoint
url = "http://localhost:3000/auth/register"

# JSON Data for Registration
data = {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "securepassword123",
    "role": "buyer",
    "sizeOfIndustry": "Medium",
    "productsExpected": ["Steel", "Cement"],
    "productsOffered": ["Electrical Components"],
    "description": "A company focused on construction materials.",
    "location": "Chennai, India"
}

# Send POST Request
response = requests.post(url, json=data)

# Print Response
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
