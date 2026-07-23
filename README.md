# 🌍 Trip Planner

> Plan your perfect trip with AI-generated itineraries, destination discovery, and trip management—all in one place.

## 🚀 Live Demo

**🌐 https://trip-planner-68u4-git-main-pavankumar060905-8109s-projects.vercel.app/**

---

## 📖 Overview

AI Trip Planner is a full-stack MERN web application that helps users effortlessly plan their trips. Users can discover destinations, generate personalized travel itineraries using AI, save trips, and manage their travel plans through a clean and responsive interface.

The application provides an intuitive experience for travelers by combining destination exploration with intelligent itinerary generation.

---

## ✨ Features

* 🔐 User Authentication (Register & Login)
* 🤖 AI-powered Trip Planner
* 📍 Explore Popular Destinations
* 🗺️ Personalized Travel Itineraries
* 💾 Save Trips to Database
* 📅 View Previous Trips
* 👤 User Profile Management
* 📱 Fully Responsive UI
* ⚡ Fast API Communication
* ☁️ Cloud Deployment with Vercel

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* CSS

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* Frontend: Vercel
* Backend: Vercel
* Database: MongoDB Atlas

---

## 📂 Project Structure

```text
Trip-Planner/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── config/
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <your-repository-url>
```

### Move into the project

```bash
cd Trip-Planner
```

---

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run the backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:5000
```

Run the frontend

```bash
npm run dev
```

---

## 🌐 API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Destinations

* GET `/api/destinations`

### Planner

* POST `/api/planner`

### Trips

* GET `/api/trips`
* POST `/api/trips`
* DELETE `/api/trips/:id`

### Users

* GET `/api/users/profile`

---

## 📸 Application Modules

* Home Page
* Login & Register
* Destination Explorer
* AI Trip Planner
* Saved Trips
* User Profile

---

## 🔒 Security

* Password hashing using **bcrypt.js**
* JWT-based Authentication
* Protected API Routes
* CORS Configuration
* Environment Variables for Sensitive Data

---

## 🎯 Future Enhancements

* Google Maps Integration
* Weather Forecast
* Hotel Recommendations
* Budget Calculator
* Collaborative Trip Planning
* Image Uploads
* Email Notifications
* Multi-language Support

---

## 👨‍💻 Author

**Pavan Kumar R**

* Information Science & Engineering
* University Visvesvaraya College of Engineering (UVCE)

---

## 📄 License

This project is developed for learning, portfolio, and educational purposes.
