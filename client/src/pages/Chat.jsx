import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMessageThread, sendMessage, markThreadAsRead } from '../services/messageService';
import { getCurrentUser } from '../services/authService';
import { Send, Check, CheckCheck, ArrowLeft } from 'lucide-react';

const Chat = () => {
  const { listingId, userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [content, setContent] = useState('');
  const user = getCurrentUser();
  const navigate = useNavigate();
  const scrollRef = useRef();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchThread = async () => {
    try {
      const res = await getMessageThread(listingId, userId);
      setMessages(res.data.messages);
      setOtherUser(res.data.otherUser);
      
      const hasUnread = res.data.messages.some(msg => msg.receiverId === user.id && !msg.read);
      if (hasUnread) {
        await markThreadAsRead(listingId, userId);
      }
    } catch (err) {
      console.error("Error fetching thread", err);
    }
  };

  useEffect(() => {
    fetchThread().then(() => setIsInitialLoad(false));
    const interval = setInterval(fetchThread, 5000);
    return () => clearInterval(interval);
  }, [listingId, userId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: isInitialLoad ? 'auto' : 'smooth' });
    }
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
    <div className="flex flex-col h-[calc(100svh-4rem)] md:h-[calc(100vh-4.5rem)] max-w-4xl mx-auto">
      <div className="flex-1 flex flex-col bg-white border md:m-4 md:rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-emerald-600 p-3 sm:p-4 text-white flex items-center gap-3 sm:gap-4 shrink-0">
          <button 
            onClick={() => navigate('/messages')}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
              {otherUser?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-base sm:text-lg leading-none truncate">{otherUser?.name || 'Loading...'}</h2>
              <p className="text-xs text-emerald-100 mt-1 capitalize font-medium">{otherUser?.role || 'Direct Communication'}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[86%] sm:max-w-[75%] p-3 sm:p-4 rounded-2xl shadow-sm ${
                msg.senderId === user.id 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border rounded-tl-none'
              }`}>
                <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <p className={`text-[10px] ${msg.senderId === user.id ? 'text-emerald-100' : 'text-gray-400'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {msg.senderId === user.id && (
                    <div className={`flex items-center ${msg.read ? 'text-blue-300' : 'text-emerald-300'}`}>
                      {msg.read || msg.received ? (
                        <CheckCheck size={14} />
                      ) : (
                        <Check size={14} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t flex gap-2 sm:gap-3 items-center shrink-0">
          <input 
            type="text" 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            className="flex-1 bg-gray-100 border-none rounded-2xl px-4 sm:px-5 py-3 focus:ring-2 focus:ring-emerald-600 outline-none transition-all font-medium min-w-0" 
            placeholder="Type your message here..." 
          />
          <button 
            type="submit" 
            disabled={!content.trim()}
            className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 transition shadow-lg hover:shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
