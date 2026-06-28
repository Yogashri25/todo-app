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

```
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
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v16+ installed
- npm installed

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo-app
```

### 2. Start the Backend

```bash
cd backend
npm install
npm start
```

The server starts at **http://localhost:5000**

### 3. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**

---

## 🚀 Features

See [FEATURES.md](./FEATURES.md) for the full list of implemented features.

---

## 📡 API Endpoints

See [API.md](./API.md) for full API documentation with request/response examples.

---

## 📸 Pages

### Home Page (`/`)
- Dashboard with statistics (Total, Completed, Pending)
- Search bar
- Filter by status (All / Pending / Completed)
- Filter by priority (All / High / Medium / Low)
- Sort by Newest / Oldest
- All todo cards with Edit, Delete, View, Complete buttons
- Add Todo modal

### Todo Details Page (`/todo?id=<uuid>`)
- Full details of a single todo
- Edit and Delete actions
- Toggle completion status
- Back button to return to dashboard

---

## 🔮 Future Improvements

- User authentication (login/signup)
- Due date reminder notifications
- Drag-and-drop reordering
- Labels/tags for todos
- Dark/light theme toggle
- Export todos to CSV
- Database integration (MongoDB or PostgreSQL)
