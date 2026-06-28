import { useNavigate } from "react-router-dom";

const priorityColors = {
  High: { bg: "#fef2f2", border: "#fca5a5", text: "#dc2626" },
  Medium: { bg: "#fffbeb", border: "#fcd34d", text: "#d97706" },
  Low: { bg: "#f0fdf4", border: "#86efac", text: "#16a34a" },
};

const TodoCard = ({ todo, onEdit, onDelete, onToggle }) => {
  const navigate = useNavigate();
  const p = priorityColors[todo.priority] || priorityColors.Medium;

  const isOverdue =
    todo.dueDate &&
    todo.status !== "Completed" &&
    new Date(todo.dueDate) < new Date(new Date().toDateString());

  const formatDate = (dateStr) => {
    if (!dateStr) return "No due date";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div style={{ ...styles.card, opacity: todo.status === "Completed" ? 0.75 : 1 }}>
      <div style={styles.topRow}>
        <button
          onClick={() => onToggle(todo.id)}
          style={{ ...styles.checkbox, ...(todo.status === "Completed" ? styles.checkboxDone : {}) }}
          title={todo.status === "Completed" ? "Mark as Pending" : "Mark as Complete"}
        >
          {todo.status === "Completed" && "✓"}
        </button>
        <div style={styles.titleWrap}>
          <h3 style={{ ...styles.title, ...(todo.status === "Completed" ? styles.strikethrough : {}) }}>
            {todo.title}
          </h3>
          {todo.description && (
            <p style={styles.desc}>{todo.description.length > 80 ? todo.description.slice(0, 80) + "…" : todo.description}</p>
          )}
        </div>
        <span
          style={{
            ...styles.priority,
            background: p.bg,
            border: `1px solid ${p.border}`,
            color: p.text,
          }}
        >
          {todo.priority}
        </span>
      </div>

      <div style={styles.meta}>
        <span style={{ ...styles.badge, ...(todo.status === "Completed" ? styles.badgeDone : styles.badgePending) }}>
          {todo.status}
        </span>
        <span style={{ ...styles.dueDate, ...(isOverdue ? styles.overdue : {}) }}>
          {isOverdue ? "⚠ Overdue: " : "📅 "}
          {formatDate(todo.dueDate)}
        </span>
      </div>

      <div style={styles.actions}>
        <button style={{ ...styles.btn, ...styles.btnView }} onClick={() => navigate(`/todo?id=${todo.id}`)}>
          View
        </button>
        <button style={{ ...styles.btn, ...styles.btnEdit }} onClick={() => onEdit(todo)}>
          Edit
        </button>
        <button style={{ ...styles.btn, ...styles.btnDelete }} onClick={() => onDelete(todo.id, todo.title)}>
          Delete
        </button>
        <button style={{ ...styles.btn, ...styles.btnToggle }} onClick={() => onToggle(todo.id)}>
          {todo.status === "Completed" ? "Reopen" : "Complete ✓"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "1.25rem",
    transition: "transform 0.15s, box-shadow 0.15s",
    cursor: "default",
  },
  topRow: { display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" },
  checkbox: {
    width: "22px",
    height: "22px",
    minWidth: "22px",
    borderRadius: "50%",
    border: "2px solid #475569",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "white",
    marginTop: "2px",
  },
  checkboxDone: { background: "#7c3aed", borderColor: "#7c3aed" },
  titleWrap: { flex: 1 },
  title: { color: "#f1f5f9", fontWeight: "600", fontSize: "1rem", margin: 0, lineHeight: "1.4" },
  strikethrough: { textDecoration: "line-through", color: "#64748b" },
  desc: { color: "#94a3b8", fontSize: "0.85rem", margin: "4px 0 0", lineHeight: "1.5" },
  priority: { fontSize: "0.75rem", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", whiteSpace: "nowrap" },
  meta: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" },
  badge: { fontSize: "0.75rem", fontWeight: "600", padding: "3px 10px", borderRadius: "20px" },
  badgeDone: { background: "#14532d33", color: "#4ade80", border: "1px solid #16a34a44" },
  badgePending: { background: "#1e40af22", color: "#60a5fa", border: "1px solid #1d4ed844" },
  dueDate: { fontSize: "0.8rem", color: "#64748b" },
  overdue: { color: "#f87171" },
  actions: { display: "flex", gap: "8px", flexWrap: "wrap" },
  btn: {
    padding: "5px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "500",
    transition: "opacity 0.2s",
  },
  btnView: { background: "#334155", color: "#94a3b8" },
  btnEdit: { background: "#1e40af", color: "#93c5fd" },
  btnDelete: { background: "#7f1d1d", color: "#fca5a5" },
  btnToggle: { background: "#4c1d95", color: "#c4b5fd" },
};

export default TodoCard;
