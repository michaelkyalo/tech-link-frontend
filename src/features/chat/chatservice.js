import api from "../../services/api";

// GET /api/chats/conversations
export async function getConversations() {
  const res = await api.get("/chats/conversations");
  return res.data.conversations;
}

// GET /api/chats/conversations/:partnerId/messages
export async function getMessages(partnerId) {
  const res = await api.get(`/chats/conversations/${partnerId}/messages`);
  return res.data.messages;
}

// POST /api/chats/conversations/:partnerId/messages
export async function sendMessage(partnerId, text) {
  const res = await api.post(`/chats/conversations/${partnerId}/messages`, { text });
  return res.data.message;
}

// POST /api/chats/conversations/start  { participantId }
export async function startConversation(participantId) {
  const res = await api.post("/chats/conversations/start", { participantId });
  return res.data.conversation;
}

// PATCH /api/chats/conversations/:partnerId/read
export async function markAsRead(partnerId) {
  const res = await api.patch(`/chats/conversations/${partnerId}/read`);
  return res.data;
}