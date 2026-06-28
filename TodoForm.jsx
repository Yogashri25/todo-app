import { useState, useEffect } from "react";

const TodoForm = ({ onSubmit, onClose, editData }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        priority: editData.priority || "Medium",
        dueDate: editData.dueDate || "",
        notes: editData.notes || "",
      });
    }
  }, [editData]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (form.title.trim().length > 100) errs.title = "Title must be under 100 characters";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const success = await onSubmit(form);
    if (success) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{editData ? "Edit Todo" : "Add New Todo"}</h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={styles.body}>
          <div style={styles.field}>
            <label style={styles.label}>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              style={{ ...styles.input, ...(errors.title ? styles.inputError : {}) }}
            />
            {errors.title && <span style={styles.error}>{errors.title}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add more details..."
              rows={3}
              style={styles.textarea}
            />
          </div>

          <div style={styles.row}>
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange} style={styles.select}>
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>
            <div style={{ ...styles.field, flex: 1 }}>
              <label style={styles.label}>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional notes..."
              rows={2}
              style={styles.textarea}
            />
          </div>
        </div>

        <div style={styles.footer}>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button style={styles.submitBtn} onClick={handleSubmit}>
            {editData ? "Update Todo" : "Add Todo"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex",
    alignItems: "center", justifyContent: "center", zIndex: 200, padding: "1rem",
  },
  modal: {
    background: "#1e293b", borderRadius: "16px", width: "100%", maxWidth: "520px",
    border: "1px solid #334155", boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "1.25rem 1.5rem", borderBottom: "1px solid #334155",
  },
  title: { color: "#f1f5f9", fontSize: "1.1rem", fontWeight: "700", margin: 0 },
  closeBtn: {
    background: "#334155", border: "none", color: "#94a3b8", cursor: "pointer",
    width: "32px", height: "32px", borderRadius: "8px", fontSize: "14px",
  },
  body: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  row: { display: "flex", gap: "1rem" },
  label: { color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" },
  input: {
    background: "#0f172a", border: "1px solid #334155", borderRadius: "8px",
    color: "#f1f5f9", padding: "10px 12px", fontSize: "0.9rem", outline: "none",
    width: "100%", boxSizing: "border-box",
  },
  inputError: { borderColor: "#f87171" },
  textarea: {
    background: "#0f172a", border: "1px solid #334155", borderRadius: "8px",
    color: "#f1f5f9", padding: "10px 12px", fontSize: "0.9rem", outline: "none",
    resize: "vertical", fontFamily: "inherit", width: "100%", boxSizing: "border-box",
  },
  select: {
    background: "#0f172a", border: "1px solid #334155", borderRadius: "8px",
    color: "#f1f5f9", padding: "10px 12px", fontSize: "0.9rem", outline: "none",
    width: "100%",
  },
  error: { color: "#f87171", fontSize: "0.8rem" },
  footer: {
    display: "flex", gap: "12px", justifyContent: "flex-end",
    padding: "1rem 1.5rem", borderTop: "1px solid #334155",
  },
  cancelBtn: {
    background: "#334155", border: "none", color: "#94a3b8", padding: "9px 20px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "500", fontSize: "0.9rem",
  },
  submitBtn: {
    background: "#7c3aed", border: "none", color: "white", padding: "9px 20px",
    borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem",
  },
};

export default TodoForm;
