const ChatBox = ({ input, setInput, onSend, loading }) => {
  return (
    <div className="flex gap-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="e.g. My car makes a squealing noise when braking..."
        className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
      <button
        onClick={onSend}
        disabled={loading || !input}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;