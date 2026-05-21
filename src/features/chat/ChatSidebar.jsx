const ChatSidebar = ({
  chats,
  setSelectedChat,
}) => {
  return (
    <div className="w-1/4 border-r bg-white">
      <h2 className="text-xl font-bold p-4">
        Chats
      </h2>

      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => setSelectedChat(chat)}
          className="p-4 border-b cursor-pointer hover:bg-gray-100"
        >
          {chat.name}
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;