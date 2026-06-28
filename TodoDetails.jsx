import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getTodoById } from "../services/api";
import { useTodos } from "../context/TodoContext";
import TodoForm from "../components/TodoForm";

const priorityColors = {
  High: { bg: "#fef2f2", border: "#fca5a5", text: "#dc2626" },
  Medium: { bg: "#fffbeb", border: "#fcd34d", text: "#d97706" },
  Low: { bg: "#f0fdf4", border: "#86efac", text: "#16a34a" },
};

const TodoDetails = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const { editTodo, removeTodo, toggleTodoStatus } = useTodos();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchTodo = async () => {
    setLoading(true);
    try {
      const res = await getTodoById(id);
      setTodo(res.data.data);
    } catch {
      setError("Todo not found or server is unavailable.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) { setError("No todo ID provided."); setLoading(false); return; }
    fetchTodo();
  }, [id]);

  const handleEdit = async (form) => {
    const success = await editTodo(id, form);
    if (success) { await fetchTodo(); setShowEdit(false); }
    return success;
  };

  const handleDelete = async () => {
    await removeTodo(id);
    navigate("/");
  };

  const handleToggle = async () => {
    await toggleTodoStatus(id);
    await fetchTodo();
  };

  const format = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  if (loading) return (
    <div style={styles.center}>
      <div style={styles.spinner} />
      <p style={{ color: "#64748b" }}>Loading todo details...</p>
    </div>
  );

  if (error) return (
    <div style={styles.center}>
      <span style={{ fontSize: "3rem" }}>🔍</span>
      <p style={{ color: "#f87171", fontSize: "1.1rem" }}>{error}</p>
      <button style={styles.backBtn} onClick={() => navigate("/")}>← Back to Dashboard</button>
    </div>
  );

  const p = priorityColors[todo.priority] || priorityColors.Medium;
  const isOverdue = todo.dueDate && todo.status !== "Completed" && new Date(todo.dueDate) < new Date(new Date().toDateString());

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate("/")}>← Back to Dashboard</button>

      <div style={styles.card}>
        {/* Title Row */}
        <div style={styles.titleRow}>
          <div style={{ flex: 1 }}>
            <h1 style={{ ...styles.title, ...(todo.status === "Completed" ? styles.strike : {}) }}>
              {todo.title}
            </h1>
            <div style={styles.badges}>
              <span style={{ ...styles.badge, ...(todo.status === "Completed" ? styles.badgeDone : styles.badgePending) }}>
                {todo.status === "Completed" ? "✓ Completed" : "⏳ Pending"}
              </span>
              <span style={{ ...styles.badge, background: p.bg, border: `1px solid ${p.border}`, color: p.text }}>
                {todo.priority} Priority
              </span>
              {isOverdue && (
                <span style={{ ...styles.badge, background: "#7f1d1d33", border: "1px solid #dc262644", color: "#f87171" }}>
                  ⚠ Overdue
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div style={styles.grid}>
          <DetailRow label="Description" value={todo.description || "No description provided."} />
          <DetailRow label="Due Date" value={format(todo.dueDate)} highlight={isOverdue} />
          <DetailRow label="Created At" value={formatTime(todo.createdAt)} />
          <DetailRow label="Last Updated" value={formatTime(todo.updatedAt)} />
          {todo.notes && <DetailRow label="Notes" value={todo.notes} />}
          <DetailRow label="Todo ID" value={todo.id} mono />
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button style={styles.editBtn} onClick={() => setShowEdit(true)}>✎ Edit</button>
          <button style={styles.toggleBtn} onClick={handleToggle}>
            {todo.status === "Completed" ? "↺ Reopen" : "✓ Mark Complete"}
          </button>
          <button style={styles.deleteBtn} onClick={() => setConfirmDelete(true)}>🗑 Delete</button>
        </div>
      </div>

      {showEdit && <TodoForm onSubmit={handleEdit} onClose={() => setShowEdit(false)} editData={todo} />}

      {confirmDelete && (
        <div style={styles.overlay}>
          <div style={styles.confirmBox}>
            <h3 style={{ color: "#f1f5f9", marginBottom: "8px" }}>Delete this todo?</h3>
            <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
              "<strong style={{ color: "#f87171" }}>{todo.title}</strong>" will be permanently deleted.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button style={styles.cancelBtn} onClick={() => setConfirmDelete(false)}>Cancel</button>
              <button style={styles.confirmDeleteBtn} onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value, highlight, mono }) => (
  <div style={detailStyles.row}>
    <span style={detailStyles.label}>{label}</span>
    <span style={{
      ...detailStyles.value,
      color: highlight ? "#f87171" : mono ? "#a78bfa" : "#e2e8f0",
      fontFamily: mono ? "monospace" : "inherit",
      fontSize: mono ? "0.85rem" : "inherit",
    }}>
      {value}
    </span>
  </div>
);

const detailStyles = {
  row: {
    display: "flex", flexDirection: "column", gap: "4px", padding: "1rem",
    background: "#0f172a", borderRadius: "8px", border: "1px solid #1e293b",
  },
  label: { color: "#64748b", fontSize: "0.78rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" },
  value: { color: "#e2e8f0", fontSize: "0.95rem", lineHeight: "1.6" },
};

const styles = {
  page: { maxWidth: "750px", margin: "0 auto", padding: "2rem 1.5rem" },
  backBtn: {
    background: "#1e293b", border: "1px solid #334155", color: "#94a3b8",
    padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem",
    marginBottom: "1.5rem", fontWeight: "500",
  },
  card: {
    background: "#1e293b", border: "1px solid #334155", borderRadius: "16px",
    padding: "1.5rem", boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  titleRow: { marginBottom: "1.5rem" },
  title: { color: "#f1f5f9", fontSize: "1.6rem", fontWeight: "700", margin: "0 0 12px", lineHeight: "1.3" },
  strike: { textDecoration: "line-through", color: "#475569" },
  badges: { display: "flex", gap: "8px", flexWrap: "wrap" },
  badge: { fontSize: "0.8rem", fontWeight: "600", padding: "4px 12px", borderRadius: "20px", border: "1px solid transparent" },
  badgeDone: { background: "#14532d33", color: "#4ade80", border: "1px solid #16a34a44" },
  badgePending: { background: "#1e40af22", color: "#60a5fa", border: "1px solid #1d4ed844" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1.5rem" },
  actions: { display: "flex", gap: "12px", flexWrap: "wrap", borderTop: "1px solid #334155", paddingTop: "1rem" },
  editBtn: {
    background: "#1e40af", color: "#93c5fd", border: "none", padding: "9px 20px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem",
  },
  toggleBtn: {
    background: "#4c1d95", color: "#c4b5fd", border: "none", padding: "9px 20px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem",
  },
  deleteBtn: {
    background: "#7f1d1d", color: "#fca5a5", border: "none", padding: "9px 20px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem",
  },
  center: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    minHeight: "50vh", gap: "16px",
  },
  spinner: {
    width: "36px", height: "36px", borderRadius: "50%",
    border: "3px solid #334155", borderTopColor: "#7c3aed",
    animation: "spin 0.8s linear infinite",
  },
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 200,
  },
  confirmBox: {
    background: "#1e293b", borderRadius: "12px", padding: "1.5rem",
    width: "100%", maxWidth: "400px", border: "1px solid #334155", margin: "1rem",
  },
  cancelBtn: {
    background: "#334155", border: "none", color: "#94a3b8", padding: "8px 18px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "500",
  },
  confirmDeleteBtn: {
    background: "#7f1d1d", border: "none", color: "#fca5a5", padding: "8px 18px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "600",
  },
};

export default TodoDetails;
