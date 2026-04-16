# Fashora - E-Commerce Website

A full-stack e-commerce platform built with modern web technologies, featuring a customer-facing store, admin dashboard, and robust backend API with real-time functionality.

---

## Project Overview

Fashora is a complete e-commerce solution consisting of three main applications:
- **Frontend**: Customer-facing store with product browsing, shopping cart, and order management
- **Admin**: Dashboard for managing products, orders, and admin operations
- **Backend**: RESTful API server with WebSocket support for real-time notifications and payments via Stripe

---

## Project Structure

```
├── frontend/         # React customer store
├── admin/            # React admin dashboard
└── backend/          # Express.js API server
```

---

## Technology Stack

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
- **BullMQ + Redis** - Background AI job queue and worker processing
- **Google Gemini API** - AI-powered product name/description generation

---

## Key Features

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
- AI-assisted product name and description generation from product images

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
- AI generation jobs with queue-based processing and status polling

---

## AI Generation Feature (Admin)

The admin app includes an AI-powered generation flow that helps create:
- **Product Name** (short title)
- **Product Description** (professional product copy)

This feature is available while adding and updating products in the admin dashboard.

### What It Does

1. Admin uploads one or more product images.
2. Images are uploaded temporarily to Cloudinary (`/api/v1/upload/temp-upload`).
3. Admin clicks **Generate with AI** for either `name` or `description`.
4. Backend creates an AI job and pushes it to BullMQ queue (`ai-generation`).
5. Worker consumes the job, calls Gemini with image + prompt, and stores the result.
6. Admin UI polls job status every 2 seconds until `completed` or `failed`.
7. On success, generated text is auto-filled into the form.
8. Temporary images are cleaned up after processing.

### Supported Job Types

- `name`: Generates a concise e-commerce product title.
- `description`: Generates a 100-150 word description and sanitizes model output (removes markdown/meta text).

### AI API Endpoints

Base route: `/api/v1/ai`

- `POST /create`
	- Auth: Admin JWT required
	- Body:
		- `type`: `"name" | "description"`
		- `images`: `[{ url, public_id, isTemp? }]`
	- Response: returns `jobId`

- `GET /:jobId`
	- Auth: Admin JWT required
	- Returns job payload with:
		- `status`: `pending | processing | completed | failed`
		- `result`: generated text (if completed)
		- `error`: reason (if failed)

### Queue + Worker Behavior

- Queue name: `ai-generation`
- Retries: up to 3 attempts (exponential backoff)
- Worker concurrency: 3 jobs
- AI timeout: 15 seconds per generation attempt
- Pending-job stale protection: jobs pending too long are marked failed
- Duplicate-in-flight protection: recently created matching processing jobs can be reused
- Fallback safety: if queue pickup is delayed, backend has a delayed direct-processing fallback

### Environment Variables Required

In backend `.env`:
- `GEMINI_API_KEY`
- `GEMINI_MODEL` (default example: `gemini-2.5-flash`)
- `REDIS_URL` (default local: `redis://127.0.0.1:6379`)

Also required for image flow:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### How To Run AI Generation Locally

From `backend/` run both processes:

```bash
npm run server
npm run worker
```

Then run admin app:

```bash
cd ../admin
npm run dev
```

## Contributing

Feel free to fork this project, create a feature branch, and submit pull requests.

---

## 👨Author

Created as a full-stack e-commerce solution combining modern frontend frameworks with a robust backend API.

---

## Notes

- Images are stored on **Cloudinary** for optimal performance
- MongoDB is used for data persistence
- Environment variables must be configured for all three applications
- The backend server handles WebSocket connections for real-time updates
- AI generation is **admin-only**.
- The backend tries multiple Gemini model candidates if one is unavailable.
- If AI returns empty/invalid output, the job is marked failed and surfaced to the UI.
- The UI shows loading state while polling and handles success/failure with toast notifications.

---