# TodoFlow – Full Stack Todo Application

A full-stack Todo application built with **React** (frontend) and **Node.js + Express** (backend), featuring multi-page routing, full CRUD operations, filtering, search, and a polished dark UI.

---

## 🛠 Technologies Used

| Layer     | Technology                                |
|-----------|-------------------------------------------|
| Frontend  | React 18, React Router DOM v6, Axios      |
| State     | React Context API                         |
| UI        | Inline styles, react-hot-toast            |
| Backend   | Node.js, Express.js                       |
| Data      | JSON file (`todos.json`) via `fs` module  |
| IDs       | UUID v4                                   |
| Build     | Vite                                      |

---

## 📁 Folder Structure

todo-app/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Todo dashboard (route: /)
│   │   │   └── TodoDetails.jsx    # Single todo view (route: /todo?id=...)
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── TodoCard.jsx       # Individual todo card
│   │   │   └── TodoForm.jsx       # Add/Edit modal form
│   │   ├── services/
│   │   │   └── api.js             # Axios API calls
│   │   ├── context/
│   │   │   └── TodoContext.jsx    # Global state (Context API)
│   │   ├── App.jsx                # Router setup
│   │   └── main.jsx               # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   └── todoRoutes.js          # Express route definitions
│   ├── controllers/
│   │   └── todoController.js      # Business logic for each route
│   ├── models/
│   │   └── todos.json             # Persistent data storage
│   ├── server.js                  # Express app entry point
│   └── package.json
│
├── README.md
├── FEATURES.md
└── API.md

