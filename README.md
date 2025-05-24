# FullStack_-BookReviewPlatform

Objective
Develop a book review platform where users can browse books, read and write reviews, and rate books. The application should have a React frontend and a Node.js backend using Express and SQL/MongoDB.

Requirements
Frontend (React)
1. Create a responsive UI with the following pages/components:
○ Home page with featured books
○ Book listing page with search and filter functionality
○ Individual book page with details and reviews
○ User profile page
○ Review submission form
2. Implement state management (e.g., using Redux or React Context)
3. Use React Router for navigation
4. Integrate with the backend API
5. Implement error handling and loading states
Backend (Node.js, Express, SQL/MongoDB)
1. Set up a RESTful API with the following endpoints:
○ GET /books - Retrieve all books (with pagination)
○ GET /books/:id - Retrieve a specific book
○ POST /books - Add a new book (admin only)
○ GET /reviews - Retrieve reviews for a book
○ POST /reviews - Submit a new review
○ GET /users/:id - Retrieve user profile
○ PUT /users/:id - Update user profile
2. Implement data validation and error handling
3. Use SQL/MongoDB for data persistence
 

Evaluation Criteria
1. Code quality and organization
2. Proper use of React hooks and components
3. RESTful API design and implementation
4. Database schema design
5. Error handling and edge case management
6. Documentation clarity
7. UI/UX design considerations
Submission
1. Provide a GitHub repository link containing your project
2. Include a README with setup instructions and any additional notes
3. (Optional) Deploy the application and provide a live demo URL



book-review-platform/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ErrorMessage.jsx
│   │   │   ├── books/
│   │   │   │   ├── BookCard.jsx
│   │   │   │   ├── BookList.jsx
│   │   │   │   ├── BookDetails.jsx
│   │   │   │   └── SearchFilter.jsx
│   │   │   ├── reviews/
│   │   │   │   ├── ReviewCard.jsx
│   │   │   │   ├── ReviewForm.jsx
│   │   │   │   └── ReviewList.jsx
│   │   │   └── user/
│   │   │       ├── UserProfile.jsx
│   │   │       └── UserReviews.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── BooksPage.jsx
│   │   │   ├── BookDetailsPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── components/
│   │   │   │   ├── header.css
│   │   │   │   ├── footer.css
│   │   │   │   ├── bookCard.css
│   │   │   │   ├── reviewCard.css
│   │   │   │   └── forms.css
│   │   │   └── pages/
│   │   │       ├── home.css
│   │   │       ├── books.css
│   │   │       └── profile.css
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── bookController.js
│   │   │   ├── reviewController.js
│   │   │   └── userController.js
│   │   ├── models/
│   │   │   ├── Book.js
│   │   │   ├── Review.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── books.js
│   │   │   ├── reviews.js
│   │   │   └── users.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   └── app.js
│   ├── package.json
│   └── server.js
├── README.md
└── .gitignore


# Book Review Platform

A full-stack web application for browsing books, reading reviews, and sharing your thoughts about books you've read. Built with React (Vite) frontend and Node.js/Express backend with MongoDB.

## 🚀 Features

### Frontend
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Book Discovery**: Browse featured books, search, and filter by genres
- **User Reviews**: Read and write detailed book reviews with ratings
- **User Profiles**: Manage your profile and view your review history
- **Interactive UI**: Modern, clean interface with smooth transitions

### Backend
- **RESTful API**: Well-structured API endpoints for all operations
- **Authentication**: Secure JWT-based authentication system
- **Data Validation**: Comprehensive input validation and sanitization
- **Rate Limiting**: Protection against spam and abuse
- **Error Handling**: Robust error handling with meaningful messages
- **Admin Features**: Admin-only book management capabilities

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for client-side routing
- **Context API** for state management
- **Vanilla CSS** for styling (no frameworks)
- **Axios** for API calls

### Backend
- **Node.js** with Express framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Helmet** for security headers
- **Morgan** for request logging
- **CORS** for cross-origin requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd book-review-platform
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Required Dependencies
```bash
npm install express mongoose cors helmet morgan dotenv bcryptjs jsonwebtoken
```

#### Environment Variables
Create a `.env` file in the backend directory:
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/book-review-platform
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/book-review-platform

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Optional: API Documentation URL
API_DOCS_URL=http://localhost:5000/api

# Optional: Maintenance Mode
MAINTENANCE_MODE=false
```

#### Start the Backend Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

#### Required Dependencies
```bash
npm install react react-dom react-router-dom axios
```

#### Development Dependencies
```bash
npm install -D @vitejs/plugin-react vite
```

#### Start the Frontend Development Server
```bash
npm run dev
```

The frontend development server will start on `http://localhost:5173`

## 🗄️ Database Setup

### MongoDB Local Setup
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb/brew/mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

### MongoDB Atlas Setup (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Get connection string and update `MONGODB_URI` in `.env`

## 📖 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Main Endpoints

#### Books
- `GET /api/books` - Get all books (with pagination)
- `GET /api/books/:id` - Get specific book
- `GET /api/books/featured` - Get featured books
- `GET /api/books/search?q=query` - Search books
- `POST /api/books` - Create book (admin only)
- `PUT /api/books/:id` - Update book (admin only)
- `DELETE /api/books/:id` - Delete book (admin only)

#### Reviews
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/book/:bookId` - Get reviews for a book
- `GET /api/reviews/:id` - Get specific review
- `POST /api/reviews` - Create review (authenticated)
- `PUT /api/reviews/:id` - Update review (author/admin only)
- `DELETE /api/reviews/:id` - Delete review (author/admin only)

#### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile
- `GET /api/users/:id` - Get user profile by ID
- `GET /api/users/:id/reviews` - Get user's reviews

## 🏗️ Project Structure

```
book-review-platform/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── books/
│   │   │   ├── reviews/
│   │   │   └── user/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── app.js
│   ├── server.js
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (when implemented)

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (when configured)

## 🚦 Testing the Application

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create a Book (Admin Required)
First, manually set a user's role to 'admin' in MongoDB, then:
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "description": "A classic American novel",
    "genres": ["Fiction", "Classic"],
    "publishedDate": "1925-04-10",
    "totalPages": 180
  }'
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Comprehensive validation for all inputs
- **Rate Limiting**: Protection against spam and brute force attacks
- **CORS Protection**: Configured for specific origins
- **Helmet Security**: Security headers for protection
- **SQL Injection Prevention**: Mongoose ODM protection
- **XSS Prevention**: Input sanitization

## 🚀 Deployment

### Backend Deployment (Node.js hosting)
1. Set environment variables in production
2. Ensure MongoDB connection is configured
3. Run `npm start` to start the production server

### Frontend Deployment (Static hosting)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your static hosting service
3. Configure environment variables for API endpoint

### Full-Stack Deployment Options
- **Heroku**: Easy deployment with Git integration
- **Vercel**: Great for frontend with serverless functions
- **Netlify**: Excellent for static sites with API integration
- **DigitalOcean**: VPS with full control
- **AWS**: Scalable cloud deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check firewall settings and network connectivity

#### CORS Errors
- Verify `FRONTEND_URL` in backend `.env` file
- Check if frontend is running on the expected port

#### JWT Token Issues
- Ensure `JWT_SECRET` is set in environment variables
- Check token expiration settings

#### Port Already in Use
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Kill process using port 5173
lsof -ti:5173 | xargs kill -9
```

## 📞 Support

For support, email aadishkumarak90@gmail.com or create an issue in the GitHub repository.

## 🎯 Roadmap

- [ ] Email verification for user registration
- [ ] Password reset functionality
- [ ] File upload for book covers and user avatars
- [ ] Advanced search with filters
- [ ] Book recommendations system
- [ ] Social features (follow users, book lists)
- [ ] Admin dashboard
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Mobile app with React Native