# Event Management Platform - Frontend

This repository contains the **frontend** for the MERN-based event management platform.

## 🚀 Features
- User Authentication (Login/Register)
- Event Dashboard with filtering options
- Event Creation and Management
- Real-time Attendee List (WebSockets)
- Responsive UI with React.js
- Profile Page with User’s Events

## 📂 Folder Structure
```
event-management-frontend/
│── public/             # Static assets
│── src/
│   │── api/            # API functions for backend communication
│   │── components/     # Reusable UI components
│   │── pages/          # React pages (Home, Profile, Event Form)
│   │── context/        # Global state management (Auth, Events)
│   │── styles/         # CSS files for styling
│   │── App.js          # Main React component
│   │── main.jsx        # Entry point for React app
│── .env               # Environment variables
│── package.json       # Dependencies & scripts
│── vite.config.js     # Vite configuration
│── README.md          # Project documentation
```

## ⚡ Tech Stack
- **React.js** (Frontend)
- **React Router** (Navigation)
- **Axios** (API Requests)
- **Context API** (State Management)
- **Socket.IO Client** (Real-time Updates)
- **Vite** (Development Server)

## 🛠️ Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/event-management-frontend.git
   cd event-management-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. Start the frontend:
   ```sh
   npm run dev
   ```


# Event Management Platform - Backend

This repository contains the **backend** for the MERN-based event management platform.

## 🚀 Features
- User Authentication (JWT)
- Event CRUD Operations (Create, Read, Update, Delete)
- Real-time Updates with WebSockets
- MongoDB for Storage
- Image Uploads (Cloudinary)

## 📂 Folder Structure
```
event-management-backend/
│── src/
│   │── controllers/    # Business logic for API routes
│   │── models/         # Mongoose schemas (User, Event)
│   │── routes/         # API endpoints
│   │── middleware/     # JWT authentication
│   │── config/         # Database & environment configurations
│   │── server.js       # Main Express server file
│── .env               # Environment variables
│── package.json       # Dependencies & scripts
│── README.md          # Project documentation
```

## ⚡ Tech Stack
- **Node.js** (Backend)
- **Express.js** (Framework)
- **MongoDB + Mongoose** (Database)
- **JWT** (Authentication)
- **Socket.IO** (Real-time Updates)
- **Cloudinary** (Image Uploads)

## 🛠️ Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/event-management-backend.git
   cd event-management-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_URL=your_cloudinary_url
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the backend:
   ```sh
   npm run dev
   ```

## 📸 Screenshots Postman Backend Testing
![Screenshot (351)](https://github.com/user-attachments/assets/82f06c49-5e9c-4462-852b-f14d16716b24)
![Screenshot (352)](https://github.com/user-attachments/assets/b405254d-1fb4-4538-a8dc-70ed5e9bffa1)
![Screenshot (353)](https://github.com/user-attachments/assets/eeb51388-9d1e-4a15-86c1-415ab740e76b)
![Screenshot (354)](https://github.com/user-attachments/assets/76d44df9-7830-4345-aab6-67c08b18ecdc)
![Screenshot (355)](https://github.com/user-attachments/assets/3fa75fa1-3d86-448b-9af6-ae9575347b31)
![Screenshot (350)](https://github.com/user-attachments/assets/4180950c-7cd4-41dd-89ec-a0bb794bcd31)


## 🌍 Deployment
The backend is deployed on **Render/Railway**.  
🔗 **Live URL:** [[Deployment](https://eventify-tcza.onrender.com)](#)

---
