import { useState, useEffect } from "react";
import { useChat } from "./ChatContext";
import api from "../../services/api";

function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

// ── Styles ──────────────────────────────────────────────────────────────────
const s = {
  sidebar: {
    width: 260,
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    flexShrink: 0,
  },
  header: {
    padding: "16px 16px 12px",
    borderBottom: "1px solid #f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: { display: "flex", flexDirection: "column" },
  title: { margin: 0, fontSize: 15, fontWeight: 600, color: "#111827" },
  sub: { margin: "3px 0 0", fontSize: 12, color: "#6b7280" },
  newBtn: {
    background: "#16a34a",
    border: "none",
    borderRadius: 8,
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
    color: "#fff",
    fontSize: 20,
    lineHeight: 1,
    fontWeight: 300,
  },
  list: { flex: 1, overflowY: "auto" },
  item: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 14px",
    cursor: "pointer",
    background: active ? "#f0fdf4" : "transparent",
    borderLeft: active ? "3px solid #16a34a" : "3px solid transparent",
    transition: "background 0.15s",
  }),
  avatar: (role) => ({
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: role === "farmer" ? "#dcfce7" : "#dbeafe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    color: role === "farmer" ? "#15803d" : "#1d4ed8",
    flexShrink: 0,
  }),
  info: { flex: 1, minWidth: 0 },
  name: { fontSize: 13, fontWeight: 600, color: "#111827", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  preview: { fontSize: 11, color: "#6b7280", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  meta: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 },
  time: { fontSize: 10, color: "#9ca3af" },
  badge: {
    background: "#16a34a",
    color: "#fff",
    fontSize: 10,
    fontWeight: 600,
    borderRadius: 999,
    minWidth: 18,
    height: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 4px",
  },
  empty: { padding: 24, textAlign: "center", fontSize: 13, color: "#9ca3af" },

  // Modal
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: 14,
    width: 340,
    maxHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
    overflow: "hidden",
  },
  modalHeader: {
    padding: "16px 18px 12px",
    borderBottom: "1px solid #f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: { margin: 0, fontSize: 14, fontWeight: 600, color: "#111827" },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
    color: "#6b7280",
    lineHeight: 1,
    padding: 2,
  },
  searchInput: {
    margin: "10px 14px",
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
    color: "#111827",
    background: "#f9fafb",
  },
  farmerList: { overflowY: "auto", flex: 1 },
  farmerItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    cursor: "pointer",
    transition: "background 0.12s",
  },
  farmerName: { fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 },
  farmerSub: { fontSize: 11, color: "#6b7280", margin: "2px 0 0" },
  modalEmpty: { padding: 20, textAlign: "center", fontSize: 13, color: "#9ca3af" },
  modalLoading: { padding: 20, textAlign: "center", fontSize: 13, color: "#9ca3af" },
};

// ── New Chat Modal ───────────────────────────────────────────────────────────
function NewChatModal({ onClose, onSelect }) {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingFarmers, setLoadingFarmers] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFarmers() {
      try {
        const res = await api.get("/users/role/farmer");
        const data = res.data;
        const list = Array.isArray(data) ? data : Array.isArray(data.users) ? data.users : [];
        setFarmers(list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingFarmers(false);
      }
    }
    fetchFarmers();
  }, []);

  const filtered = farmers.filter((f) =>
    (f.username || f.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={s.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={s.modal}>
        <div style={s.modalHeader}>
          <p style={s.modalTitle}>New Conversation</p>
          <button style={s.closeBtn} onClick={onClose} aria-label="Close">×</button>
        </div>
        <input
          style={s.searchInput}
          placeholder="Search farmers…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        <div style={s.farmerList}>
          {loadingFarmers && <p style={s.modalLoading}>Loading farmers…</p>}
          {error && <p style={{ ...s.modalEmpty, color: "#ef4444" }}>{error}</p>}
          {!loadingFarmers && !error && filtered.length === 0 && (
            <p style={s.modalEmpty}>No farmers found</p>
          )}
          {filtered.map((farmer) => (
            <div
              key={farmer.id}
              style={s.farmerItem}
              onClick={() => onSelect(farmer)}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={s.avatar("farmer")}>{initials(farmer.username)}</div>
              <div>
                <p style={s.farmerName}>{farmer.username}</p>
                <p style={s.farmerSub}>{farmer.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────
export default function ChatSidebar() {
  const { conversations, activeConversation, openConversation, startConversation, loading } = useChat();
  const [showModal, setShowModal] = useState(false);

  async function handleSelectFarmer(farmer) {
    setShowModal(false);
    await startConversation(farmer.id);
  }

  return (
    <>
      <div style={s.sidebar}>
        <div style={s.header}>
          <div style={s.headerText}>
            <p style={s.title}>Messages</p>
            <p style={s.sub}>{conversations.length} conversation{conversations.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            style={s.newBtn}
            onClick={() => setShowModal(true)}
            title="New conversation"
            aria-label="New conversation"
          >
            +
          </button>
        </div>

        <div style={s.list}>
          {loading && conversations.length === 0 && (
            <p style={s.empty}>Loading…</p>
          )}
          {!loading && conversations.length === 0 && (
            <p style={s.empty}>No conversations yet.<br />Press + to start one.</p>
          )}
          {conversations.map((conv) => (
            <div
              key={conv.id}
              style={s.item(activeConversation?.id === conv.id)}
              onClick={() => openConversation(conv)}
            >
              <div style={s.avatar(conv.participantRole)}>
                {initials(conv.participantName)}
              </div>
              <div style={s.info}>
                <p style={s.name}>{conv.participantName}</p>
                <p style={s.preview}>{conv.lastMessage || "No messages yet"}</p>
              </div>
              <div style={s.meta}>
                <span style={s.time}>{timeAgo(conv.updatedAt)}</span>
                {conv.unreadCount > 0 && (
                  <span style={s.badge}>{conv.unreadCount}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <NewChatModal
          onClose={() => setShowModal(false)}
          onSelect={handleSelectFarmer}
        />
      )}
    </>
  );
}