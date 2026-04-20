import { useEffect, useState } from 'react';
import { getSavedListings } from '../services/interactionService';
import { Link } from 'react-router-dom';

const SavedListings = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedListings().then(res => {
      setFavorites(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center mt-20">Loading your favorites...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">My Saved Properties</h2>
      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
          <p className="text-gray-500">You haven't saved any properties yet.</p>
          <Link to="/listings" className="text-primary font-bold mt-4 inline-block hover:underline">Start browsing</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {favorites.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <img src={item.listing.images[0] || 'https://via.placeholder.com/400x300'} className="h-48 w-full object-cover" alt="" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.listing.title}</h3>
                <p className="text-gray-500 mb-4">{item.listing.location}</p>
                <Link to={`/listings/${item.listing.id}`} className="text-primary font-bold hover:underline">View Property</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedListings;
