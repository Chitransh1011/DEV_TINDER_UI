import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { BASE_URL } from "../utils/constants";
import LastSeen from "./LastSeen";
const Chat = () => {
  const { totargetUserId } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
 

  

  const getChatMessage = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + totargetUserId, {
      withCredentials: true,
    });
    const chatMessage = chat.data.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        createdAt,
      };
    });
    setMessage(chatMessage);
  };

  useEffect(() => {
    getChatMessage();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      totargetUserId,
    });

    socket.on("messageRecieved", ({ firstName, lastName, text }) => {
      setMessage((prev) => [...prev, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, totargetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
  }, [message]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      totargetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 h-[calc(100vh-5rem)] flex flex-col animate-fade-in">
      <div className="glass-card shadow-2xl flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-700/50 bg-gradient-to-r from-purple-600/10 to-pink-600/10">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Chat
          </h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-gray-900/20">
          {message.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-20 h-20 text-gray-600 mb-4 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-400 text-lg">No messages yet</p>
              <p className="text-gray-500 text-sm">Start the conversation!</p>
            </div>
          )}
          
          {message.map((msg, index) => {
            const isOwnMessage = user.firstName === msg.firstName;
            return (
              <div
                key={index}
                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} animate-slide-up`}
              >
                <div className={`max-w-[75%] sm:max-w-[60%] ${isOwnMessage ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-xs font-medium text-gray-400">
                      {msg.firstName} {msg.lastName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {msg.createdAt ? <LastSeen timestamp={msg.createdAt}/> : "now"}
                    </span>
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-lg ${
                      isOwnMessage
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-tr-sm"
                        : "bg-gray-700/80 text-gray-100 rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm sm:text-base break-words">{msg.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 border-t border-gray-700/50 bg-gray-900/50">
          <div className="flex items-center gap-2 sm:gap-3">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white placeholder-gray-400 text-sm sm:text-base"
              placeholder="Type your message..."
            />
            <button 
              onClick={sendMessage} 
              className="btn-gradient-primary px-4 sm:px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-glow"
              disabled={!newMessage.trim()}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
