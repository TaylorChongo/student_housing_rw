import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConversations } from '../services/messageService';
import { MessageCircle } from 'lucide-react';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConversations().then(res => {
      setConversations(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center mt-20">Loading messages...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <MessageCircle className="text-primary" /> Messages
      </h2>
      {conversations.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border">
          <p className="text-gray-500">No conversations yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.map((convo, index) => (
            <Link 
              key={index} 
              to={`/messages/${convo.listing.id}/${convo.otherUser.id}`}
              className="block bg-white p-6 rounded-2xl border hover:border-primary transition shadow-sm hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{convo.listing.title}</h3>
                  <p className="text-primary font-medium">Chat with {convo.otherUser.name}</p>
                  <p className="text-gray-500 mt-1 line-clamp-1">{convo.lastMessage.content}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{new Date(convo.lastMessage.createdAt).toLocaleDateString()}</p>
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
