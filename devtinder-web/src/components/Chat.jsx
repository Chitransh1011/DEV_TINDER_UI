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
    <div className="w-full max-w-5xl mx-auto mt-6 card shadow-lg bg-base-200 h-[80vh]">
      <div className="card-title p-4 text-xl border-b border-base-content/20">
        Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((msg, index) => {
          const isOwnMessage = user.firstName === msg.firstName;
          return (
            <div
              key={index}
              className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header text-xs text-gray-400">
                {msg.firstName + " " + msg.lastName} •{" "}
                {msg.createdAt
                  ? <LastSeen timestamp={msg.createdAt}/>
                  : "unknown"}
              </div>
              <div
                className={`chat-bubble ${
                  isOwnMessage
                    ? "chat-bubble-primary text-white"
                    : "chat-bubble-secondary text-white"
                }`}
              >
                {msg.text}
              </div>
              <div className="chat-footer text-xs opacity-50">Seen</div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="p-4 border-t border-base-content/20 bg-base-100 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="input input-bordered input-primary flex-1"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
