import { createContext, useContext, useState, useCallback } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo, toggleStatus } from "../services/api";
import toast from "react-hot-toast";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTodos();
      setTodos(res.data.data);
    } catch {
      setError("Unable to connect to server. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = async (todoData) => {
    try {
      const res = await createTodo(todoData);
      setTodos((prev) => [...prev, res.data.data]);
      toast.success("Todo added successfully!");
      return true;
    } catch {
      toast.error("Failed to add todo.");
      return false;
    }
  };

  const editTodo = async (id, todoData) => {
    try {
      const res = await updateTodo(id, todoData);
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data.data : t)));
      toast.success("Todo updated successfully!");
      return true;
    } catch {
      toast.error("Failed to update todo.");
      return false;
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      toast.success("Todo deleted!");
    } catch {
      toast.error("Failed to delete todo.");
    }
  };

  const toggleTodoStatus = async (id) => {
    try {
      const res = await toggleStatus(id);
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data.data : t)));
      toast.success(res.data.message);
    } catch {
      toast.error("Failed to update status.");
    }
  };

  return (
    <TodoContext.Provider value={{ todos, loading, error, fetchTodos, addTodo, editTodo, removeTodo, toggleTodoStatus }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
