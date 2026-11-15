# Daylist

A full-stack task manager built with React, Express and MongoDB.

## Features

- Add, edit and delete tasks.
- Assign low, medium or high priority.
- Mark tasks as active or completed.
- Filter tasks and view task counts.
- Store tasks in MongoDB.
- Display loading states and request errors.
- Responsive layout.

## Technologies

React, Vite, JavaScript, CSS, Node.js, Express, Mongoose
and MongoDB Atlas.

## Run locally

### Requirements

- Node.js and npm.
- Globally installed nodemon.
- MongoDB Atlas database credentials and an allowed IP address.

### Install dependencies

Open a terminal in the `todo-app` directory and run:

```bash
cd frontend
npm install
cd ../backend
npm install
```

### Configure the database

Copy `backend/config.env.example` to `backend/config.env`.

In `config.env`, set `DATABASE` to your Atlas connection string
targeting the `daylist` database. Keep `PORT=8000`.

Never commit real database credentials.

### Start the backend

From the `backend` directory:

```bash
npm run dev
```

### Start the frontend

Open another terminal in the `todo-app` directory and run:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite.
Both the frontend and backend must remain running.

Open the URL printed by Vite. Both servers must remain running.

## Build the frontend

Open a terminal in the `todo-app` directory and run:

```bash
cd frontend
npm run build
```

The generated files are placed in `frontend/dist`.
API routing for production must be configured when deploying.

The generated files are placed in `dist`.
API routing for production must be configured when deploying.

## Current scope

User authentication is not implemented.
All tasks belong to a shared dataset.