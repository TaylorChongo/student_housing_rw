import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Edit, Trash2, Plus, Home } from 'lucide-react';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyListings = async () => {
    try {
      const { data } = await api.get('/listings'); 
      const user = JSON.parse(localStorage.getItem('user'));
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

  if (loading) return <div className="text-center mt-20">Loading your properties...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black text-gray-900">My Properties</h2>
          <p className="text-gray-500 mt-2">Manage your active listings and housing offers.</p>
        </div>
        <Link to="/create-listing" className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:bg-teal-800 transition shadow-lg shadow-teal-100">
          <Plus size={20} /> Post New Property
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed">
          <Home size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400">You haven't posted any properties yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {listings.map(l => (
            <div key={l.id} className="bg-white p-5 rounded-3xl border shadow-sm hover:shadow-md transition flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <img 
                  src={l.images[0] || 'https://via.placeholder.com/100'} 
                  className="w-20 h-20 object-cover rounded-2xl" 
                  alt="" 
                />
                <div>
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary transition-colors">{l.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span className="font-bold text-primary">${l.price} / mo</span>
                    <span>{l.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link 
                  to={`/edit-listing/${l.id}`} 
                  className="p-3 text-blue-600 hover:bg-blue-50 rounded-2xl transition"
                  title="Edit"
                >
                  <Edit size={22} />
                </Link>
                <button 
                  onClick={() => handleDelete(l.id)} 
                  className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition"
                  title="Delete"
                >
                  <Trash2 size={22} />
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
