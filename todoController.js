const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DATA_FILE = path.join(__dirname, "../models/todos.json");

// Helper: Read todos from file
const readTodos = () => {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
};

// Helper: Write todos to file
const writeTodos = (todos) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), "utf-8");
};
// GET /todos - Get all todos
const getAllTodos = (req, res) => {
  try {
    const todos = readTodos();
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to read todos", error: error.message });
  }
};

// GET /todos/:id - Get single todo
const getTodoById = (req, res) => {
  try {
    const todos = readTodos();
    const todo = todos.find((t) => t.id === req.params.id);
    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to read todo", error: error.message });
  }
};

// POST /todos - Create new todo
const createTodo = (req, res) => {
  try {
    const { title, description, priority, dueDate, notes } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const todos = readTodos();
    const newTodo = {
      id: uuidv4(),
      title: title.trim(),
      description: description ? description.trim() : "",
      priority: priority || "Medium",
      status: "Pending",
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: notes ? notes.trim() : "",
    };

    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json({ success: true, message: "Todo created successfully", data: newTodo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create todo", error: error.message });
  }
};

// PUT /todos/:id - Update full todo
const updateTodo = (req, res) => {
  try {
    const todos = readTodos();
    const index = todos.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    const { title, description, priority, dueDate, notes, status } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    todos[index] = {
      ...todos[index],
      title: title.trim(),
      description: description !== undefined ? description.trim() : todos[index].description,
      priority: priority || todos[index].priority,
      status: status || todos[index].status,
      dueDate: dueDate !== undefined ? dueDate : todos[index].dueDate,
      notes: notes !== undefined ? notes.trim() : todos[index].notes,
      updatedAt: new Date().toISOString(),
    };

    writeTodos(todos);
    res.status(200).json({ success: true, message: "Todo updated successfully", data: todos[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update todo", error: error.message });
  }
};

// PATCH /todos/:id/status - Toggle completion status
const toggleStatus = (req, res) => {
  try {
    const todos = readTodos();
    const index = todos.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    todos[index].status = todos[index].status === "Completed" ? "Pending" : "Completed";
    todos[index].updatedAt = new Date().toISOString();

    writeTodos(todos);
    res.status(200).json({ success: true, message: `Todo marked as ${todos[index].status}`, data: todos[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to toggle status", error: error.message });
  }
};

// DELETE /todos/:id - Delete a todo
const deleteTodo = (req, res) => {
  try {
    const todos = readTodos();
    const index = todos.findIndex((t) => t.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    const deleted = todos.splice(index, 1)[0];
    writeTodos(todos);
    res.status(200).json({ success: true, message: "Todo deleted successfully", data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete todo", error: error.message });
  }
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, toggleStatus, deleteTodo };
