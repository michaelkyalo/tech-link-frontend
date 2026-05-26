import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useChat } from "../chat/ChatContext";
import api from "../../services/api";

function ActivityRow({ icon, text, time, color, loading }) {
  if (loading) return (
    <div style={s.actItem}>
      <div style={{ ...s.skeleton, width: 34, height: 34, borderRadius: 10, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ ...s.skeleton, width: "65%", height: 12, marginBottom: 6 }} />
        <div style={{ ...s.skeleton, width: "35%", height: 10 }} />
      </div>
    </div>
  );
  return (
    <div style={s.actItem}>
      <span style={{ ...s.actOrb, background: color }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <p style={s.actTxt}>{text}</p>
        {time && <p style={s.actTime}>{time}</p>}
      </div>
    </div>
  );
}

const orbColors = ["#f0f9ff", "#f0fdf4", "#faf5ff", "#fffbeb"];

export default function FarmerDashboard() {
  const { unreadCount } = useChat();
  const navigate = useNavigate();
  const [activity, setActivity]               = useState([]);
  const [products, setProducts]               = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || {}; }
    catch { return {}; }
  })();

  const farmerName = user.name || "Farmer";
  const location   = user.location || "Kenya";

  useEffect(() => {
    api.get("/farmer/dashboard/activity")
      .then(r => setActivity(r.data.activity || []))
      .catch(() => {})
      .finally(() => setLoadingActivity(false));

    api.get("/products/mine")
      .then(r => setProducts((r.data.products || []).slice(0, 4)))
      .catch(() => {});
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const actions = [
    { to: "/farmer/add-product",   label: "Add Product", hint: "List new item",   icon: "➕", bg: "#f0fdf4", border: "#bbf7d0", iconBg: "#dcfce7" },
    { to: "/farmer/view-products", label: "My Products", hint: "View listings",   icon: "🌿", bg: "#f0f9ff", border: "#bae6fd", iconBg: "#e0f2fe" },
    { to: "/farmer/orders",        label: "View Orders", hint: "Track sales",     icon: "📦", bg: "#fffbeb", border: "#fde68a", iconBg: "#fef3c7" },
    { to: "/chat",                 label: "Open Chat",   hint: "New messages",    icon: "💬", bg: "#faf5ff", border: "#e9d5ff", iconBg: "#f3e8ff", badge: unreadCount },
  ];

  return (
    <div style={s.page}>

      {/* ── Navbar ── */}
      <nav style={s.nav}>
        <div style={s.nLogo}>
          <div style={s.nMark}><div style={s.nLeaf} /></div>
          <span style={s.nText}>AgriLink</span>
          <span style={s.nBadge}>Farmer Portal</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link to="/farmer/add-product" style={s.nAdd}>
            <span style={s.nPlus}>+</span> Add Product
          </Link>
          <button onClick={handleLogout} style={s.nLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div style={s.hero}>
        <img
          src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1400&q=85"
          alt="Farmer in lush green field"
          style={s.heroImg}
        />
        <div style={s.heroScrim} />
        <div style={s.heroBody}>
          <div style={s.heroLeft}>
            <div style={s.heroEyebrow}>
              <span style={s.heroPulse} /> Farm Active
            </div>
            <p style={s.heroGreeting}>{greeting},</p>
            <h1 style={s.heroName}>{farmerName}</h1>
            <p style={s.heroSub}>Your farm is thriving. Here's everything happening on your dashboard today.</p>
          </div>
          <div style={s.heroRight}>
            <div style={s.heroCard}>
              <p style={s.heroCardLabel}>Products Listed</p>
              <p style={s.heroCardVal}>{products.length}</p>
              <p style={s.heroCardSub}>Active listings</p>
            </div>
            <div style={s.heroCard}>
              <p style={s.heroCardLabel}>Location</p>
              <p style={{ ...s.heroCardVal, fontSize: 14, marginTop: 2 }}>📍 {location}</p>
              <p style={s.heroCardSub}>Market open</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={s.body}>

        {/* Left — Activity */}
        <div style={s.col}>
          <div style={s.secHead}>
            <h2 style={s.secTitle}>Recent Activity</h2>
            <span style={s.secPill}>{activity.length} events</span>
          </div>
          {loadingActivity
            ? Array.from({ length: 4 }).map((_, i) => <ActivityRow key={i} loading />)
            : activity.length === 0
              ? <p style={s.empty}>No recent activity yet.</p>
              : activity.map((a, i) => (
                  <ActivityRow
                    key={i}
                    icon={a.icon || "📌"}
                    text={a.text}
                    time={a.time}
                    color={orbColors[i % orbColors.length]}
                  />
                ))
          }
        </div>

        {/* Right — Actions + Products */}
        <div style={s.colR}>

          <div>
            <div style={{ ...s.secHead, marginBottom: 12 }}>
              <h2 style={s.secTitle}>Quick Actions</h2>
            </div>
            <div style={s.actionsGrid}>
              {actions.map(({ to, label, hint, icon, bg, border, iconBg, badge }) => (
                <Link
                  key={to}
                  to={to}
                  style={{ ...s.actionBtn, background: bg, borderColor: border }}
                >
                  <span style={{ ...s.actionIcon, background: iconBg }}>{icon}</span>
                  <span style={s.actionTxt}>
                    <span style={s.actionLabel}>
                      {label}
                      {badge > 0 && (
                        <span style={s.actionBadge}>{badge > 9 ? "9+" : badge}</span>
                      )}
                    </span>
                    <span style={s.actionHint}>{hint}</span>
                  </span>
                  <span style={s.actionArrow}>›</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div style={s.secHead}>
              <h2 style={s.secTitle}>My Products</h2>
              <Link to="/farmer/view-products" style={s.secLink}>View all →</Link>
            </div>
            {products.length === 0
              ? <p style={s.empty}>No products yet. <Link to="/farmer/add-product" style={{ color: "#16a34a" }}>Add one →</Link></p>
              : products.map(p => (
                  <div key={p.product_id} style={s.prodItem}>
                    {p.image_url
                      ? <img src={p.image_url} alt={p.product_name} style={s.prodImg} />
                      : <div style={s.prodFallback}><span style={{ fontSize: 18 }}>🌿</span></div>
                    }
                    <div style={{ flex: 1 }}>
                      <p style={s.prodName}>{p.product_name}</p>
                      <p style={s.prodCat}>{p.category}</p>
                    </div>
                    <span style={s.prodPrice}>KES {parseFloat(p.price).toLocaleString()}</span>
                  </div>
                ))
            }
          </div>

        </div>
      </div>

      {/* ── Footer ── */}
      <div style={s.footer}>
        <span style={s.footerTxt}>AgriLink</span>
        <span style={s.footerDot} />
        <span style={s.footerTxt}>Connecting Kenyan farmers to markets</span>
        <span style={s.footerDot} />
        <span style={s.footerTxt}>© {new Date().getFullYear()}</span>
      </div>

    </div>
  );
}

const s = {
  page:         { minHeight: "100vh", background: "#fff", fontFamily: "'DM Sans', sans-serif", maxWidth: 1100, margin: "0 auto" },

  /* nav */
  nav:          { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", borderBottom: "1px solid #f2f2f2" },
  nLogo:        { display: "flex", alignItems: "center", gap: 10 },
  nMark:        { width: 28, height: 28, background: "#0d3d1a", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" },
  nLeaf:        { width: 14, height: 14, background: "#4ade80", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)" },
  nText:        { fontWeight: 800, fontSize: 15, color: "#0a2e10", letterSpacing: "-0.5px" },
  nBadge:       { fontSize: 11, color: "#6b7280", background: "#f5f5f5", padding: "2px 8px", borderRadius: 99, fontWeight: 400 },
  nAdd:         { display: "flex", alignItems: "center", gap: 6, background: "#0d3d1a", color: "#fff", padding: "8px 18px", borderRadius: 10, textDecoration: "none", fontSize: 13, fontWeight: 600, letterSpacing: "-0.2px" },
  nPlus:        { width: 18, height: 18, background: "rgba(255,255,255,0.2)", borderRadius: 4, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 },
  nLogout:      { background: "transparent", color: "#6b7280", border: "1px solid #e5e7eb", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: "-0.2px" },

  /* hero */
  hero:         { position: "relative", height: 280, overflow: "hidden" },
  heroImg:      { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" },
  heroScrim:    { position: "absolute", inset: 0, background: "linear-gradient(105deg,rgba(5,18,8,0.93) 0%,rgba(5,18,8,0.78) 42%,rgba(5,18,8,0.2) 100%)" },
  heroBody:     { position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 36px", gap: 0 },
  heroLeft:     { flex: 1 },
  heroEyebrow:  { display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 99, marginBottom: 14, letterSpacing: "0.6px", textTransform: "uppercase" },
  heroPulse:    { width: 6, height: 6, borderRadius: "50%", background: "#4ade80" },
  heroGreeting: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontWeight: 400 },
  heroName:     { fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: 48, color: "#fff", fontWeight: 700, letterSpacing: "-2px", lineHeight: 1, marginBottom: 10 },
  heroSub:      { fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: 340 },
  heroRight:    { display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" },
  heroCard:     { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: "12px 16px", minWidth: 155 },
  heroCardLabel:{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 6 },
  heroCardVal:  { fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", margin: 0 },
  heroCardSub:  { fontSize: 11, color: "#4ade80", marginTop: 3, fontWeight: 500 },

  /* body layout */
  body:         { display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid #f2f2f2" },
  col:          { padding: "24px 28px" },
  colR:         { padding: "24px 28px", borderLeft: "1px solid #f2f2f2", display: "flex", flexDirection: "column", gap: 24 },

  secHead:      { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  secTitle:     { fontSize: 13, fontWeight: 700, color: "#111", letterSpacing: "-0.3px", margin: 0 },
  secPill:      { fontSize: 10, background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0", padding: "3px 10px", borderRadius: 99, fontWeight: 600 },
  secLink:      { fontSize: 12, color: "#16a34a", textDecoration: "none", fontWeight: 500 },
  empty:        { fontSize: 13, color: "#9ca3af", padding: "1rem 0" },

  skeleton:     { background: "linear-gradient(90deg,#f3f4f6 25%,#e9ecef 50%,#f3f4f6 75%)", backgroundSize: "200% 100%", borderRadius: 6, height: 26 },

  /* activity */
  actItem:      { display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: "1px solid #fafafa" },
  actOrb:       { width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 },
  actTxt:       { fontSize: 12, color: "#1f2937", fontWeight: 500, marginBottom: 3, lineHeight: 1.4 },
  actTime:      { fontSize: 10, color: "#9ca3af", fontWeight: 400, margin: 0 },

  /* quick actions */
  actionsGrid:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  actionBtn:    { display: "flex", alignItems: "center", gap: 10, padding: "13px 14px", borderRadius: 12, textDecoration: "none", border: "1.5px solid" },
  actionIcon:   { width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
  actionTxt:    { flex: 1 },
  actionLabel:  { fontSize: 12, fontWeight: 700, color: "#111", display: "block", marginBottom: 1 },
  actionHint:   { fontSize: 10, color: "#9ca3af" },
  actionArrow:  { fontSize: 16, color: "#d1d5db" },
  actionBadge:  { background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 99, padding: "2px 5px", marginLeft: 4 },

  /* products */
  prodItem:     { display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: "1px solid #fafafa" },
  prodImg:      { width: 40, height: 40, borderRadius: 10, objectFit: "cover", flexShrink: 0 },
  prodFallback: { width: 40, height: 40, borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  prodName:     { fontSize: 12, fontWeight: 600, color: "#111", marginBottom: 2 },
  prodCat:      { fontSize: 10, color: "#9ca3af", margin: 0 },
  prodPrice:    { fontSize: 13, fontWeight: 700, color: "#16a34a", whiteSpace: "nowrap" },

  /* footer */
  footer:       { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "14px 28px", borderTop: "1px solid #f2f2f2", background: "#fafafa" },
  footerDot:    { width: 4, height: 4, borderRadius: "50%", background: "#d1d5db" },
  footerTxt:    { fontSize: 11, color: "#d1d5db" },
};