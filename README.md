---

# 📚 Book Review Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to browse books, write and read reviews, and manage content through an admin dashboard. Designed with clean architecture, modular code structure, and visually appealing UI using modern frontend technologies.

---

## 📌 Table of Contents

* [Overview](#📖-overview)
* [Features](#✨-features)
* [Tech Stack](#🛠️-tech-stack)
* [Project Structure](#📁-project-structure)
* [Installation & Setup](#⚙️-installation--setup)
* [API Routes](#📡-api-routes)
* [Screenshots](#🖼️-screenshots)


---

## 📖 Overview

The **Book Review Platform** enables users to:

* Register and login
* Browse and search a library of books
* Filter books by genre or search keywords
* View detailed information for each book
* Add, view, and manage reviews and ratings
* See personal profile with review history
* Admins can add or delete books via a dashboard

This project emphasizes user experience, performance, and scalability, using best practices in frontend and backend development.

---

## ✨ Features

### 🧑‍💻 User

* 🔐 Secure Authentication with JWT
* 📚 Browse all books
* 🔍 Filter/search books by title, author, or genre
* 📝 Write reviews and give ratings
* 🧾 View personal review history
* 👤 View/update profile

### 🛡️ Admin

* ➕ Add new books with image, genre, and description
* ❌ Delete existing books
* 📊 View all books in the dashboard

### 🎨 UI/UX

* ⚡ Fast navigation with React Router
* 💅 Styled with modular CSS and CSS variables
* 🎈 Animations for smooth transitions
* 🌗 Responsive layout (mobile & desktop)

---

## 🛠️ Tech Stack

| Layer     | Tech                                       |
| --------- | ------------------------------------------ |
| Frontend  | React, Vite, React Router DOM, Context API |
| Backend   | Node.js, Express.js                        |
| Database  | MongoDB with Mongoose                      |
| Auth      | JWT (JSON Web Token)                       |
| Dev Tools | Nodemon, ESLint                            |
| Styling   | CSS Modules, CSS Variables                 |
| HTTP      | Axios / Fetch API                          |

---

## 📁 Project Structure

### Frontend

```
client/
├── components/
│   ├── books/
│   ├── common/
│   ├── reviews/
│   └── user/
├── context/AppContext.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── BookDetails.jsx
│   ├── ProfilePage.jsx
│   ├── ReviewPage.jsx
│   ├── AdminPage.jsx
├── services/api.js
├── styles/
│   └── pages/
├── utils/
│   └── ProtectedRoute.jsx
```

### Backend

```
server/
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
├── middleware/
│   ├── authMiddleware.js
├── models/
│   ├── Book.js
│   ├── Review.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
├── config/
│   └── db.js
├── utils/
│   └── generateToken.js
├── server.js
```

---

## ⚙️ Installation & Setup

### 🔧 Prerequisites

* Node.js & npm
* MongoDB (local or Atlas)
* Git

### 🛠 Backend Setup

```bash
cd server
npm install
npm run dev
```

Set environment variables in `.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://aadishkumarak60:l1Lbv7Gn0tCoOSTa@cluster0.tmk1o6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
JWT_SECRET=wefewfsdffs_sdS_SD_scv
MAINTENANCE_MODE=false
```

### 🎨 Frontend Setup

```bash
cd client
npm install
npm run dev
```

Make sure your API URLs match your backend in development (`http://localhost:5000`).

---

## 📡 API Routes

### 📘 Books

* `GET /api/books` — Get all books
* `GET /api/books/:id` — Get single book
* `POST /api/books` — Add new book (Admin)
* `DELETE /api/books/:id` — Delete book (Admin)

### 📝 Reviews

* `GET /api/reviews/book/:bookId` — Get reviews for a book
* `POST /api/reviews` — Add review

### 👤 Users

* `POST /api/register` — Register new user
* `POST /api/login` — Login user
* `GET /api/users/:id` — Get user details (protected)

---

## 🖼️ Screenshots

### 📚 Homepage
![Homepage](./client/public/HomePage.jpeg)

### 🛡️ Admin
![Admin](./client/public/AdminPage.jpeg)

### 👤 User
![User](./client/public/UserProfile.jpeg)

### 📝 Review
![Review](./client/public/ReviewPage.jpeg)

### 📘 Book Details
![Book Details](./client/public/BookList.jpeg)
![Book Page](./client/public/BooksPage.jpeg)


* 📚 **Homepage** — List of books with filters
* 🔍 **Book Details** — Ratings, reviews, and description
* 📝 **Add Review** — Form for writing reviews
* 👤 **Profile Page** — View own reviews and details
* 🛡️ **Admin Panel** — Add/Delete books

---

## 📬 Contact

Feel free to reach out for feedback,or ideas!

* 📧 Email: aadishkumarak90@gmail.com
* 💼 LinkedIn: www.linkedin.com/in/aadishkumar-s-a7016b1b3

---
