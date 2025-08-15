import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import styles from "./Chat.module.css";

function Chat() {
  return (
    <div className={styles.chatContainer}>
      <Navbar />
      <div className={styles.mainArea}>
        <Sidebar />
        <ChatWindow />
      </div>
    </div>
  );
}

export default Chat;
