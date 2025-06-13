# **Project: StreamSync**

**Description:**  
StreamSync is a real-time data streaming platform using **React (Next.js) for the frontend**, **Node.js for the backend**, and **Kafka as a message broker**. It extracts, transforms, and loads (ETL) time-series data into a database and streams live updates to the UI using WebSockets.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project File Structure](#project-file-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Backend Implementation](#backend-implementation)
6. [Frontend Implementation](#frontend-implementation)
7. [Kafka Integration](#kafka-integration)
8. [WebSocket Streaming](#websocket-streaming)
9. [Deployment](#deployment)
10. [Future Enhancements](#future-enhancements)

---

## **1. Project Overview**

StreamSync processes real-time data through an **ETL pipeline**, using Kafka to decouple services. The system ensures that different components (data sources, processing units, UI) interact without dependencies, making it scalable and resilient.

### **Key Features:**

- **Real-time data streaming** to UI via WebSockets
- **Kafka-based message brokering** for decoupling services
- **ETL pipeline** to process and store structured data
- **React + Next.js frontend** with live updates
- **Node.js + Express backend** for API handling

---

## **2. Tech Stack**

### **Frontend (Client-Side)**

- **React.js (Next.js)** – Server-side rendering and static site generation
- **WebSockets** – Live data subscriptions
- **Tailwind CSS** – Styling

### **Backend (Server-Side)**

- **Node.js + Express** – REST API & WebSocket server
- **Kafka** – Message broker for real-time processing
- **PostgreSQL (or AWS DynamoDB)** – Database storage

### **Infrastructure**

- **AWS (EC2, S3, Lambda)** – Cloud hosting
- **Docker** – Containerized deployment
- **Hasura** – Auto-generating GraphQL APIs (optional)

---

## **3. Project File Structure**

```
StreamSync/                          # Root directory of the project
│── backend/                         # Folder - Node.js Backend
│   ├── src/                         # Folder - Source code for the backend
│   │   ├── controllers/             # Folder - API Controllers (to be implemented)
│   │   ├── kafka/                   # Folder - Kafka Producers & Consumers
│   │   │   └── kafkaConfig.js       # Kafka client, producer, consumer setup with retry and topic creation
│   │   ├── models/                  # Folder - Database Models (PostgreSQL) (to be implemented)
│   │   ├── routes/                  # Folder - API Routes (to be implemented)
│   │   │   └── index.js             # Basic API routes (to be implemented)
│   │   ├── server.js                # Express Server with Kafka setup
│   │   ├── websocket.js             # WebSocket Server broadcasting Kafka messages
│   ├── .env                         # Environment Variables (to be configured)
│   ├── package.json                 # Backend Dependencies (JSON)
│── frontend/                        # Folder - Next.js Frontend
│   ├── pages/                       # Folder - Next.js Pages
│   │   ├── index.js                 # Home Page (to be enhanced)
│   │   ├── dashboard.js             # Dashboard Page (to be implemented)
│   │   ├── api/                     # API Routes for Next.js (to be implemented)
│   ├── components/                  # Reusable UI Components
│   │   ├── Header.js                # Navigation Bar Component
│   │   ├── Footer.js                # Footer Component
│   ├── hooks/                       # Custom React Hooks
│   │   ├── useAuth.js               # Authentication Hook (example)
│   ├── styles/                      # Styling
│   │   ├── global.css               # Global CSS Styles
│   │   ├── theme.module.css         # Module CSS for Theming
│   ├── public/                      # Static Assets
│   │   ├── logo.png                 # Logo Image (PNG)
│   ├── package.json                 # Frontend Dependencies (JSON)
│── database/                        # Database Scripts
│   ├── schema.sql                   # Database Schema (SQL) (to be implemented)
│   ├── seed.sql                     # Sample Data for Testing (SQL) (to be implemented)
│── docker-compose.yml               # Docker Configuration (YAML)
│── .gitignore                       # Ignore Node Modules, Logs, etc. (Text)
│── LICENSE                          # MIT License (Text)
│── README.md                        # Documentation (Markdown)
```

---

## **4. Setup and Installation**

### **Prerequisites**

- Install **Node.js (v18+)**
- Install **Kafka** (via Docker or local setup)
- Install **PostgreSQL**

### **Backend Setup**

```bash
cd backend
npm install
cp .env.example .env  # Set up environment variables
node src/server.js
```

### **Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```

### **Running Kafka (Using Docker)**

```bash
docker-compose up
```

---

## **5. Backend Implementation (Completed So Far)**

- Created **Kafka client, producer, and consumer** with retry logic and topic creation in `backend/src/kafka/kafkaConfig.js`
- Setup **Express server** in `backend/src/server.js` with CORS, JSON parsing, and Kafka setup
- Created **WebSocket server** in `backend/src/websocket.js` that listens on port 8080 and sends connection confirmation
- Kafka consumer logs received messages; integration to broadcast to WebSocket clients is next step

---

## **6. Frontend Implementation (To Be Done)**

- Implement WebSocket client to connect to backend WebSocket server and receive live data
- Create UI components and pages to display live streaming data
- Use React hooks and Next.js pages for dynamic updates

---

## **7. Kafka Integration**

- Kafka setup with `kafkajs` in backend
- Producer and consumer with topic `"stream_topic"`
- Retry mechanism to ensure Kafka readiness before connecting

---

## **8. WebSocket Streaming**

- WebSocket server running on port 8080
- Sends initial connection message to clients
- Next: Broadcast Kafka messages to connected WebSocket clients

---

## **9. Deployment**

- Dockerfiles for backend and frontend (to be finalized)
- `docker-compose.yml` to orchestrate backend, frontend, Kafka, and database services

---

## **10. Future Enhancements**

- Implement API controllers, routes, and database models
- Add frontend dashboard and UI improvements
- Integrate database schema and seed data
- Add authentication and security features
- Implement GraphQL with Hasura and caching with Redis

---

# Summary of Progress

- Kafka connection and topic creation logic implemented with retries
- Backend Express server and WebSocket server created and running
- Kafka consumer logs messages; WebSocket integration pending
- Frontend setup pending implementation of WebSocket client and UI

---
