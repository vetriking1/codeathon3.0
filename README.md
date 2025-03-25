# Express MongoDB Backend Server

This is a backend server built with Express.js and MongoDB to handle user authentication (registration and login).

## Prerequisites

- Node.js installed
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository or download the files
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=mongodb://localhost:27017/ontymgreen
PORT=3000
```

## Running the Server

Start the server with:

```bash
node server.js
```

You should see the message "Server is running on port 3000" and "Connected to MongoDB" if everything is set up correctly.

## API Endpoints

### Register a New User

**Endpoint:** `POST /register`

**Request Body:**
```json
{
  "username": "example_user",
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Success Response:**
```json
{
  "message": "User registered successfully"
}
```

### Login

**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "username": "example_user",
  "password": "securepassword"
}
```

**Success Response:**
```json
{
  "message": "Logged in successfully"
}
```

## Testing the API

You can test the API using tools like:
- Postman
- cURL
- Fetch API in JavaScript

Example cURL commands:

```bash
# Register a new user
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
