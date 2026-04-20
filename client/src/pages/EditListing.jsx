import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Save, ArrowLeft } from 'lucide-react';

const EditListing = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/listings/${id}`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Listing not found');
        navigate('/my-listings');
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/listings/${id}`, formData);
      navigate('/my-listings');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update listing');
    }
  };

  if (loading) return <div className="text-center mt-20">Loading property details...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <button onClick={() => navigate('/my-listings')} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition font-bold">
        <ArrowLeft size={20} /> Back to My Listings
      </button>

      <div className="bg-white p-8 md:p-12 rounded-3xl border shadow-xl">
        <h2 className="text-3xl font-black mb-8 text-gray-900">Edit Property</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Property Title</label>
            <input 
              className="w-full border-gray-200 bg-gray-50 border p-4 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Description</label>
            <textarea 
              className="w-full border-gray-200 bg-gray-50 border p-4 rounded-2xl h-40 focus:ring-2 focus:ring-primary outline-none transition-all" 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Price ($ / mo)</label>
              <input 
                className="w-full border-gray-200 bg-gray-50 border p-4 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                type="number" 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Location</label>
              <input 
                className="w-full border-gray-200 bg-gray-50 border p-4 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})} 
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-teal-800 transition-all shadow-lg hover:shadow-teal-100">
            <Save size={22} /> Update Property Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
