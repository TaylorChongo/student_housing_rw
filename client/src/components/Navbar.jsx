import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, LogOut, Menu, X, Plus, ChevronRight } from 'lucide-react';
import { getCurrentUser, logout } from '../services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload(); 
  };

  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Join Community', path: '/community' },
  ];

  const userLinks = user ? [
    ...(user.role === 'student' 
      ? [{ name: 'Saved', path: '/saved' }] 
      : [{ name: 'My Properties', path: '/my-listings' }]
    ),
    { name: 'Messages', path: '/messages' },
    { name: 'Bookings', path: '/bookings' },
  ] : [];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3' : 'bg-white border-b border-gray-100 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-600 p-2 rounded-2xl text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
              <Home size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-black text-slate-950 tracking-tighter">
              SH<span className="text-emerald-600 italic">RW</span>
            </span>
          </Link>

          {!isAuthPage && (
            <div className="flex items-center gap-8">
              {/* Desktop Links */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive(link.path) 
                        ? 'text-emerald-600 bg-emerald-50' 
                        : 'text-slate-500 hover:text-slate-950 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {user && (
                  <>
                    <div className="h-6 w-px bg-gray-100 mx-4" />
                    {userLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          isActive(link.path) 
                            ? 'text-emerald-600 bg-emerald-50' 
                            : 'text-slate-500 hover:text-slate-950 hover:bg-gray-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {user && user.role === 'landlord' && (
                  <Link 
                    to="/create-listing" 
                    className="hidden md:flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95"
                  >
                    <Plus size={18} /> <span className="hidden xl:inline">Post Property</span>
                  </Link>
                )}
                
                {user ? (
                  <div className="flex items-center gap-3 pl-3 border-l border-gray-100 ml-2">
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-xs font-black text-slate-950 leading-none">{user.name}</span>
                      <span className="text-[10px] text-emerald-600 uppercase font-black tracking-widest mt-1">{user.role}</span>
                    </div>
                    <button 
                      onClick={handleLogout} 
                      className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Logout"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 pl-3 border-l border-gray-100 ml-2">
                    <Link to="/login" className="text-slate-950 font-bold text-sm px-4 hover:text-emerald-600 transition-colors">Login</Link>
                    <Link to="/register" className="bg-slate-950 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-emerald-600 transition-all hover:scale-105 active:scale-95">
                      Create an account
                    </Link>
                  </div>
                )}

                {/* Mobile Menu Toggle */}
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2.5 bg-gray-50 text-slate-950 rounded-xl hover:bg-gray-100 transition-all"
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-8 pt-24 flex-grow overflow-y-auto">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Navigation</p>
                <div className="grid gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 text-slate-950 font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-all group"
                    >
                      {link.name}
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-emerald-500 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              {user && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Your Dashboard</p>
                  <div className="grid gap-2">
                    {userLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="flex justify-between items-center p-4 rounded-2xl bg-gray-50 text-slate-950 font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-all group"
                      >
                        {link.name}
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-emerald-500 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="p-8 border-t border-gray-100">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-950">{user.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user.role}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/register" 
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-center block shadow-lg shadow-emerald-100"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Spacer for fixed nav */}
      <div className="h-16 lg:h-20 shrink-0" />
    </>
  );
};

export default Navbar;
