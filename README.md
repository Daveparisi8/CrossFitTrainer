## Application Details and function

A full-stack fitness application built with React, Flask, and MySQL that allows users to manage exercise movements, generate randomized workouts, and dynamically configure database connections at runtime.

This project was developed for the MSCS Database Principles course and demonstrates proper separation of concerns between frontend, backend, and database layers.

## Features

- User authentication (login & signup) (No hardcoded credentials. For demonstration purposes only. All creds are accepted for testing purposes)

- Runtime MySQL connection configuration (no hard-coded credentials in frontend)

- Live database connection status indicator

- View exercise movements and edit reps and weight volumes

- Random workout generator (1 movement per category)

- Recommended reps and weight stored at the database level

- Connection warnings and recovery messaging

## Architecture Overview

React (Frontend)
│
├── UI Components (LandingPage, Movements, Workout Generator)
│
├── Fetch API calls
│
Flask (Backend API)
│
├── doLogin.py (API routes)
├── BLL (Business Logic Layer)
├── DAL (Data Access Layer)
│
MySQL Database
│
├── fitness database
├── normalized tables

## Key Design Principles

Frontend never accesses the database directly

All database interaction is routed through Flask

Configuration updates happen via API endpoints

Business logic is isolated from SQL queries

## Tech Stack

Frontend

- React

- JavaScript (ES6+)

- CSS (custom, no frameworks)

Backend

- Python 3.13

- Flask

- Flask-CORS

- mysql-connector-python

Database

- MySQL 8+

- Fully normalized relational schema

## Project Structure

final-project/
├── back-end/
│   ├── doLogin.py
│   ├── config.py
│   ├── bll/
│   │   └── workout_bll.py
│   └── dal/
│       └── workout_dal.py
│
├── src/
│   ├── components/
│   │   ├── Movements.jsx
│   │   ├── RandomWorkoutGen.jsx
│   │   └── ConnectionModal.jsx
│   ├── LandingPage.jsx
│   ├── App.js
│   └── App.css
│
└── README.md

*** Database Schema ***

Core tables include:

- categories

- equipment

- movements

- workouts

- workout_movements

- users

- user_workout_progress

Each movement stores:

- Category

- Equipment

- Recommended reps

- Recommended weight

How to use app:

1. Set up test environments:

backend:
1a. Backend is python. http://127.0.0.1:5000/api/test-connection
2a. Cmd which must run in terminal is: py doLogin.py - runs on http://127.0.0.1:5000

frontend: 
1b. Frontend is Js/React. http://localhost:3000/
2b. Cmd which be run to relative path is npm start

2. config.py should have necessary credentials. These may be modified in-program under connection settings (some issues have been resolved, however this may still be buggy as UseStates do not seem to work reliably.)


Method	Endpoint	Description
GET	/api/test-connection	Verify database connectivity
POST	/api/update-config	Update MySQL credentials
GET	/api/movements	Retrieve all movements
POST	/api/movements/update	Update reps/weight
GET	/api/random-workout	Generate random workout


*** Notes & Limitations ***
Backend must be running for database connectivity
Passwords are not returned to the frontend
This project uses Flask’s development server (not production-ready)
Designed for academic demonstration, not deployment

Educational Objectives

- This project demonstrates:

- Proper use of DAL/BLL architecture

- SQL normalization and relational design

- Secure configuration handling

- RESTful API design

- Frontend/backend separation

*** Author details ***

Dave Parisi
M.S. Computer Science (Software Engineering)
Merrimack College
Database Principles – Final Project
December 2025