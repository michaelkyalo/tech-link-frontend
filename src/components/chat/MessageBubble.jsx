const MessageBubble = ({ message, currentUser }) => {
  const isOwnMessage =
    message.sender_id === currentUser?.id;

  return (
    <div
      className={`flex ${
        isOwnMessage
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`p-3 rounded-lg max-w-xs ${
          isOwnMessage
            ? "bg-green-600 text-white"
            : "bg-gray-200"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;