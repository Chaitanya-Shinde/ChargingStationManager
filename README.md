This is a repository to store the code related to the task assigned to me by Evoltsoft technologies on internshala.

# Charging Station Manager

A full-stack web application for managing and monitoring EV charging stations, built with Vue 3, Pinia, Tailwind CSS, Express.js, and MongoDB.

## Features

- User authentication (register/login)
- Add, update, delete, and list charging stations
- Live map view of all stations with status indicators
- Responsive UI with Tailwind CSS
- RESTful API with JWT authentication

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Backend Setup

1. Set following variables in your .env file:
   ```
   MONGO_DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:5173
   PORT=5000
   ```
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Set following variables in your .env file:
   ```
   VITE_API_URL=http://localhost:5000/
   ```
2. Install dependencies:
   ```
   cd frontend
   npm install
   ```
3. Start the frontend dev server:
   ```
   npm run dev
   ```

### Deployment
  This project has been deployed on Vercel, refer the github repository for info on deployments.
  Deployment link: https://charging-station-manager-frontend.vercel.app/

- Both frontend and backend have vercel.json for Vercel deployment.
- Set environment variables in Vercel dashboard for both frontend and backend.

## API Endpoints
  Following are the API endpoints:
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive JWT
- `GET /stations` — List all stations (auth required)
- `POST /stations` — Add a new station (auth required)
- `PUT /stations/:id` — Update a station (auth required)
- `DELETE /stations/:id` — Delete a station (auth required)

## Technologies Used

- **Frontend:** Vue 3, Pinia, Vue Router, Tailwind CSS, Leaflet, FontAwesome
- **Backend:** Express.js, MongoDB, Mongoose, JWT, bcryptjs, dotenv


## Future improvements/ features to be added.
- User Roles
- Search and filter results
- security and performance features such as rate limiting, input sanitization and validation, better error handling, CI/CD, testing, and type safety.