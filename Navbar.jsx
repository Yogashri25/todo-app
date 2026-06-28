import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        <span style={styles.brandIcon}>✓</span>
        <span style={styles.brandText}>TodoFlow</span>
      </Link>
      <div style={styles.links}>
        <Link to="/" style={{ ...styles.link, ...(location.pathname === "/" ? styles.activeLink : {}) }}>
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    height: "60px",
    background: "#1a1a2e",
    borderBottom: "1px solid #16213e",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  brandIcon: {
    background: "#7c3aed",
    color: "white",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },
  brandText: {
    color: "#e2e8f0",
    fontSize: "1.2rem",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },
  links: { display: "flex", gap: "1rem" },
  link: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
    padding: "6px 14px",
    borderRadius: "6px",
    transition: "all 0.2s",
  },
  activeLink: {
    background: "#7c3aed22",
    color: "#a78bfa",
  },
};

export default Navbar;
