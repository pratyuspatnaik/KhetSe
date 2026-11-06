# 🌾 KhetSe

### Direct From Farm. Zero Extra Cost.

KhetSe is a digital agricultural marketplace designed to connect **farmers, FPOs, buyers, and other participants in the agricultural supply chain** through a more direct and transparent platform.

The project was developed as a **Smart India Hackathon 2026** solution focused on reducing unnecessary intermediaries and improving the way agricultural produce moves from producers to buyers.

<p align="center">
  <a href="https://cache22.in">🌐 Live Website</a>
</p>

---

## 🎯 Problem

Traditional agricultural supply chains can involve multiple intermediaries between farmers and consumers or bulk buyers.

This can lead to:

- Lower realization for farmers
- Higher prices for buyers
- Limited price transparency
- Inefficient discovery of buyers
- Communication gaps across the supply chain

KhetSe explores a **direct digital marketplace** that brings these stakeholders closer together.

---

## 💡 Solution

KhetSe provides a unified platform where agricultural producers can showcase their produce while buyers can discover and interact with available listings.

```text
Farmer / FPO
      │
      ▼
  Produce Listing
      │
      ▼
KhetSe Marketplace
      │
      ▼
   Buyer
      │
      ▼
   Order
```

The platform also lays the foundation for authentication, user profiles, logistics, market information, and future AI-powered services.

---

## ✨ Key Features

### 🛒 Marketplace

- Browse agricultural produce
- Search and filter listings
- View product and seller information
- Add products to cart
- Place and track orders through the frontend experience

### 👨‍🌾 Multi-Role Platform

Dedicated experiences for different participants, including:

- Farmers / Sellers
- Buyers
- Transporters

### 🔐 Authentication

The backend provides:

- Mobile-number registration
- Password-based login
- OTP-based login
- JWT authentication
- Secure password hashing
- Authenticated user profile access

### 👤 User Profiles

Users can maintain information such as:

- Name
- Mobile number
- Role
- Address
- Location
- Language preference
- UPI information
- Profile completion details

### 📊 Market Information

The frontend includes interfaces for displaying agricultural market/mandi information alongside marketplace data.

### 📱 Responsive UI

The frontend is designed for desktop and mobile-oriented usage with dedicated pages for marketplace, authentication, orders, cart, and other user flows.

---

## 🏗️ Architecture

```mermaid
flowchart LR
    U[User] --> F[Frontend]

    subgraph Frontend
        HTML[HTML]
        CSS[CSS]
        JS[JavaScript]
    end

    F --> API[FastAPI Backend]

    subgraph Backend
        AUTH[Authentication API]
        SEC[JWT + Password Security]
        ORM[SQLAlchemy]
    end

    API --> AUTH
    AUTH --> SEC
    AUTH --> ORM
    ORM --> DB[(PostgreSQL)]
```

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js
- Lucide / Iconify
- Google Fonts

### Backend

- Python 3.12+
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- PostgreSQL
- psycopg2
- JWT
- Bcrypt
- python-dotenv

### Deployment

- Vercel
- Custom domain: `cache22.in`

---

## 📁 Project Structure

```text
KhetSe/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── auth.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── security.py
│   └── main.py
│
├── frontend/
│   ├── pages/
│   ├── style/
│   ├── script/
│   └── index.html
│
├── CNAME
├── pyproject.toml
├── requirements.txt
└── ...
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

- Python 3.12+
- PostgreSQL
- Git

## 1. Clone the repository

```bash
git clone https://github.com/pratyuspatnaik/KhetSe.git
cd KhetSe
```

## 2. Create a virtual environment

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 4. Configure environment variables

Create a `.env` file for the backend and configure your PostgreSQL connection and JWT secret.

Example:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/krishimandi_db
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

> Never commit production secrets or `.env` files to GitHub.

## 5. Run the backend

```bash
uvicorn backend.main:app --reload --port 8000
```

The application will be available at:

```text
http://localhost:8000
```

### API Documentation

FastAPI automatically provides interactive API documentation:

```text
http://localhost:8000/docs
```

---

## 🔌 API Highlights

The current backend includes authentication and user-profile APIs such as:

```text
POST  /api/auth/register
POST  /api/auth/login
POST  /api/auth/otp/send
POST  /api/auth/otp/login
POST  /api/auth/complete-profile
GET   /api/auth/me
PUT   /api/auth/profile
PATCH /api/auth/profile

GET   /api/health
```

These APIs provide the foundation for integrating the frontend with persistent user accounts and future marketplace services.

---

## 🗺️ Roadmap

KhetSe is being developed as an evolving MVP.

### Current

- [x] Marketplace-oriented frontend
- [x] Buyer / seller / transporter flows
- [x] Authentication backend
- [x] JWT-based sessions
- [x] PostgreSQL database layer
- [x] User profile management

### Next

- [ ] Persistent produce listings
- [ ] End-to-end cart and order APIs
- [ ] Farmer inventory management
- [ ] Real-time logistics and delivery tracking
- [ ] Live mandi-price integration
- [ ] Payment integration
- [ ] AI-powered demand forecasting
- [ ] Intelligent crop grading
- [ ] Multilingual / voice-based assistance

---

## 👥 Team

Built collaboratively by:

- **Pratyus Patnaik**
- **Pratikshya Rath**
- **Pratyush Kanungo**
- **Om Debadutta Mohapatra**
- **Suchismita Singh**
- **Abhishek Mishra**

---

## 🌱 Vision

KhetSe aims to move towards a more transparent agricultural ecosystem where producers can reach buyers more directly, buyers can discover produce more efficiently, and technology can help improve coordination across the supply chain.

> **From the farm to the buyer — with fewer unnecessary intermediaries.**

---
