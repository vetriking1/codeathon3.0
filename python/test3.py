import requests

API_KEY = "982229d8c7ea5ca4214b36542dd4855a77c71538539cfe61863bf48290346381"  # Get from https://serpapi.com/
SEARCH_QUERY = "best sustainable packaging suppliers"

def get_supplier_urls():
    url = f"https://serpapi.com/search?engine=google&q={SEARCH_QUERY}&api_key={API_KEY}"
    response = requests.get(url).json()
    
    # Extract URLs from organic results
    urls = [result["link"] for result in response.get("organic_results", []) if "packaging" in result["link"]]
    return urls

if __name__ == "__main__":
    supplier_urls = get_supplier_urls()
    print(supplier_urls)
