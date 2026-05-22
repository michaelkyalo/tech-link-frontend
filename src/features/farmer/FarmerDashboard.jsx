import { Link } from "react-router-dom";

const stats = [
  { label: "Total Products", value: "24",        color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { label: "Orders Received", value: "18",       color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  { label: "Revenue",         value: "KES 45,000", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
];
const actions = [
  { label: "Add Product",    to: "/farmer/add-product",   bg: "#16a34a", hover: "#15803d" },
  { label: "View Products",  to: "/farmer/view-products", bg: "#2563eb", hover: "#1d4ed8" },
  { label: "View Orders",    to: "/farmer/orders",        bg: "#d97706", hover: "#b45309" },
];

const activity = [
  { icon: "📦", text: "New order received for Maize" },
  { icon: "✅", text: "Product Carrots added successfully" },
  { icon: "💬", text: "New message from buyer" },
  { icon: "🚚", text: "Delivery marked as completed" },
];

export default function FarmerDashboard() {
  return (
    <div style={s.page}>

      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.title}>🌿 Farmer Dashboard</h1>
          <p style={s.sub}>Welcome back — here's your overview</p>
        </div>
        <Link to="/farmer/add-product" style={s.addBtn}>+ Add Product</Link>
      </div>

      {/* Stats */}
      <div style={s.grid3}>
        {stats.map(({ label, value, color, bg, border }) => (
          <div key={label} style={{ ...s.card, background: bg, borderColor: border }}>
            <p style={s.statLabel}>{label}</p>
            <p style={{ ...s.statValue, color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={s.card}>
        <h2 style={s.section}>Quick Actions</h2>
        <div style={s.actions}>
          {actions.map(({ label, to, bg }) => (
            <Link key={to} to={to} style={{ ...s.actionBtn, background: bg }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={s.card}>
        <h2 style={s.section}>Recent Activity</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {activity.map(({ icon, text }, i) => (
            <li key={i} style={s.actItem}>
              <span style={s.actIcon}>{icon}</span>
              <span style={{ fontSize: 14, color: "#374151" }}>{text}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

const s = {
  page:      { minHeight: "100vh", background: "#f9fafb", padding: "2rem", fontFamily: "'DM Sans', sans-serif", maxWidth: 900, margin: "0 auto" },
  header:    { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" },
  title:     { margin: 0, fontSize: 26, fontWeight: 700, color: "#14532d" },
  sub:       { margin: "4px 0 0", fontSize: 13, color: "#6b7280" },
  addBtn:    { background: "#16a34a", color: "#fff", padding: "9px 18px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 600 },
  grid3:     { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 20 },
  card:      { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "1.25rem 1.5rem", marginBottom: 20 },
  statLabel: { margin: 0, fontSize: 13, color: "#6b7280", fontWeight: 500 },
  statValue: { margin: "8px 0 0", fontSize: 30, fontWeight: 700 },
  section:   { margin: "0 0 1rem", fontSize: 17, fontWeight: 600, color: "#111827" },
  actions:   { display: "flex", flexWrap: "wrap", gap: 10 },
  actionBtn: { color: "#fff", padding: "9px 18px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 500 },
  actItem:   { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #f3f4f6" },
  actIcon:   { fontSize: 18, width: 28, textAlign: "center" },
};