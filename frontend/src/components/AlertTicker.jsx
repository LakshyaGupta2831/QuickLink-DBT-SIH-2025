//

import { useEffect, useState, useRef } from "react";
import axios from "axios";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const AlertTicker = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [key, setKey] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollDuration, setScrollDuration] = useState(15000);

  const msgRef = useRef(null);
  const containerRef = useRef(null);

  // ---------------------------
  // FETCH API MESSAGES
  // ---------------------------
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let res = await axios.get(backend_url + "/api/message/messages");
        console.log("API response:", res.data);

        // API returns: { success: true, data: [ { message: "..."} ] }
        setMessages(res.data.messages || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, []);

  // ---------------------------
  // PREPARE DISPLAY MESSAGES
  // ---------------------------
  const apiMessages = messages.map((m) => m.text);

  const combinedMessage = apiMessages.map((msg, i) => (
    <span key={i}>
      <img src="/pin.png" alt="" className="inline-block h-8" />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {msg}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
  ));

  // ---------------------------
  // CALCULATE SCROLL WIDTH
  // ---------------------------
  const SCROLL_SPEED = 80; // px per second

  useEffect(() => {
    if (msgRef.current && containerRef.current) {
      const messageWidth = msgRef.current.offsetWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const totalDistance = messageWidth + containerWidth;
      const duration = (totalDistance / SCROLL_SPEED) * 1000;

      setScrollDuration(duration);
    }
  }, [combinedMessage]);

  // ---------------------------
  // SCROLL + PAUSE LOGIC
  // ---------------------------
  const PAUSE_DURATION = 1000;

  useEffect(() => {
    if (isPaused) return;

    if (!showMessage) {
      const pauseTimer = setTimeout(() => {
        setShowMessage(true);
        setKey((prev) => prev + 1);
      }, PAUSE_DURATION);

      return () => clearTimeout(pauseTimer);
    } else {
      const scrollTimer = setTimeout(() => {
        setShowMessage(false);
      }, scrollDuration);

      return () => clearTimeout(scrollTimer);
    }
  }, [showMessage, isPaused, scrollDuration]);

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div
      ref={containerRef}
      className="w-full bg-blue-100 py-2 overflow-hidden border-y border-blue-300"
    >
      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

      <div className="relative h-7">
        {showMessage && (
          <div
            key={key}
            ref={msgRef}
            className="absolute whitespace-nowrap text-blue-900 font-medium"
            style={{
              animation: `scrollLeft ${scrollDuration}ms linear forwards`,
              animationPlayState: isPaused ? "paused" : "running",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {combinedMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertTicker;
