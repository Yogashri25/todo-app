# Features & Functionalities

A complete list of all implemented features in TodoFlow.

---

## ✅ Core Todo Operations

### Add Todo
- Click **"+ Add Todo"** button on the dashboard
- Fill in the modal form with title (required), description, priority, due date, and notes
- Todo is saved to the backend and appears immediately in the list
- Toast notification confirms success

### Edit Todo
- Click **"Edit"** on any todo card (or from the details page)
- Pre-filled modal opens with existing values
- Update any field and save
- Toast notification confirms the update

### Delete Todo
- Click **"Delete"** on any todo card or from the details page
- A confirmation dialog appears: **"Are you sure? Yes / Cancel"**
- On confirmation, todo is permanently removed
- Toast notification confirms deletion

### Mark Complete / Reopen
- Click the **circle checkbox** or the **"Complete ✓"** button on a card
- Toggles status between Pending and Completed
- Completed todos appear with strikethrough styling and reduced opacity
- Toast message reflects the new status

---

## 🔍 Search

- **Live search bar** at the top of the dashboard
- Searches across both **title** and **description**
- Instantly filters the visible list as you type
- Case-insensitive

---

## 🔽 Filtering

| Filter | Behavior |
|--------|----------|
| All | Shows all todos |
| Pending | Shows only incomplete todos |
| Completed | Shows only completed todos |
| High / Medium / Low | Filters by priority level |

---

## ↕️ Sorting

| Sort Option | Behavior |
|-------------|----------|
| Newest | Most recently created todos appear first |
| Oldest | Earliest created todos appear first |

---

## 📅 Due Date

- Set a due date when creating or editing a todo
- Due date is displayed on the todo card
- **Overdue indicator** (⚠ Overdue in red) appears on cards and detail view if the due date has passed and the todo is not completed

---

## 🔴 Priority Levels

Three levels supported:
- **High** – displayed in red
- **Medium** – displayed in yellow/amber
- **Low** – displayed in green

Priority is color-coded on cards and shown as a badge on the details page.

---

## 📊 Statistics Dashboard

Displayed at the top of the Home page:
- **Total Tasks** – count of all todos
- **Completed** – count of completed todos
- **Pending** – count of pending todos

---

## 📄 Todo Details Page

Accessible via `/todo?id=<uuid>` (or by clicking **"View"** on any card).

Displays:
- Title
- Description
- Priority badge
- Status badge
- Due Date
- Created At (with time)
- Last Updated (with time)
- Notes
- Todo ID

---

## 🔔 Toast Notifications

Appears in the bottom-right corner for:
- Todo Added
- Todo Updated Successfully
- Todo Deleted
- Marked as Completed / Pending

---

## ✅ Confirmation Dialog

Before any delete action, a modal appears:
- **"Are you sure you want to delete [Todo Name]?"**
- Two options: **Yes, Delete** / **Cancel**
- Prevents accidental deletion

---

## 📭 Empty State

When no todos exist:
- Shows: **"No tasks yet"**
- Subtext: **"Start by adding your first todo."**
- Inline **"+ Create First Todo"** button

When filters/search return nothing:
- Shows: **"No matching tasks"**
- Subtext: **"Try adjusting your search or filters."**

---

## ⏳ Loading State

- Spinner displayed while API calls are in progress
- Prevents user interaction with stale data

---

## ❌ Error Handling

- If the backend is unreachable: displays **"Unable to connect to server. Please make sure the backend is running."**
- Form validation: Title is required; shows inline error message
- API errors show toast notifications with descriptive messages

---

## 📱 Responsive Design

The UI is responsive and works across:
- Desktop (full layout)
- Tablet (cards and filters stack cleanly)
- Mobile (full-width cards, stacked filters)

---

## 🧩 Input Validation

- **Title** is required (backend + frontend enforced)
- Title max length: 100 characters
- Empty title shows inline error: **"Title is required"**
- Server returns 400 status with message for invalid data

---

## 🌐 API Service Layer

All API calls are centralized in `frontend/src/services/api.js` using **Axios**:
- `getTodos()` – fetch all todos
- `getTodoById(id)` – fetch single todo
- `createTodo(data)` – add new todo
- `updateTodo(id, data)` – edit todo
- `toggleStatus(id)` – mark complete/pending
- `deleteTodo(id)` – remove todo

---

## 🔁 Context API (Global State)

State is managed via `TodoContext.jsx`:
- Avoids prop drilling across components
- All components access todos, loading state, error state, and action methods via `useTodos()` hook
