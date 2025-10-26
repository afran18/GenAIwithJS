import { useState } from "react"
import { IoSend } from "react-icons/io5";


const ChatInput = ({ onSend, disabled}) => {
    const [value, setValue] = useState("");

    const handleSend = () => {
        if(!value.trim()) return;
        onSend(value);
        setValue("");
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

  return (
    <div className="flex gap-2 m-4 mx-50 rounded-3xl resize-none bg-gray-300 overflow-hidden">
        <textarea 
            className="flex-1 py-3 px-5 focus:outline-none resize-none"
            rows={1}
            placeholder="Type your message..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyPress}
        />
        <button
            className="text-gray-700 px-4 py-2 rounded-xl text-2xl cursor-pointer"
            onClick={handleSend}
            disabled={disabled}
        >
            <IoSend />
        </button>
    </div>
  )
}
export default ChatInput