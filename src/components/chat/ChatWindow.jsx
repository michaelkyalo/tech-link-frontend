import { useState } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({
  selectedChat,
  messages,
  onSend,
  currentUser,
}) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="p-4 border-b font-bold">
        {selectedChat.name}
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            currentUser={currentUser}
          />
        ))}
      </div>

      <div className="p-4 flex gap-2 border-t">
        <input
          type="text"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="border flex-1 p-2 rounded"
          placeholder="Type message..."
        />

        <button
          onClick={handleSend}
          className="bg-green-600 text-white px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;