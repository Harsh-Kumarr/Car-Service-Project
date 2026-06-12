# Smart Auto – AI Powered Car Service Platform

An AI-powered full-stack automobile service and diagnostics platform designed to streamline vehicle maintenance, service booking, and intelligent issue detection.

## Live Demo

**Application URL:** https://car-service-project-8uda.vercel.app

---

## Features

### User Module
- User registration and login with OTP verification
- Add and manage multiple vehicles
- Book vehicle services online
- Track service progress in real time
- AI-powered vehicle issue diagnosis

### Admin Module
- Manage and review all service bookings
- Accept or reject service requests
- Assign mechanics to service jobs
- Monitor platform activity through analytics dashboards

### Mechanic Module
- View assigned service tasks
- Update service and repair status
- Add service notes and inspection details

---

## AI Features

- Intelligent vehicle issue diagnosis
- Service cost estimation
- Issue urgency assessment and prioritization

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Zustand (State Management)
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### AI Integration
- Google Gemini API

---

## Project Structure

```text
Car-Service-Project/
├── frontend/
├── smart-auto-backend/
├── README.md
└── .env.example
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Harsh-Kumarr/Car-Service-Project.git
cd Car-Service-Project
```

---

## Environment Variables

Create environment files using the provided `.env.example` files as references.

### Backend (`smart-auto-backend/.env`)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Backend Setup

```bash
cd smart-auto-backend
npm install
npm run dev
```

The backend server will start on the configured port.

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at the local development URL provided by Vite.

---

## Deployment

The application is deployed and accessible at:

https://car-service-project-8uda.vercel.app

---

## License

This project is licensed under the MIT License.

## Author

Harsh Kumar

GitHub: https://github.com/Harsh-Kumarr
