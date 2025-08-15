import { usePersona } from "../PersonaContext"
import styles from './ChatWindow.module.css';
import axios from "axios";
import { useState } from "react";

function ChatWindow() {
    const {selectedPersona} = usePersona();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, {role: "user", content: input}];
        setMessages(newMessages);

        try {
            const res = await axios.post("http://localhost:3000/chat", {
                persona: selectedPersona.name,
                message: input
            });

            setMessages([...newMessages, {role: "ai", content: res.data.reply}]);
            setInput("");

        } catch (error) {
            console.error("Error sending message:", error);
        }
        setInput("");
    }



 return (
  <div className={styles.chatWindow}>
    <h2>{selectedPersona?.name}</h2>
    <div className={styles.messages}>
      {messages.map((msg, i) => (
        <div key={i} className={`${styles.message} ${styles[msg.role]}`}>
          {msg.content}
        </div>
      ))}
    </div>
    <div className={styles.inputBox}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Talk to ${selectedPersona?.name}`}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);
}
export default ChatWindow
