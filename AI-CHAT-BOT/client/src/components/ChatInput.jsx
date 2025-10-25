import { useState } from "react"

const ChatInput = ({ onSend, disabled}) => {
    const [value, setValue] = useState("");

    const handleSend = () => {
        if(!value.trim()) return;
        onSend(value);
        setValue("");
    }

  return (
    <div className="flex gap-2">
        <textarea 
            className="flex-1 p-2 border rounded-xl resize-none"
            rows={2}
            placeholder="Type your message..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={handleSend}
            disabled={disabled}
        >
            Send
        </button>
    </div>
  )
}
export default ChatInput