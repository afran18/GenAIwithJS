import { useState } from 'react'
import axios from 'axios'
import styles from './Chat.module.css'

function Chat() {
  const [persona, setPersona] = useState("hitesh");
  const [message, setMessage] = useState(""); 
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if(!message.trim()) return;

    setChat(prevChat => [...prevChat, { sender: "user", text: message}]);

    try {
      const res = await axios.post("http://localhost:3000/chat", {
        persona,
        message
      });

      setChat(prev => [...prev, { sender: "bot", text: res.data.reply }]);

    } catch (error) {
      console.log(error);
    }
    setMessage("");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI Persona Chat</h1>

      <select value={persona} onChange={(e) => setPersona(e.target.value)}
        className={styles.select}>
        <option value="hitesh">Hitesh</option>
        <option value="other">Other Persona</option>
      </select>

      <div className={styles.chatBox}>
        {chat.map((msg, idx) => (
          <div key={idx}
          className={`${styles.message} ${msg.sender === "user" ? styles.user : styles.bot}`}>
            <b>{msg.sender === "user" ? "You" : `${persona.charAt(0).toUpperCase() + persona.slice(1)}`}: </b>{msg.text}
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <input type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} 
        placeholder='Type your message here...'
        className={styles.input}/>
        <button onClick={sendMessage} className={styles.button}>Send</button>
      </div>

      
    </div>
  )
}

export default Chat
