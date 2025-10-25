import MessageBubble from "./MessageBubble"

const MessageList = ({messages}) => {
  return (
    <div className="flex flex-col gap-2">
        {messages.map((msg) => (
            <MessageBubble key={msg.id} role={msg.role} text={msg.text}/>
        ))}
    </div>
  );
}

export default MessageList