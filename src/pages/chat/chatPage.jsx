import { useEffect, useState } from "react";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatWindow from "../../components/chat/ChatWindow";

import {
  getChats,
  getMessages,
  sendMessage,
} from "../../services/chatservice";

import useAuth from "../../hooks/useAuth";

const ChatPage = () => {
  const { user } = useAuth();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] =
    useState(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

  const fetchChats = async () => {
    const data = await getChats();
    setChats(data);
  };

  const fetchMessages = async (chatId) => {
    const data = await getMessages(chatId);
    setMessages(data);
  };

  const handleSend = async (text) => {
    const newMessage = await sendMessage(
      selectedChat.id,
      { content: text }
    );

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar
        chats={chats}
        setSelectedChat={setSelectedChat}
      />

      <ChatWindow
        selectedChat={selectedChat}
        messages={messages}
        onSend={handleSend}
        currentUser={user}
      />
    </div>
  );
};

export default ChatPage;