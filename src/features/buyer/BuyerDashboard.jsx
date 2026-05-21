import { Link } from "react-router-dom";

const stats = [
  { label: "Total Orders",     value: "12", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { label: "Cart Items",       value: "5",  color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
  { label: "Delivered Orders", value: "9",  color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
];

const actions = [
  { label: "Browse Products", to: "/products", bg: "#16a34a" },
  { label: "View Cart",       to: "/cart",     bg: "#2563eb" },
  { label: "My Orders",       to: "/orders",   bg: "#d97706" },
  { label: "Open Chat",       to: "/chat",     bg: "#7c3aed" },
];

const activity = [
  { icon: "🛒", text: "Added Tomatoes to cart" },
  { icon: "📦", text: "Order #102 delivered" },
  { icon: "💬", text: "Sent message to farmer" },
  { icon: "✅", text: "Payment completed successfully" },
];

export default function BuyerDashboard() {
  return (
    <div style={s.page}>

      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={s.title}>🛍️ Buyer Dashboard</h1>
        <p style={s.sub}>Welcome back! Explore fresh farm products.</p>
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
  page:      { minHeight: "100vh", background: "#f9fafb", padding: "2rem", fontFamily: "'DM Sans',sans-serif", maxWidth: 900, margin: "0 auto" },
  title:     { margin: 0, fontSize: 26, fontWeight: 700, color: "#14532d" },
  sub:       { margin: "4px 0 0", fontSize: 13, color: "#6b7280" },
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