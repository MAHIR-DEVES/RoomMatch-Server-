# name

🏠 RoomMatch

# Live Link

live link : [many-stick.surge.sh](http://many-stick.surge.sh/)

# RoomMatch Backend Server

The backend server for RoomMatch, a roommate finding application. This
Express.js server provides API endpoints for managing roommate listings and
connects to a MongoDB database.

## Features

- **CRUD Operations**: Create, read, update, and delete roommate listings
- **Like System**: Users can like listings
- **User-specific Data**: Fetch listings by user email
- **MongoDB Integration**: Persistent data storage
- **CORS Enabled**: For cross-origin requests
- **Environment Variables**: Secure configuration

## API Endpoints

### Posts

- `POST /posts` - Create a new listing
- `GET /posts` - Get available listings (limited to 6)
- `GET /AllPosts` - Get all listings
- `GET /posts/:id` - Get a specific listing by ID
- `GET /my-posts/:email` - Get listings by user email
- `PUT /posts/:id` - Update a listing
- `PATCH /posts/like/:id` - Like a listing
- `DELETE /posts/:id` - Delete a listing

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongodb driver)
- CORS middleware
- Dotenv for environment variables

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install express cors mongodb dotenv
   ```
