import React, { useEffect, useState } from "react";
import axios from "axios";

const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const sendMessage = async () => {
    await axios.post(`http://localhost:4000/new-message`, {
      message: inputValue,
      id: Date.now(),
    });
  };
  const supscribe = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/get-messages");
      console.log(data);
      setMessages((prev) => [data, ...prev]);
      await supscribe();
    } catch (error) {
      setTimeout(() => {
        supscribe();
      }, [2000]);
    }
  };
  useEffect(() => {
    supscribe();
  }, []);

  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
          />
          <button onClick={sendMessage}>Отправить</button>
        </div>
        <div className="messages">
          {messages.map((mess) => (
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LongPulling;
