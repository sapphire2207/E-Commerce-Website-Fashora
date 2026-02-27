# Fashora - E-Commerce Website

A full-stack e-commerce platform built with modern web technologies, featuring a customer-facing store, admin dashboard, and robust backend API with real-time functionality.

---

## 📋 Project Overview

Fashora is a complete e-commerce solution consisting of three main applications:
- **Frontend**: Customer-facing store with product browsing, shopping cart, and order management
- **Admin**: Dashboard for managing products, orders, and admin operations
- **Backend**: RESTful API server with WebSocket support for real-time notifications and payments via Stripe

---

## 🏗️ Project Structure

```
├── frontend/         # React customer store
├── admin/            # React admin dashboard
└── backend/          # Express.js API server
```

---

## 🛠️ Technology Stack

### Frontend & Admin
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **Socket.io** - WebSocket for real-time features
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Cloudinary** - Image storage
- **Multer** - File upload handling

---

## ✨ Key Features

### Frontend (Customer Store)
- Product browsing and filtering
- Product search functionality
- Shopping cart management
- Secure user login & registration
- Email verification
- Order placement and tracking
- Real-time order notifications
- Wishlist/related products
- Responsive design

### Admin Dashboard
- Product management (add, edit, delete, list)
- Order management and tracking
- Admin authentication
- Real-time notifications
- Secure admin operations
- Dashboard overview

### Backend API
- User authentication & profile management
- Product management with pagination
- Shopping cart operations
- Order processing and management
- Payment integration with Stripe
- Real-time notifications via WebSocket
- Admin-specific operations
- Image upload and storage via Cloudinary
- Role-based access control

---

## 🤝 Contributing

Feel free to fork this project, create a feature branch, and submit pull requests.

---

## 👨‍💻 Author

Created as a full-stack e-commerce solution combining modern frontend frameworks with a robust backend API.

---

## 📝 Notes

- Images are stored on **Cloudinary** for optimal performance
- MongoDB is used for data persistence
- Environment variables must be configured for all three applications
- The backend server handles WebSocket connections for real-time updates

---