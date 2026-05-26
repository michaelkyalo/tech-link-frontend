import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import useAuth from "../auth/useAuth";
import { getConversations, getMessages, sendMessage, markAsRead, startConversation as createConversation } from "./chatservice";

const ChatContext = createContext(null);

const initialState = {
  conversations: [],
  activeConversation: null,
  messages: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_CONVERSATIONS": {
      // ── FIX: unwrap {conversations:[]} wrapper if present ──────────────
      const raw = action.payload;
      const list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.conversations)
        ? raw.conversations
        : [];
      return {
        ...state,
        conversations: list,
        unreadCount: list.reduce((sum, c) => sum + (c.unreadCount || 0), 0),
        loading: false,
      };
    }
    case "SET_ACTIVE_CONVERSATION":
      return { ...state, activeConversation: action.payload, messages: [] };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };
    case "APPEND_MESSAGE":
      if (state.messages.find((m) => m.id === action.payload.id)) return state;
      return { ...state, messages: [...state.messages, action.payload] };
    case "UPDATE_UNREAD":
      return {
        ...state,
        unreadCount: Math.max(0, state.unreadCount - action.payload),
        conversations: state.conversations.map((c) =>
          c.id === action.conversationId ? { ...c, unreadCount: 0 } : c
        ),
      };
    case "NEW_CONVERSATION": {
      // Don't duplicate if the conversation already exists in the list
      const exists = state.conversations.find((c) => c.id === action.payload.id);
      if (exists) return { ...state, activeConversation: exists, messages: [] };
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        activeConversation: action.payload,
        messages: [],
      };
    }
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  // ── Load conversation list ──────────────────────────────────────────────
  const loadConversations = useCallback(async () => {
    if (!user) return;
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const data = await getConversations();
      dispatch({ type: "SET_CONVERSATIONS", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  }, [user]);

  // ── Open a conversation ─────────────────────────────────────────────────
  const openConversation = useCallback(async (conversation) => {
    dispatch({ type: "SET_ACTIVE_CONVERSATION", payload: conversation });
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const msgs = await getMessages(conversation.id);
      dispatch({ type: "SET_MESSAGES", payload: msgs });
      if (conversation.unreadCount > 0) {
        await markAsRead(conversation.id);
        dispatch({
          type: "UPDATE_UNREAD",
          payload: conversation.unreadCount,
          conversationId: conversation.id,
        });
      }
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  }, []);

  // ── Start a new conversation with a user ───────────────────────────────
  const startConversation = useCallback(async (otherUserId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const conversation = await createConversation(otherUserId);
      dispatch({ type: "NEW_CONVERSATION", payload: conversation });
      // Load messages for it (likely empty, but consistent)
      const msgs = await getMessages(conversation.id);
      dispatch({ type: "SET_MESSAGES", payload: msgs });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  }, []);

  // ── Send a message ──────────────────────────────────────────────────────
  const send = useCallback(async (text) => {
    if (!state.activeConversation || !text.trim()) return;
    const optimistic = {
      id: `opt-${Date.now()}`,
      conversationId: state.activeConversation.id,
      senderId: user?.id,
      senderName: user?.name,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      status: "sending",
    };
    dispatch({ type: "APPEND_MESSAGE", payload: optimistic });
    try {
      const saved = await sendMessage(state.activeConversation.id, text.trim());
      dispatch({
        type: "SET_MESSAGES",
        payload: state.messages.filter((m) => m.id !== optimistic.id).concat(saved),
      });
    } catch {
      // optimistic message stays with "sending" status
    }
  }, [state.activeConversation, state.messages, user]);

  // ── Poll for new messages when a conversation is open ──────────────────
  useEffect(() => {
    if (!state.activeConversation) return;
    const interval = setInterval(async () => {
      try {
        const msgs = await getMessages(state.activeConversation.id);
        dispatch({ type: "SET_MESSAGES", payload: msgs });
      } catch { /* silent */ }
    }, 5000);
    return () => clearInterval(interval);
  }, [state.activeConversation]);

  // ── Poll conversation list for unread badge ─────────────────────────────
  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 15000);
    return () => clearInterval(interval);
  }, [loadConversations]);

  return (
    <ChatContext.Provider value={{ ...state, loadConversations, openConversation, startConversation, send }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}