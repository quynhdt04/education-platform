import { useEffect, useRef, useState } from 'react';
import './ChatBot.scss';
import { FaFacebookMessenger, FaTimes, FaRobot } from "react-icons/fa";
import { removeVietnameseTones } from '../../Helpers/removeVietnameseTones';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesContainerRef = useRef(null);

  const mockAIResponse = (message) => {
    const processed = removeVietnameseTones(message);

    if (processed.includes("tieng anh") || processed.includes("my")) {
      return "Gợi ý: 'Khóa học Giao tiếp tiếng Anh với người bản xứ - Native Talk 2025'";
    }
    if (processed.includes("hi") || processed.includes("xin chao") || processed.includes("chao") || processed.includes("hello")) {
      return "Xin chào bạn yêu! Tôi có thể giúp gì được bạn?";
    }
    if (processed.includes("backend")) {
      return "Bạn nên thử khóa học 'Lập trình Backend NodeJS Middle 2025'";
    }
    if (processed.includes("frontend")) {
      return "Gợi ý: 'Khóa học ReactJS Pro 2025'";
    }
    return "Xin lỗi, mình chưa hiểu rõ nhu cầu. Bạn có thể nói rõ hơn không?";
  };


  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    const loadingMsg = { sender: 'bot', text: '__typing__' }; 


    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInput('');

    setTimeout(() => {
      const botResponse = { sender: 'bot', text: mockAIResponse(input) };
      setMessages(prev => {
        const updated = [...prev];
        updated.pop();
        return [...updated, botResponse];
      });
    }, 3000);
  };

  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    }
  }, [isOpen]);


  return (
    <div className={`chatbot ${isOpen ? 'open' : ''}`}>
      <div className="chatbot__toggle" onClick={() => setIsOpen(!isOpen)}>
        <FaFacebookMessenger />
      </div>

      {isOpen && (
        <div className="chatbot__box">
          <div className="chatbot__header">
            <div className="chatbot__title">
              <FaRobot />
              Chatbot Tư vấn sản phẩm
            </div>
            <div className="chatbot__close" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </div>
          </div>
          <div className="chatbot__messages" ref={messagesContainerRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot__message ${msg.sender}`}>
                {msg.text === '__typing__' ? (
                  <div className="chatbot__typing">
                    <span></span><span></span><span></span>
                  </div>
                ) : msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot__input">
            <input
              type="text"
              value={input}
              placeholder="Nhập câu hỏi..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
