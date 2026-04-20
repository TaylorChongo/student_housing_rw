import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { MapPin, User } from 'lucide-react';
import { getCurrentUser } from '../services/authService';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchListings = async () => {
      try {
        const { data } = await api.get('/listings');
        setListings(data.listings);
      } catch (err) {
        console.error("Error fetching listings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [user, navigate]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black text-gray-900">Discover Homes</h2>
          <p className="text-gray-500 mt-2">Find the best student housing in Kigali and beyond.</p>
        </div>
      </div>

      {listings.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border shadow-sm">
          <p className="text-gray-400">No properties available at the moment.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {listings.map(item => (
          <Link key={item.id} to={`/listings/${item.id}`} className="group bg-white rounded-3xl shadow-sm border overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/400x300?text=No+Image'} 
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={item.title} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'; }}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-primary shadow-sm">
                ${item.price}/mo
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-1 text-gray-400 text-sm">
                  <MapPin size={14} />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                  <User size={14} />
                  <span>Owner: {item.landlord?.name}</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Verified Listing</span>
                <span className="text-primary font-bold group-hover:translate-x-1 transition-transform">View Details →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Listings;
