const s = {
  wrap: (isMine) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: isMine ? "flex-end" : "flex-start",
    marginBottom: 10,
  }),
  sender: {
    fontSize: 11,
    color: "#9ca3af",
    marginBottom: 3,
  },
  bubble: (isMine) => ({
    maxWidth: "72%",
    padding: "9px 13px",
    borderRadius: isMine ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
    background: isMine ? "#16a34a" : "#f3f4f6",
    color: isMine ? "#fff" : "#111827",
    fontSize: 13,
    lineHeight: 1.55,
    wordBreak: "break-word",
  }),
  time: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 3,
  },
  sending: {
    fontSize: 10,
    color: "#9ca3af",
    marginTop: 3,
    fontStyle: "italic",
  },
};

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  let h = d.getHours(), m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function MessageBubble({ message, currentUserId }) {
  const isMine = message.senderId === currentUserId;
  return (
    <div style={s.wrap(isMine)}>
      {!isMine && <span style={s.sender}>{message.senderName}</span>}
      <div style={s.bubble(isMine)}>{message.text}</div>
      {message.status === "sending" ? (
        <span style={s.sending}>Sending…</span>
      ) : (
        <span style={s.time}>{formatTime(message.createdAt)}</span>
      )}
    </div>
  );
}