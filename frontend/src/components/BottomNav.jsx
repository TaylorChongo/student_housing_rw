import { Link, useLocation } from 'react-router-dom';
import { Home, Bookmark, MessageCircle, Calendar, User } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

const BottomNav = () => {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-3 sm:px-6 py-3 flex justify-between items-center md:hidden z-50">
      <Link to="/listings" className={`flex flex-col items-center gap-1 ${isActive('/listings') ? 'text-emerald-600' : 'text-gray-400'}`}>
        <Home size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Explore</span>
      </Link>
      
      {user.role === 'student' ? (
        <Link to="/saved" className={`flex flex-col items-center gap-1 ${isActive('/saved') ? 'text-emerald-600' : 'text-gray-400'}`}>
          <Bookmark size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Saved</span>
        </Link>
      ) : (
        <Link to="/my-listings" className={`flex flex-col items-center gap-1 ${isActive('/my-listings') ? 'text-emerald-600' : 'text-gray-400'}`}>
          <Home size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">My Ads</span>
        </Link>
      )}

      <Link to="/messages" className={`flex flex-col items-center gap-1 relative ${isActive('/messages') ? 'text-emerald-600' : 'text-gray-400'}`}>
        <MessageCircle size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Chat</span>
      </Link>

      <Link to="/bookings" className={`flex flex-col items-center gap-1 ${isActive('/bookings') ? 'text-emerald-600' : 'text-gray-400'}`}>
        <Calendar size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter">Bookings</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
