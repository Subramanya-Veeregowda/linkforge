# LinkForge

> A scalable URL shortening platform with analytics, QR generation, and system design focused architecture.

---

## Overview

LinkForge is a full-stack URL shortener built with scalability and real-world backend architecture in mind.

It goes beyond a simple tool and evolves into a **production-ready system** with:
- URL shortening
- Custom aliases
- Expiry support
- QR code generation
- Rate limiting
- (Upcoming) Authentication, analytics, Kafka streaming, Redis caching

---

## Features (Version 1)

-  Shorten long URLs
-  Custom alias support
-  Expiry date & time
-  Optional password protection
-  QR code generation
-  Rate limiting (basic protection)
-  Clean UI with React

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Lucide Icons

### Backend
- Spring Boot
- REST APIs
- MySQL

### Tools
- Git & GitHub
- Postman
- Maven

---

## Architecture (Current)


Client (React)
↓
Spring Boot API
↓
MySQL Database


---

## Future Architecture (Planned)

Client
↓
API Gateway
↓
| Link Service |
| Auth Service |
| Analytics Service |

↓
Kafka → Consumers → DB
↓
Redis Cache Layer


---

## API Endpoints (Core)

### 🔹 Create Short URL

POST /api/links


### 🔹 Redirect

GET /{shortCode}


### 🔹 QR Details

GET /api/qr/details/{shortCode}


---

## Setup Instructions

### 1. Clone Repository


git clone https://github.com/YOUR_USERNAME/LinkForge.git

cd LinkForge


---

### 2. Backend Setup


cd backend


Create:

application.properties


Add your DB config:


spring.datasource.url=jdbc:mysql://localhost:3306/linkforge
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD


Run:

mvn spring-boot:run


---

### 3. Frontend Setup


cd frontend
npm install
npm run dev


---

## Security Note

Sensitive configs like database credentials are **not committed**.

Use:

application.properties (local only)
application-example.properties (for reference)


---

## Version Roadmap

This project is developed in multiple versions to demonstrate system evolution.

### Version 1 — Core Product
- URL shortening
- Custom alias
- Expiry
- QR generation
- Rate limiting

## Release: (add link after release)

---

### Version 2 — User System
- JWT Authentication
- User-specific links
- History dashboard

---

### Version 3 — Performance Optimization
- Redis caching
- Faster redirects
- Reduced DB load

---

### Version 4 — Event-Driven Architecture
- Kafka integration
- Async click tracking
- High throughput handling

---

### Version 5 — Advanced Analytics
- Stream processing (Apache Beam)
- Real-time insights
- Trending links

---

## Key Design Decisions

-  Rate limiting to prevent abuse
-  Stateless backend for scalability
-  Modular structure for future microservices
-  Async processing (planned via Kafka)
-  Cache layer (Redis planned)

---

## Scaling Strategy

- Redis caching for hot data
- Kafka for high write throughput
- DB indexing on short_code
- Horizontal scaling support
- Future DB sharding

---

## Screenshots

_Add screenshots here_

---

## Future Improvements

- Link analytics dashboard
- Password-protected access flow
- Mobile responsiveness improvements
- Dark mode UI
- Admin panel

---

## Docker (Planned)

Docker support will be added in later versions for:
- Backend service
- Frontend service
- Kafka & Redis integration

---

## Author

**Subramanya V**

---

## Show your support 

If you like this project, give it a ⭐ on GitHub!