import MarkdownRender from "./MarkdownRender";

const MessageBubble = ({ role, text }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
          AI
        </div>
      )}

      <div
        className={`${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
        } rounded-2xl p-3 max-w-[70%]`}
      >
        <MarkdownRender>{text}</MarkdownRender>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 text-white">
          You
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
