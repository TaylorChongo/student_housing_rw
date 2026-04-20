import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, List, LogIn, UserPlus, LogOut, PlusCircle, Heart, MessageCircle, Calendar, Briefcase } from 'lucide-react';
import { getCurrentUser, logout } from '../services/authService';

const Navbar = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload(); 
  };

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to={user ? "/listings" : "/"} className="text-xl font-black text-primary flex items-center gap-2 tracking-tight">
            <Home size={26} className="text-primary" />
            <span className="hidden sm:inline">STUDENT HOUSING <span className="text-gray-400 font-light">RW</span></span>
          </Link>
          
          {!isAuthPage && (
            <div className="flex items-center space-x-1 md:space-x-4 text-gray-600 font-bold text-sm">
              {user ? (
                <>
                  {user.role === 'student' && (
                    <Link to="/saved" className="hover:text-primary p-2 flex items-center gap-1 transition">
                      <Heart size={18} /> <span className="hidden lg:inline">Saved</span>
                    </Link>
                  )}
                  <Link to="/messages" className="hover:text-primary p-2 flex items-center gap-1 transition">
                    <MessageCircle size={18} /> <span className="hidden lg:inline">Messages</span>
                  </Link>
                  <Link to="/bookings" className="hover:text-primary p-2 flex items-center gap-1 transition">
                    <Calendar size={18} /> <span className="hidden lg:inline">Bookings</span>
                  </Link>
                  {user.role === 'landlord' && (
                    <>
                      <Link to="/my-listings" className="hover:text-primary p-2 flex items-center gap-1 transition">
                        <Briefcase size={18} /> <span className="hidden lg:inline">My Ads</span>
                      </Link>
                      <Link to="/create-listing" className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition flex items-center gap-1">
                        <PlusCircle size={18} /> <span className="hidden lg:inline">Post</span>
                      </Link>
                    </>
                  )}
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-700 p-2 transition ml-2">
                    <LogOut size={18} />
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-primary p-2 transition">Login</Link>
                  <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-xl hover:bg-teal-800 transition shadow-lg shadow-teal-100">
                    Join
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
