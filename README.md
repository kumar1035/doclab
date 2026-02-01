# DocLab – Dockerized Full-Stack Message Board with Users

DocLab is a **full-stack web application** built using **React, Node.js, PostgreSQL, and Docker**.  
The application allows users to post messages, stores them persistently in a relational database, and displays them in real time through a modern web interface.

This project demonstrates **real-world full-stack architecture**, **database relationships**, and **containerized deployment**.

---

## 🚀 Features

- User-based messaging system
- Each message is associated with a user
- React frontend with dynamic UI updates
- Node.js + Express REST API
- PostgreSQL relational database
- SQL joins for fetching user-message data
- Docker & Docker Compose for containerization
- Persistent database storage using Docker volumes
- Nginx for serving frontend and proxying API requests

---

## 🛠️ Tech Stack

### Frontend
- React (Create React App)
- CSS
- Nginx (production server)

### Backend
- Node.js
- Express.js
- PostgreSQL (`pg` library)

### DevOps
- Docker
- Docker Compose

---

## 📂 Project Structure

doclab/
├── frontend/
│ ├── src/
│ │ ├── App.js
│ │ ├── App.css
│ │ └── index.js
│ ├── Dockerfile
│ └── nginx.conf
├── backend/
│ ├── server.js
│ ├── db.js
│ ├── init.sql
│ └── Dockerfile
├── docker-compose.yml
└── README.md

---

## 🧠 System Architecture

Browser
↓
React Frontend (Nginx)
↓ /api
Node.js Backend (Express)
↓
PostgreSQL Database

---

## 🧩 Database Design

### Users Table
- Stores user information
- Each user can send multiple messages

### Messages Table
- Stores message content and timestamp
- References users using foreign key

**Relationship:**  
One-to-Many (User → Messages)

---

## ⚙️ Prerequisites

- Docker
- Docker Desktop
- Git

> No need to install Node.js or PostgreSQL locally.

---

## ▶️ How to Run the Project Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/kumar1035/doclab.git
cd doclab

2️⃣ Start the application
docker compose up --build
3️⃣ Access the application
Frontend:

http://localhost:3000
Backend API:

http://localhost:5000/api/messages

🗄️ Database Verification (PostgreSQL)

To view stored users and messages:

docker exec -it postgres psql -U postgres -d doclab
\dt
SELECT * FROM users;
SELECT * FROM messages;
\q(to exit)
🐳 Docker Implementation Details

Each service (frontend, backend, database) runs in a separate container

Docker Compose manages service orchestration

PostgreSQL data is persisted using Docker volumes

Backend communicates with database via Docker internal network

Nginx proxies API requests from frontend to backend

