import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

const s = {
  page: {
    display: "flex",
    height: "calc(100vh - 64px)", // subtract your Navbar height
    overflow: "hidden",
    background: "#fff",
    fontFamily: "'DM Sans', sans-serif",
  },
};

export default function ChatPage() {
  return (
    <div style={s.page}>
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
}