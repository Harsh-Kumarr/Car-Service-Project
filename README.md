# 🚗 Smart Auto – AI Powered Car Service Platform

An AI-powered full-stack automobile service and diagnostics platform.

---

## 🚀 Features

### 👤 User
- Register & Login (OTP verification)
- Add & manage vehicles
- Book car services
- Track service status
- AI-based vehicle diagnosis

### 🛠 Admin
- View all bookings
- Accept / Reject bookings
- Assign mechanics
- Dashboard analytics

### 🔧 Mechanic
- View assigned jobs
- Update job status
- Add service notes

---

## 🤖 AI Features
- AI-based issue diagnosis
- Cost estimation
- Urgency detection

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Zustand (state management)
- Framer Motion (animations)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### AI
- Google Gemini API

---

## 📂 Project Structure
---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-repository-url>
cd <repository-name>
```

### 2️⃣ Backend Setup
```bash
cd smart-auto-backend
npm install
```
- Create a `.env` file in the `smart-auto-backend` directory and add the necessary environment variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`).
- Start the server:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
```
- Create a `.env` file in the `frontend` directory if required by your configuration (e.g., `VITE_API_BASE_URL`).
- Start the frontend:
```bash
npm run dev
```

## 🛡️ License
This project is licensed under the MIT License.
