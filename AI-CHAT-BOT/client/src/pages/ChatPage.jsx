import Navbar from "../components/Navbar";
import ChatHistory from "../components/ChatHistory";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  

  return (
    <div className="w-full mx-auto h-screen flex flex-col bg-gray-50">
      
      <Navbar /> 

      <div className="flex flex-row grow overflow-hidden m-4 rounded-xl border-2 border-gray-200">
        <ChatHistory />
        <ChatBox />
      </div>
    </div>
  );
};
export default ChatPage;
