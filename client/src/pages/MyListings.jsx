import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Edit, Trash2, Plus, Home, Sparkles, MapPin, DollarSign } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getCurrentUser();

  const fetchMyListings = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const { data } = await api.get('/listings'); 
      // Filter for current landlord's properties
      setListings(data.listings.filter(l => l.landlordId === user.id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyListings(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this listing?')) {
      try {
        await api.delete(`/listings/${id}`);
        fetchMyListings();
      } catch (err) {
        alert('Failed to delete listing');
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles size={14} /> Landlord Dashboard
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 italic">My Properties</h2>
          <p className="text-gray-500 mt-2 font-medium">Manage your active listings and housing offers.</p>
        </div>
        <Link 
          to="/create-listing" 
          className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-[1.5rem] flex items-center justify-center gap-2 font-black shadow-xl shadow-emerald-100 hover:opacity-90 transition active:scale-95"
        >
          <Plus size={20} /> Post New Property
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20 sm:py-32 px-4 bg-white rounded-[2rem] sm:rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
            <Home size={40} />
          </div>
          <p className="text-gray-400 font-bold text-lg">You haven't posted any properties yet.</p>
          <Link to="/create-listing" className="text-emerald-600 font-black mt-4 underline italic underline-offset-4">List your first property</Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {listings.map(l => (
            <div key={l.id} className="bg-white p-4 sm:p-6 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center justify-between group gap-6">
              <div className="flex flex-col md:flex-row items-center gap-8 w-full">
                <div className="w-full md:w-32 h-48 md:h-32 shrink-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-md">
                  <img 
                    src={l.images[0] || 'https://via.placeholder.com/100'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="" 
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-black text-2xl text-slate-950 group-hover:text-emerald-600 transition-colors italic">{l.title}</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                    <div className="flex items-center gap-1 text-emerald-600 font-black text-sm">
                      <DollarSign size={16} /> {l.price} <span className="text-[10px] uppercase text-gray-400 ml-1">/ month</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 font-bold text-sm">
                      <MapPin size={16} /> {l.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Link 
                  to={`/edit-listing/${l.id}`} 
                  className="flex-1 md:flex-none p-4 bg-gray-50 text-slate-950 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl transition-all flex items-center justify-center gap-2 font-bold text-sm"
                  title="Edit"
                >
                  <Edit size={18} /> <span className="md:hidden">Edit</span>
                </Link>
                <button 
                  onClick={() => handleDelete(l.id)} 
                  className="flex-1 md:flex-none p-4 bg-gray-50 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all flex items-center justify-center gap-2 font-bold text-sm"
                  title="Delete"
                >
                  <Trash2 size={18} /> <span className="md:hidden">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
