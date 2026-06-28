import { useState, useEffect, useMemo } from "react";
import { useTodos } from "../context/TodoContext";
import TodoCard from "../components/TodoCard";
import TodoForm from "../components/TodoForm";

const Home = () => {
  const { todos, loading, error, fetchTodos, addTodo, editTodo, removeTodo, toggleTodoStatus } = useTodos();
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => { fetchTodos(); }, [fetchTodos]);

  const stats = useMemo(() => ({
    total: todos.length,
    completed: todos.filter((t) => t.status === "Completed").length,
    pending: todos.filter((t) => t.status === "Pending").length,
  }), [todos]);

  const filtered = useMemo(() => {
    let list = [...todos];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q));
    }
    if (filter !== "All") list = list.filter((t) => t.status === filter);
    if (priorityFilter !== "All") list = list.filter((t) => t.priority === priorityFilter);
    list.sort((a, b) => {
      const da = new Date(a.createdAt), db = new Date(b.createdAt);
      return sort === "Newest" ? db - da : da - db;
    });
    return list;
  }, [todos, search, filter, priorityFilter, sort]);

  const handleEdit = (todo) => { setEditData(todo); setShowForm(true); };
  const handleCloseForm = () => { setShowForm(false); setEditData(null); };
  const handleSubmit = (form) => editData ? editTodo(editData.id, form) : addTodo(form);
  const handleDeleteClick = (id, title) => setConfirmDelete({ id, title });
  const handleConfirmDelete = () => { if (confirmDelete) removeTodo(confirmDelete.id); setConfirmDelete(null); };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Todo Dashboard</h1>
          <p style={styles.subtext}>Manage your tasks efficiently</p>
        </div>
        <button style={styles.addBtn} onClick={() => setShowForm(true)}>+ Add Todo</button>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        {[
          { label: "Total Tasks", value: stats.total, color: "#7c3aed" },
          { label: "Completed", value: stats.completed, color: "#16a34a" },
          { label: "Pending", value: stats.pending, color: "#d97706" },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <span style={{ ...styles.statNum, color: s.color }}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div style={styles.controls}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search todos..."
          style={styles.search}
        />
        <div style={styles.filterRow}>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Filter:</span>
            {["All", "Pending", "Completed"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ ...styles.filterBtn, ...(filter === f ? styles.filterBtnActive : {}) }}>
                {f}
              </button>
            ))}
          </div>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Priority:</span>
            {["All", "High", "Medium", "Low"].map((p) => (
              <button key={p} onClick={() => setPriorityFilter(p)}
                style={{ ...styles.filterBtn, ...(priorityFilter === p ? styles.filterBtnActive : {}) }}>
                {p}
              </button>
            ))}
          </div>
          <div style={styles.filterGroup}>
            <span style={styles.filterLabel}>Sort:</span>
            {["Newest", "Oldest"].map((s) => (
              <button key={s} onClick={() => setSort(s)}
                style={{ ...styles.filterBtn, ...(sort === s ? styles.filterBtnActive : {}) }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div style={styles.center}>
          <div style={styles.spinner} />
          <p style={{ color: "#64748b" }}>Loading your todos...</p>
        </div>
      )}
      {error && <div style={styles.errorBox}>{error}</div>}
      {!loading && !error && filtered.length === 0 && (
        <div style={styles.empty}>
          <span style={styles.emptyIcon}>📋</span>
          <h3 style={styles.emptyTitle}>{todos.length === 0 ? "No tasks yet" : "No matching tasks"}</h3>
          <p style={styles.emptyText}>
            {todos.length === 0 ? "Start by adding your first todo." : "Try adjusting your search or filters."}
          </p>
          {todos.length === 0 && (
            <button style={styles.addBtn} onClick={() => setShowForm(true)}>+ Create First Todo</button>
          )}
        </div>
      )}
      {!loading && !error && filtered.length > 0 && (
        <div style={styles.list}>
          {filtered.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onToggle={toggleTodoStatus}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showForm && <TodoForm onSubmit={handleSubmit} onClose={handleCloseForm} editData={editData} />}
      {confirmDelete && (
        <div style={styles.overlay}>
          <div style={styles.confirmBox}>
            <h3 style={{ color: "#f1f5f9", marginBottom: "8px" }}>Delete Todo?</h3>
            <p style={{ color: "#94a3b8", marginBottom: "20px" }}>
              Are you sure you want to delete <strong style={{ color: "#f87171" }}>"{confirmDelete.title}"</strong>? This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button style={styles.cancelBtn} onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button style={styles.deleteBtn} onClick={handleConfirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" },
  heading: { color: "#f1f5f9", fontSize: "1.8rem", fontWeight: "700", margin: 0 },
  subtext: { color: "#64748b", fontSize: "0.9rem", marginTop: "4px" },
  addBtn: {
    background: "#7c3aed", color: "white", border: "none", padding: "10px 20px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem",
  },
  statsRow: { display: "flex", gap: "1rem", marginBottom: "1.5rem" },
  statCard: {
    flex: 1, background: "#1e293b", border: "1px solid #334155", borderRadius: "12px",
    padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center",
  },
  statNum: { fontSize: "2rem", fontWeight: "700" },
  statLabel: { color: "#64748b", fontSize: "0.8rem", fontWeight: "500" },
  controls: { background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "1rem", marginBottom: "1.5rem" },
  search: {
    width: "100%", boxSizing: "border-box", background: "#0f172a", border: "1px solid #334155",
    borderRadius: "8px", color: "#f1f5f9", padding: "10px 14px", fontSize: "0.9rem",
    outline: "none", marginBottom: "12px",
  },
  filterRow: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  filterGroup: { display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" },
  filterLabel: { color: "#64748b", fontSize: "0.8rem", fontWeight: "500" },
  filterBtn: {
    background: "#0f172a", border: "1px solid #334155", color: "#94a3b8", padding: "4px 12px",
    borderRadius: "20px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "500",
  },
  filterBtnActive: { background: "#4c1d95", borderColor: "#7c3aed", color: "#c4b5fd" },
  list: { display: "flex", flexDirection: "column", gap: "12px" },
  center: { display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem", gap: "12px" },
  spinner: {
    width: "36px", height: "36px", borderRadius: "50%",
    border: "3px solid #334155", borderTopColor: "#7c3aed",
    animation: "spin 0.8s linear infinite",
  },
  errorBox: {
    background: "#7f1d1d33", border: "1px solid #dc262644", color: "#f87171",
    borderRadius: "10px", padding: "1rem 1.25rem", textAlign: "center",
  },
  empty: {
    display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem",
    background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", gap: "12px",
  },
  emptyIcon: { fontSize: "3rem" },
  emptyTitle: { color: "#f1f5f9", fontSize: "1.2rem", fontWeight: "600", margin: 0 },
  emptyText: { color: "#64748b", fontSize: "0.9rem", margin: 0, textAlign: "center" },
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 200, padding: "1rem",
  },
  confirmBox: {
    background: "#1e293b", borderRadius: "12px", padding: "1.5rem",
    width: "100%", maxWidth: "400px", border: "1px solid #334155",
  },
  cancelBtn: {
    background: "#334155", border: "none", color: "#94a3b8", padding: "8px 18px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "500",
  },
  deleteBtn: {
    background: "#7f1d1d", border: "none", color: "#fca5a5", padding: "8px 18px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "600",
  },
};

export default Home;
