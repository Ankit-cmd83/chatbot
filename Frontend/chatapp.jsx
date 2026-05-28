import React, { useState, useRef, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";

// generate a unique ID
const uniqueId = uuidv4();

const Chatapp = () => {
  const [message, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const marearef = useRef(null);
  const [load, setLoad] = useState(false);

  async function run() {
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    try {
      setLoad(true);
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: uniqueId, msg: input }),
      });
      const data = await res.text();
      setMessages((prev) => [...prev, { sender: "AI", text: data }]);
      setInput("");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: `${err.message}` },
      ]);
    }
    setLoad(false);
  }

  useEffect(() => {
    if (marearef.current) {
      marearef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div className="flex bg-gray-900 justify-center w-screen h-screen items-center text-white">
      <div className="bg-gray-800 rounded-2xl w-[80%] mx-auto flex items-center flex-col justify-center h-[90%] p-4">
        <h1 className="text-3xl font-bold mb-2">AI ChatBot</h1>
        <div className="rounded-2xl flex flex-col bg-gray-800 w-full h-full mt-3 p-3">
          {/* Message Area */}
          <div
            id="marea"
            className="bg-gray-900 flex flex-col mx-auto w-full my-auto rounded-2xl h-[80%] overflow-auto p-2"
          >
            {message.map((msg, i) => (
              <div
                key={i}
                ref={i === message.length - 1 ? marearef : null}
                className={`max-w-[80%] text-sm inline-block rounded-xl m-1 pb-1 pt-1 pr-2 pl-2 h-auto ${
                  msg.sender === "user"
                    ? "bg-gray-700 self-end text-white"
                    : "bg-gray-600 text-white self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {load && <PulseLoader color="#10B981" />}
          </div>
          {/* Input container */}
          <div className="flex pl-1 py-1 self-end rounded-xl mb-3 w-full mt-2">
            {/* Input box */}
            <input
              type="text"
              id="inp"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-700 p-2 mr-1 rounded-md w-[96%] h-auto border-none outline-none text-white"
            />
            {/* Button */}
            <button className="cursor-pointer" onClick={run}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8  text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12l14-7-7 14-2-5-5-2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatapp;
