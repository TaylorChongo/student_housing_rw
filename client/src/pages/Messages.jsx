import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConversations } from '../services/messageService';
import { MessageCircle, Search } from 'lucide-react';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConvos = async () => {
    try {
      const res = await getConversations();
      setConversations(res.data);
    } catch (err) {
      console.error("Error fetching conversations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvos();
    const interval = setInterval(fetchConvos, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center py-20 animate-pulse font-black text-slate-950">LOADING CONVERSATIONS...</div>;

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="flex justify-between items-center mb-8 shrink-0">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 italic">Inbox</h2>
        <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400">
          <MessageCircle size={20} />
        </div>
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-20 sm:py-32 px-4 bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-dashed border-gray-200 flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
            <MessageCircle size={32} />
          </div>
          <p className="text-gray-400 font-bold">No conversations yet.</p>
          <Link to="/listings" className="text-emerald-600 font-black mt-2 underline italic">Start discovery</Link>
        </div>
      ) : (
        <div className="flex-1 space-y-4 pb-10">
          {conversations.map((convo, index) => (
            <Link 
              key={index} 
              to={`/messages/${convo.listing.id}/${convo.otherUser.id}`}
              className={`block bg-white p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border transition-all duration-300 shadow-sm hover:shadow-xl group ${convo.unreadCount > 0 ? 'border-emerald-600 bg-emerald-50/30' : 'hover:border-emerald-600 border-gray-100'}`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-lg text-slate-950 truncate">{convo.listing.title}</h3>
                    {convo.unreadCount > 0 && (
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tighter">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-emerald-600 font-black text-xs uppercase tracking-widest mb-3">Chat with {convo.otherUser.name}</p>
                  <p className={`text-sm line-clamp-1 font-medium ${convo.unreadCount > 0 ? 'text-slate-950 font-bold' : 'text-gray-400'}`}>
                    {convo.lastMessage.content}
                  </p>
                </div>
                <div className="sm:text-right sm:ml-4 shrink-0">
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{new Date(convo.lastMessage.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
