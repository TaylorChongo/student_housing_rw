import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getMessageThread, sendMessage } from '../services/messageService';
import { getCurrentUser } from '../services/authService';
import { Send } from 'lucide-react';

const Chat = () => {
  const { listingId, userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const user = getCurrentUser();
  const scrollRef = useRef();

  const fetchThread = () => {
    getMessageThread(listingId, userId).then(res => setMessages(res.data));
  };

  useEffect(() => {
    fetchThread();
    const interval = setInterval(fetchThread, 5000);
    return () => clearInterval(interval);
  }, [listingId, userId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      await sendMessage({ listingId, content, receiverId: userId });
      setContent('');
      fetchThread();
    } catch (err) {
      alert('Failed to send message');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 h-[85vh] flex flex-col bg-white border rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-primary p-5 text-white flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg leading-none">Chat Room</h2>
          <p className="text-xs text-teal-100 mt-1">Direct Communication</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
              msg.senderId === user.id 
                ? 'bg-primary text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <p className={`text-[10px] mt-1 ${msg.senderId === user.id ? 'text-teal-100' : 'text-gray-400'}`}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-3 items-center">
        <input 
          type="text" 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          className="flex-1 bg-gray-100 border-none rounded-2xl px-5 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" 
          placeholder="Type your message here..." 
        />
        <button type="submit" className="bg-primary text-white p-3 rounded-2xl hover:bg-teal-800 transition shadow-lg hover:shadow-teal-100">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
