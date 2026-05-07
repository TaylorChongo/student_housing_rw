import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { MapPin, Zap, ShieldCheck, Bookmark, Search, SlidersHorizontal } from 'lucide-react';
import { getCurrentUser } from '../services/authService';
import { saveListing, getSavedListings } from '../services/interactionService';
import BackButton from '../components/BackButton';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getCurrentUser();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get('search') || '';
  
  const [searchValue, setSearchValue] = useState(initialSearch);

  const fetchData = useCallback(async (query = '') => {
    setLoading(true);
    try {
      const [listingsRes, favoritesRes] = await Promise.all([
        api.get(`/listings${query ? `?search=${query}` : ''}`),
        user?.role === 'student' ? getSavedListings() : Promise.resolve({ data: [] })
      ]);
      setListings(listingsRes.data.listings);
      setFavorites(favoritesRes.data.map(f => f.listingId));
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  }, [user?.role]);

  useEffect(() => {
    fetchData(initialSearch);
  }, [user?.id, initialSearch, fetchData]);

  const handleToggleSave = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await saveListing(id);
      setFavorites(prev => 
        prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
      );
    } catch (err) {
      console.error("Error toggling favorite", err);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/listings?search=${searchValue}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 pb-32">
      <div className="mb-4">
        <BackButton fallbackPath="/" label="Back to Discovery" />
      </div>
      {/* Search Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-950 mb-6 italic">Discovery</h2>
        <div className="flex gap-3">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative group">
            <input 
              type="text" 
              placeholder="Search by area or university..."
              className="w-full bg-white border border-gray-200 p-4 pl-12 rounded-2xl font-medium focus:ring-2 focus:ring-emerald-600 outline-none transition-all shadow-sm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
          </form>
          <button className="p-4 bg-white border border-gray-200 rounded-2xl text-slate-950 hover:bg-gray-50 transition">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-[2rem]"></div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
          <p className="text-gray-400 font-bold">No properties found matching your search.</p>
          <button onClick={() => { setSearchValue(''); navigate('/listings'); }} className="text-emerald-600 font-black mt-2 underline">Clear Search</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map(item => (
            <Link key={item.id} to={`/listings/${item.id}`} className="card group">
              <div className="relative h-60">
                <img 
                  src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/400x300'} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={item.title} 
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl font-black text-slate-950 shadow-sm text-sm">
                  ${item.price}/mo
                </div>
                {user?.role === 'student' && (
                  <button 
                    onClick={(e) => handleToggleSave(e, item.id)}
                    className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur rounded-xl shadow-sm hover:scale-110 transition text-emerald-600"
                  >
                    <Bookmark 
                      size={18} 
                      fill={favorites.includes(item.id) ? "currentColor" : "none"} 
                    />
                  </button>
                )}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <div className="bg-emerald-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    <ShieldCheck size={12} /> Verified
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-950 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-1">{item.title}</h3>
                <div className="flex items-center gap-1 text-gray-400 mt-2 text-sm font-medium">
                  <MapPin size={14} />
                  <span>{item.location}</span>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                    <Zap size={14} fill="currentColor" />
                    <span>8.5/10 Ready</span>
                  </div>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">10 min from UR</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
