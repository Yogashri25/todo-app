import axios from "axios";

const api = axios.create({
  baseURL: "/todos",
  headers: { "Content-Type": "application/json" },
});

export const getTodos = () => api.get("/");
export const getTodoById = (id) => api.get(`/${id}`);
export const createTodo = (todo) => api.post("/", todo);
export const updateTodo = (id, todo) => api.put(`/${id}`, todo);
export const toggleStatus = (id) => api.patch(`/${id}/status`);
export const deleteTodo = (id) => api.delete(`/${id}`);

export default api;
