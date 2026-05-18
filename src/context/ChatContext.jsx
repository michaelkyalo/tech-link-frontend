import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] =
    useState(null);

  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};