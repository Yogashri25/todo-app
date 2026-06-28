import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { TodoProvider } from "./context/TodoContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TodoDetails from "./pages/TodoDetails";

function App() {
  return (
    <BrowserRouter>
      <TodoProvider>
        <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Inter', sans-serif" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<TodoDetails />} />
          </Routes>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: "#1e293b", color: "#f1f5f9", border: "1px solid #334155" },
              success: { iconTheme: { primary: "#7c3aed", secondary: "white" } },
            }}
          />
        </div>
      </TodoProvider>
    </BrowserRouter>
  );
}

export default App;
