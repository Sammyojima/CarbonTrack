# CarbonTrack

**CarbonTrack** is a futuristic, web-based emissions intelligence dashboard designed for hydrogen generation units, ammonia plants, and gas-powered plants. It enables real-time monitoring, analysis, and optimization of CO₂ emissions, providing actionable insights to reduce carbon footprint while maintaining operational efficiency.

---

## 🌐 Live Demo

- **Frontend (Vercel)**: https://carbon-track-nine.vercel.app/
- **Backend API (Render)**: https://carbontrack-rwxo.onrender.com

---

## Features

### Frontend
- Dark/Light mode toggle for user preference.
- Animated hero section with fade-in text and buttons.
- Glassmorphism cards with hover effects.
- Responsive layout for mobile and desktop.
- Premium futuristic UI with dark gradients and shadows.

### Backend
- Secure authentication (register/login/logout) using JWT.
- REST API for handling process data, emission calculations, and reports.
- Integration-ready for future real-time data streaming from plant sensors.
- Scalable database support (MongoDB).

### Core Functionalities
- Real-time monitoring of emissions.
- Automated CO₂ calculations and trend visualizations.
- Historical data comparison and reporting.
- Recommendations engine for operational optimization.

---

## 🛠 Tech Stack

**Frontend:**
- React.js with React Router
- TailwindCSS for modern styling
- Framer Motion for animations
- React Icons for icons

**Backend:**
- Node.js & Express.js
- PostgreSQL / MongoDB (configurable)
- JWT-based authentication
- Axios for HTTP requests

---

## 📁 Project Structure

carbontrack/
│
├─ frontend/ # React.js app
│ ├─ src/
│ │ ├─ assets/
│ │ ├─ components/
│ │ ├─ context/
│ │ ├─ pages/
│ │ └─ App.jsx
│ └─ package.json
│
├─ backend/ # Node.js API
│ ├─ controllers/
│ ├─ models/
│ ├─ routes/
│ ├─ app.js
│ └─ package.json
│
└─ README.md


---

## ⚙️ Setup & Installation

### Frontend

cd frontend
npm install
npm run dev        # Run locally

### Backend

cd backend
npm install
npm run dev        # Run locally with nodemon

### 🔐 Environment Variables

Create a .env file in the backend folder:

PORT=5000
DB_URI=your_database_connection_string
JWT_SECRET=your_jwt_secret

For the frontend, create .env:

VITE_API_URL=https://carbontrack-rwxo.onrender.com


Note: Never commit .env files to GitHub.

### 🚀 Deployment
Frontend (Vercel)

Connect your GitHub repo to Vercel.

Set the environment variable VITE_API_URL to your backend URL.

Deploy and get your frontend URL.

Backend (Render)

Create a new Web Service in Render.

Connect your GitHub repo and select the backend folder.

Set environment variables (DB_URI, JWT_SECRET).

Deploy and get your backend API URL.

### 📝 Usage

Open the frontend URL in your browser.

Click Get Started → Login or Register.

Navigate the dashboard to input process data or view reports.

Toggle dark/light mode using the button at the top-right.

Use Dashboard, Reports, and Add Data features to manage and monitor emissions.

### 👤 Author

Samuel Ojima Idakwo
Chemical Engineer | Software Developer | Environmental Tech Enthusiast
LinkedIn: www.linkedin.com/in/samuel-o-idakwo
GitHub: Sammyojima

### 📄 License

This project is licensed under the MIT License. See the LICENSE
 file for details.
