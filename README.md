# WFH Attendance System

This is a monolithic-like microservices repository for the WFH Attendance System, containing both the React frontend and the NestJS backend microservices.

## Project Structure
- `frontend/` - React Vite application
- `backend/apps/gateway/` - NestJS API Gateway
- `backend/apps/user-service/` - NestJS User & Employee Microservice
- `backend/apps/attendance-service/` - NestJS Attendance Microservice

## Prerequisites
- Node.js (v18 or later recommended)
- MySQL Database

## 1. Installation

To install all dependencies for the root, frontend, and all backend services, run the following command from the **root directory**:

```bash
npm run install:all
```
*(This command will automatically traverse into `frontend`, `gateway`, `user-service`, and `attendance-service` to run `npm install`)*

## 2. Environment Configuration

You need to configure the `.env` file for the frontend and each backend service.

Copy the `.env.example` file to `.env` in the following directories and update the values according to your local setup (especially database credentials):

1. **Frontend**:
   ```bash
   cp frontend/.env.example frontend/.env
   ```
2. **API Gateway**:
   ```bash
   cp backend/apps/gateway/.env.example backend/apps/gateway/.env
   ```
3. **User Service**:
   ```bash
   cp backend/apps/user-service/.env.example backend/apps/user-service/.env
   ```
   *(Make sure to update `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`)*
4. **Attendance Service**:
   ```bash
   cp backend/apps/attendance-service/.env.example backend/apps/attendance-service/.env
   ```
   *(Make sure to update `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`)*

## 3. Database Migration

Once your database is running and the `.env` files are configured, run the database migrations to create the necessary tables. 

From the **root directory**, run:

```bash
npm run migrate
```
*(This will run TypeORM migrations for both the user-service and attendance-service)*

## 4. Starting the Application

To start the frontend and all backend services concurrently, run the following command from the **root directory**:

```bash
npm run start
```

This will spin up:
- Frontend (React + Vite)
- API Gateway
- User Service
- Attendance Service

The application will be accessible at the URL specified in your frontend `.env` (usually `http://localhost:5173`).
