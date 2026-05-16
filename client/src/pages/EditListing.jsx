import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Save, ArrowLeft, Type, DollarSign, MapPin, AlignLeft, Sparkles } from 'lucide-react';

const EditListing = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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
    setSubmitting(true);
    try {
      await api.put(`/listings/${id}`, { ...formData, price: parseFloat(formData.price) });
      navigate('/my-listings');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update listing');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-32">
      <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button 
          onClick={() => navigate('/my-listings')} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-950 transition font-black uppercase text-[10px] tracking-widest"
        >
          <ArrowLeft size={16} /> Back to My Properties
        </button>
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
          <Sparkles size={14} /> Editing Mode
        </div>
      </div>

      <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100 overflow-hidden">
        <div className="p-6 sm:p-10 border-b border-gray-50">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 italic">Update {formData.title}</h2>
          <p className="text-gray-500 mt-2 font-medium">Keep your property information up to date for better results.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                <Type size={14} className="text-emerald-600" /> Property Title
              </label>
              <input 
                type="text" 
                value={formData.title} 
                required 
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
                onChange={e => setFormData({...formData, title: e.target.value})} 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  <DollarSign size={14} className="text-emerald-600" /> Price (USD / Mo)
                </label>
                <input 
                  type="number" 
                  value={formData.price} 
                  required 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
                  onChange={e => setFormData({...formData, price: e.target.value})} 
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  <MapPin size={14} className="text-emerald-600" /> Location
                </label>
                <input 
                  type="text" 
                  value={formData.location} 
                  required 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
                  onChange={e => setFormData({...formData, location: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                <AlignLeft size={14} className="text-emerald-600" /> Description
              </label>
              <textarea 
                value={formData.description} 
                required 
                className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold h-40 focus:ring-2 focus:ring-emerald-600 outline-none transition-all resize-none" 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className="w-full bg-emerald-600 text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-2 shadow-xl shadow-emerald-100 hover:opacity-90 transition disabled:opacity-50"
          >
            {submitting ? 'Saving Changes...' : 'Update Property'} <Save size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
