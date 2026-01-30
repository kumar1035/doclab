# DocLab – Dockerized Full-Stack Message Board

DocLab is a full-stack web application built using React, Node.js, PostgreSQL, and Docker.  
The project demonstrates how a modern web application can be containerized and run using Docker Compose with a clean separation of frontend, backend, and database services.

---

## 🚀 Features

- React-based frontend UI
- Node.js + Express backend REST API
- PostgreSQL relational database
- Docker & Docker Compose for containerization
- Nginx used to serve frontend and proxy API requests
- Persistent database storage using Docker volumes

---

## 🛠️ Tech Stack

### Frontend
- React (Create React App)
- Nginx

### Backend
- Node.js
- Express.js
- PostgreSQL

### DevOps
- Docker
- Docker Compose

---

## 📂 Project Structure
doclab/
├── frontend/
│ ├── src/
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
