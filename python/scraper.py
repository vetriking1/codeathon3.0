import requests
from bs4 import BeautifulSoup
import json
import re
import sys
from urllib.parse import quote, urljoin
sys.stdout.reconfigure(encoding='utf-8') 
class StructuredProductScraper:
    def __init__(self, serpapi_key):
        """
        Initialize the scraper with SerpAPI key
        
        :param serpapi_key: API key for SerpAPI
        """
        self.serpapi_key = serpapi_key
        
    def search_google(self, query, num_results=5):
        """
        Search Google for product details
        
        :param query: Search query string
        :param num_results: Number of search results to retrieve
        :return: List of search result URLs
        """
        # Encode the query for URL
        encoded_query = quote(query)
        
        # SerpAPI endpoint
        url = f"https://serpapi.com/search?engine=google&q={encoded_query}&api_key={self.serpapi_key}&num={num_results}"
        
        try:
            # Send request to SerpAPI
            response = requests.get(url)
            response.raise_for_status()
            search_results = response.json()
            
            # Extract organic search result links
            urls = [
                result.get('link', '') 
                for result in search_results.get('organic_results', [])
            ]
            
            return urls
        
        except requests.RequestException as e:
            print(f"Error during Google search: {e}")
            return []
    
    def scrape_website(self, url):
        """
        Scrape website for structured product details
        
        :param url: URL to scrape
        :return: Dictionary of scraped product information
        """
        try:
            # Send request to the website
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            # Parse HTML content
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Extract structured product information
            product_info = {
                'source_url': url,
                'product_name': self._extract_product_name(soup),
                'price': self._extract_price(soup),
                'description': self._extract_description(soup),
                'images': self._extract_images(soup, url),
                'sustainability_features': self._extract_sustainability_features(soup),
                'specifications': self._extract_specifications(soup),
                'available_sizes': self._extract_sizes(soup),
                'in_stock': self._check_stock(soup)
            }
            
            return product_info
        
        except requests.RequestException as e:
            print(f"Error scraping {url}: {e}")
            return {}
    
    def _extract_product_name(self, soup):
        """
        Extract product name from webpage
        
        :param soup: BeautifulSoup object
        :return: Product name
        """
        # Try multiple selectors to find product name
        name_selectors = [
            'h1.product-title',
            'h1#product-name',
            'title',
            'meta[property="og:title"]'
        ]
        
        for selector in name_selectors:
            name_tag = soup.select_one(selector)
            if name_tag:
                # For meta tags, get content attribute
                if selector.startswith('meta'):
                    return name_tag.get('content', '').strip()
                # For other tags, get text
                return name_tag.get_text(strip=True)
        
        return 'Product Name Not Found'
    
    def _extract_price(self, soup):
        """
        Extract product price
        
        :param soup: BeautifulSoup object
        :return: Product price
        """
        # Regex pattern to match price
        price_patterns = [
            r'\$\d+(\.\d{1,2})?',  # Matches $XX.XX format
            r'£\d+(\.\d{1,2})?',   # Matches £XX.XX format
            r'€\d+(\.\d{1,2})?'    # Matches €XX.XX format
        ]
        
        # Try different price selectors
        price_selectors = [
            '.price', 
            '#price', 
            '.product-price', 
            'span[data-price]'
        ]
        
        # First, try specific selectors
        for selector in price_selectors:
            price_tag = soup.select_one(selector)
            if price_tag:
                price_text = price_tag.get_text(strip=True)
                for pattern in price_patterns:
                    match = re.search(pattern, price_text)
                    if match:
                        return match.group(0)
        
        # If no selector works, search entire page text
        page_text = soup.get_text()
        for pattern in price_patterns:
            match = re.search(pattern, page_text)
            if match:
                return match.group(0)
        
        return 'Price Not Found'
    
    def _extract_description(self, soup):
        """
        Extract product description
        
        :param soup: BeautifulSoup object
        :return: Product description
        """
        # Try multiple description selectors
        desc_selectors = [
            'meta[name="description"]',
            'meta[property="og:description"]',
            '.product-description',
            '#product-description',
            'div.description',
            'p.description'
        ]
        
        for selector in desc_selectors:
            desc_tag = soup.select_one(selector)
            if desc_tag:
                # For meta tags, get content attribute
                if selector.startswith('meta'):
                    return desc_tag.get('content', '').strip()
                # For other tags, get text
                return desc_tag.get_text(strip=True)
        
        return 'Description Not Found'
    
    def _extract_images(self, soup, base_url):
        """
        Extract product images
        
        :param soup: BeautifulSoup object
        :param base_url: Base URL for resolving relative paths
        :return: List of image URLs
        """
        # Image selectors to try
        image_selectors = [
            'img.product-image',
            'img#product-image',
            'meta[property="og:image"]',
            '.product-gallery img',
            'img[itemprop="image"]'
        ]
        
        images = []
        for selector in image_selectors:
            image_tags = soup.select(selector)
            for img in image_tags:
                # Try different attributes for image URL
                src = img.get('src') or img.get('data-src')
                if src:
                    # Convert relative URLs to absolute
                    full_url = urljoin(base_url, src)
                    if full_url not in images:
                        images.append(full_url)
        
        return images[:5]  # Limit to 5 images
    
    def _extract_sustainability_features(self, soup):
        """
        Extract sustainability-related features
        
        :param soup: BeautifulSoup object
        :return: List of sustainability features
        """
        keywords = [
            'sustainable', 'eco-friendly', 'green', 
            'recyclable', 'biodegradable', 'carbon-neutral',
            'organic', 'recycled', 'environmental'
        ]
        
        features = []
        
        # Search for text containing sustainability keywords
        for keyword in keywords:
            matches = soup.find_all(string=lambda text: keyword in text.lower())
            features.extend([match.strip() for match in matches if match.strip()])
        
        return list(set(features))[:5]  # Limit to 5 unique features
    
    def _extract_specifications(self, soup):
        """
        Extract product specifications
        
        :param soup: BeautifulSoup object
        :return: Dictionary of specifications
        """
        specs = {}
        
        # Try different specification table/list selectors
        spec_selectors = [
            '.product-specs',
            '#product-specifications',
            'table.specifications',
            'ul.specs',
            'div.product-details'
        ]
        
        for selector in spec_selectors:
            spec_container = soup.select_one(selector)
            if spec_container:
                # Try to extract key-value pairs
                rows = spec_container.find_all(['tr', 'li'])
                for row in rows:
                    # Try to extract key and value
                    key_tag = row.find(['th', '.spec-name'])
                    value_tag = row.find(['td', '.spec-value'])
                    
                    if key_tag and value_tag:
                        key = key_tag.get_text(strip=True)
                        value = value_tag.get_text(strip=True)
                        specs[key] = value
                
                # If specs found, break the loop
                if specs:
                    break
        
        return specs
    
    def _extract_sizes(self, soup):
        """
        Extract available product sizes
        
        :param soup: BeautifulSoup object
        :return: List of available sizes
        """
        size_selectors = [
            'select#size-select',
            '.size-options',
            'div.product-sizes',
            'ul.size-list'
        ]
        
        for selector in size_selectors:
            size_container = soup.select_one(selector)
            if size_container:
                # Extract sizes from select options or list items
                sizes = size_container.find_all(['option', 'li'])
                available_sizes = [
                    size.get_text(strip=True) 
                    for size in sizes 
                    if size.get_text(strip=True)
                ]
                
                if available_sizes:
                    return available_sizes
        
        return []
    
    def _check_stock(self, soup):
        """
        Check if product is in stock
        
        :param soup: BeautifulSoup object
        :return: Boolean indicating stock availability
        """
        stock_indicators = [
            '.in-stock',
            '.product-available',
            'span[data-stock]',
            '#stock-status'
        ]
        
        for selector in stock_indicators:
            stock_tag = soup.select_one(selector)
            if stock_tag:
                stock_text = stock_tag.get_text(lower=True)
                return 'in stock' in stock_text or 'available' in stock_text
        
        return None
    
    def search_and_scrape(self, query):
        """
        Perform complete search and scraping process
        
        :param query: Search query for products
        :return: List of scraped product information
        """
        # Search Google for relevant websites
        search_urls = self.search_google(query)
        
        # Scrape each website
        product_details = []
        for url in search_urls:
            product_info = self.scrape_website(url)
            if product_info:
                product_details.append(product_info)
        
        return product_details

# Example usage
def main():
    # Replace with your actual SerpAPI key
    SERPAPI_KEY = '982229d8c7ea5ca4214b36542dd4855a77c71538539cfe61863bf48290346381'
    
    # Initialize scraper
    scraper = StructuredProductScraper(SERPAPI_KEY)
    
    # Search and scrape product information
    query = "Cardboard Boxes"
    results = scraper.search_and_scrape(query)
    
    # Save results to JSON file
    with open('product_details.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    # Print results
    for result in results:
        print(json.dumps(result, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()