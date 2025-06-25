# RoomMatch API Server Documentation

# Live Link

🏠 live link : [many-stick.surge.sh](http://many-stick.surge.sh/)

## 📌 Table of Contents

- [Technologies Used](#-technologies-used)
- [API Endpoints](#-api-endpoints)
- [Setup Instructions](#-setup-instructions)
- [Database Structure](#-database-structure)
- [Environment Variables](#-environment-variables)
- [How It Works](#-how-it-works)

## 🛠 Technologies Used

### Core Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database (Atlas)

### Key Dependencies

- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables
- `mongodb` - Official MongoDB driver

## 🌐 API Endpoints

### Posts Management

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| POST   | `/posts`           | Create new post           |
| GET    | `/posts`           | Get 6 available posts     |
| GET    | `/AllPosts`        | Get all posts             |
| GET    | `/posts/:id`       | Get single post by ID     |
| GET    | `/my-posts/:email` | Get posts by user email   |
| PUT    | `/posts/:id`       | Update post               |
| PATCH  | `/posts/like/:id`  | Increment post like count |
| DELETE | `/posts/:id`       | Delete post               |

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB Atlas account
- Git (optional)

### Step-by-Step Setup

1. **Clone repository** (if available)

   ```bash
   git clone <repository-url>
   cd project-folder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```
   PORT=3000
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   ```

4. **Run the server**

   ```bash
   npm start
   ```

   or for development with auto-restart:

   ```bash
   npm run dev
   ```

5. **Verify server is running** Visit in your browser or use Postman:
   ```
   http://localhost:3000
   ```

## 🗃 Database Structure

### Collections

1. **posts**
   ```javascript
   {
     _id: ObjectId,
     title: String,
     description: String,
     image: String,
     availability: String, // 'available' or other status
     likeCount: Number,
     email: String, // owner's email
     createdAt: Date,
     // ... other post fields
   }
   ```

## 🔐 Environment Variables

| Variable  | Required | Description                 |
| --------- | -------- | --------------------------- |
| `PORT`    | No       | Server port (default: 3000) |
| `DB_USER` | Yes      | MongoDB Atlas username      |
| `DB_PASS` | Yes      | MongoDB Atlas password      |

## 🔄 How It Works

### Flow Overview

1. **Client makes request** to API endpoint
2. **Server processes request**:
   - Validates input
   - Interacts with MongoDB
   - Returns JSON response
3. **Database operations**:
   - CRUD operations via MongoDB driver
   - Special operations like `$inc` for likes

### Key Features

- **Post Management**: Full CRUD functionality
- **Like System**: Atomic increment counter
- **Filtering**: By availability and user email
- **Pagination**: Default limit of 6 posts for `/posts` endpoint

## 💻 Development Commands

| Command       | Description                             |
| ------------- | --------------------------------------- |
| `npm start`   | Start production server                 |
| `npm run dev` | Start development server (with nodemon) |
| `npm test`    | Run tests (if configured)               |

## 🚨 Troubleshooting

Common issues and solutions:

1. **Connection failed to MongoDB**

   - Verify Atlas IP whitelisting
   - Check credentials in `.env`

2. **CORS errors**

   - Ensure client origin is allowed
   - Check server CORS configuration

3. **Environment variables not loading**
   - Confirm `.env` file is in root directory
   - Restart server after changes
