import { useEffect, useState } from 'react';
import { getSavedListings, saveListing } from '../services/interactionService';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bookmark, MapPin, Zap, ShieldCheck } from 'lucide-react';

const SavedListings = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = () => {
    getSavedListings().then(res => {
      setFavorites(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleToggleSave = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await saveListing(id);
      setFavorites(prev => prev.filter(item => item.listing.id !== id));
    } catch (err) {
      console.error("Error toggling favorite", err);
    }
  };

  if (loading) return <div className="text-center py-20 animate-pulse font-black text-slate-950">LOADING SAVED PLACES...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pb-32">
      <Link 
        to="/listings" 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-600 mb-8 transition font-black text-xs uppercase tracking-widest group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to discovery
      </Link>
      
      <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mb-8 sm:mb-10 italic">Saved Collection</h2>
      
      {favorites.length === 0 ? (
        <div className="text-center py-20 sm:py-32 px-4 bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
            <Bookmark size={32} />
          </div>
          <p className="text-gray-400 font-bold">Your collection is empty.</p>
          <Link to="/listings" className="text-emerald-600 font-black mt-2 underline italic inline-block">Explore homes</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {favorites.map(item => (
            <Link 
              key={item.id} 
              to={`/listings/${item.listing.id}`} 
              className="card group"
            >
              <div className="relative aspect-[4/3] sm:h-60">
                <img 
                  src={item.listing.images && item.listing.images[0] ? item.listing.images[0] : 'https://via.placeholder.com/400x300'} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={item.listing.title} 
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl font-black text-slate-950 shadow-sm text-sm">
                  ${item.listing.price}/mo
                </div>
                <button 
                  onClick={(e) => handleToggleSave(e, item.listing.id)}
                  className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur rounded-xl shadow-sm hover:scale-110 transition text-emerald-600"
                >
                  <Bookmark 
                    size={18} 
                    fill="currentColor" 
                  />
                </button>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-emerald-600 text-white px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    <ShieldCheck size={12} /> Verified
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold text-slate-950 group-hover:text-emerald-600 transition-colors leading-tight line-clamp-1">{item.listing.title}</h3>
                <div className="flex items-center gap-1 text-gray-400 mt-2 text-sm font-medium">
                  <MapPin size={14} />
                  <span>{item.listing.location}</span>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-50 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                    <Zap size={14} fill="currentColor" />
                    <span>8.5/10 Ready</span>
                  </div>
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic italic">Saved</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedListings;
