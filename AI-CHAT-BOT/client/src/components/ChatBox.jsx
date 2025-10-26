import { useState } from "react";
import axiosClient from "../api/axiosClient";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import NoChat from "./NoChat";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text) => {
    const userMsg = { id: Date.now() + 1, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axiosClient.post("/", { message: text });
      const aiMsg = {
        id: Date.now() + 1,
        role: "assistant",
        text: res.data.response || "No response",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errMsg = {
        id: Date.now() + 1,
        role: "assistant",
        text: "Error: Unable to get response",
      };
      setMessages((prev) => [...prev, errMsg]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-8/10 flex flex-col overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto p-4 mb-4 bg-white">
        {messages.length > 0 ? (
          <>
            <MessageList messages={messages} />
            {loading && <p className="text-gray-500 mt-2">AI is typing...</p>}
          </>
        ) : (
            <div className="flex justify-center items-center">
                <NoChat />
            </div>
          
        )}
      </div>

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
};
export default ChatBox;
