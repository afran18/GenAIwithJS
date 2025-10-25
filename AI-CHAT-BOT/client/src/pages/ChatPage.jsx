import { useState } from "react"
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import axiosClient  from "../api/axiosClient"

const ChatPage = () => {
    const [messages, setMessages] = useState([{ id: 1, role: "system", text: "Welcome! Ask me anything." }]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (text) => {
        const userMsg = {id: Date.now() + 1, role: "user", text};
        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);

        try {
            const res = await axiosClient.post("/", {message: text});
            const aiMsg = {id: Date.now() + 1, role: "assistant", text: res.data.response || "No response"}
            setMessages((prev) => [...prev, aiMsg]);

        } catch (err) {
            const errMsg = {id: Date.now() + 1, role: "assistant", text: "Error: Unable to get response"};
            setMessages((prev) => [...prev, errMsg]);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }


  return (
    <div className="max-w-3xl mx-auto h-screen flex flex-col p-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">💬 AI Chat</h1>
        <div className="flex-1 overflow-auto p-4 border rounded-lg mb-4">
            <MessageList messages={messages} />
            {loading && <p className="text-gray-500 mt-2">AI is typing...</p>}
        </div>
        <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
export default ChatPage