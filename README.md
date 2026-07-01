# Todo App – Ziptrrip Developer Assignment

A full-stack Todo application built with React (frontend) and Node.js + Express (backend). Data is saved in a JSON file.

## Features

### Todo List Page (/todos)
- View all todos in a list
- Add a new todo (title, description, priority, due date)
- Mark todo as done / pending using checkbox
- Delete a todo
- Filter todos by status: All, Pending, In-Progress, Done
- Search todos by title
- View stats: Total, Pending, Done count
- Click View to open the detail page of any todo

### Todo Detail Page (/todo?id=<todoId>)
- Receives todo ID as a query parameter
- Displays full todo information
- Edit todo title, description, status, priority, due date
- Save changes
- Delete todo from detail page
- Back button to return to list

## Tech Stack
- Frontend: React 18, React Router v6
- Backend: Node.js, Express.js
- Storage: JSON file (todos.json)

## How to Run

### Backend
cd backend
npm install
node server.js

### Frontend
cd frontend
npm install
npm start

## API Endpoints
GET    /api/todos        - Get all todos
GET    /api/todos/:id    - Get single todo
POST   /api/todos        - Create new todo
PUT    /api/todos/:id    - Update todo
DELETE /api/todos/:id    - Delete todo
