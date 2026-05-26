import { useEffect, useRef, useState } from "react";
import { useChat } from "./ChatContext";
import useAuth from "../auth/useAuth";
import MessageBubble from "./MessageBubble";

const s = {
  window: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#fafafa",
    minWidth: 0,
  },
  header: {
    padding: "14px 20px",
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  avatar: (role) => ({
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: role === "farmer" ? "#dcfce7" : "#dbeafe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 600,
    color: role === "farmer" ? "#15803d" : "#1d4ed8",
  }),
  hName: { margin: 0, fontSize: 14, fontWeight: 600, color: "#111827" },
  hRole: { margin: "2px 0 0", fontSize: 11, color: "#6b7280" },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
  },
  inputArea: {
    padding: "12px 16px",
    background: "#fff",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    gap: 8,
    alignItems: "flex-end",
  },
  textarea: {
    flex: 1,
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "9px 12px",
    fontSize: 13,
    fontFamily: "inherit",
    resize: "none",
    outline: "none",
    lineHeight: 1.5,
    maxHeight: 100,
    background: "#f9fafb",
    color: "#111827",
  },
  sendBtn: (disabled) => ({
    background: disabled ? "#d1fae5" : "#16a34a",
    border: "none",
    borderRadius: 10,
    width: 38,
    height: 38,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "default" : "pointer",
    flexShrink: 0,
    transition: "background 0.15s",
  }),
  empty: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 12,
  },
  emptyIcon: { fontSize: 40 },
  emptyTitle: { margin: 0, fontSize: 15, fontWeight: 600, color: "#374151" },
  emptySubtitle: { margin: 0, fontSize: 13, color: "#9ca3af", textAlign: "center", lineHeight: 1.5 },
};

export default function ChatWindow() {
  const { activeConversation, messages, loading, send } = useChat();
  const { user } = useAuth();
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (!text.trim()) return;
    send(text);
    setText("");
    if (taRef.current) taRef.current.style.height = "auto";
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput(e) {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
  }

  function initials(name = "") {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  }

  if (!activeConversation) {
    return (
      <div style={s.window}>
        <div style={s.empty}>
          <span style={s.emptyIcon}>💬</span>
          <p style={s.emptyTitle}>No conversation selected</p>
          <p style={s.emptySubtitle}>
            Pick one from the list on the left,<br />
            or press <strong>+</strong> to start a new one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.window}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.avatar(activeConversation.participantRole)}>
          {initials(activeConversation.participantName)}
        </div>
        <div>
          <p style={s.hName}>{activeConversation.participantName}</p>
          <p style={s.hRole}>
            {activeConversation.participantRole === "farmer" ? "🌿 Farmer" : "🛒 Buyer"}
            {activeConversation.participantLocation ? ` · 📍 ${activeConversation.participantLocation}` : ""}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={s.messages}>
        {loading && messages.length === 0 && (
          <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12 }}>Loading messages…</p>
        )}
        {!loading && messages.length === 0 && (
          <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: 24 }}>
            No messages yet — say hello! 👋
          </p>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} currentUserId={user?.id} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={s.inputArea}>
        <textarea
          ref={taRef}
          style={s.textarea}
          rows={1}
          placeholder="Type a message… (Enter to send)"
          value={text}
          onChange={handleInput}
          onKeyDown={handleKey}
        />
        <button
          style={s.sendBtn(!text.trim())}
          onClick={handleSend}
          disabled={!text.trim()}
          aria-label="Send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}