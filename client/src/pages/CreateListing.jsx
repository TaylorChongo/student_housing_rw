import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { PlusCircle, Image as ImageIcon, MapPin, DollarSign, Type, AlignLeft, Send } from 'lucide-react';

const CreateListing = () => {
  const [formData, setFormData] = useState({ title: '', description: '', price: '', location: '', image: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/listings', { ...formData, price: parseFloat(formData.price), images: [formData.image] });
      navigate('/my-listings');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create listing');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <PlusCircle size={14} /> Property Management
        </div>
        <h2 className="text-4xl font-black text-slate-950 italic">List Your Property</h2>
        <p className="text-gray-500 mt-2 font-medium">Reach thousands of students searching for their next home.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-100 overflow-hidden">
        <div className="grid md:grid-cols-5 h-full">
          {/* Sidebar Info */}
          <div className="md:col-span-2 bg-slate-950 p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black mb-6 italic uppercase tracking-tight">Quick Tips</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center text-[10px] font-black">1</div>
                  <p className="text-sm text-gray-400 font-medium">Use high-quality photos to attract more students.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center text-[10px] font-black">2</div>
                  <p className="text-sm text-gray-400 font-medium">Be specific about the location and nearby landmarks.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex-shrink-0 flex items-center justify-center text-[10px] font-black">3</div>
                  <p className="text-sm text-gray-400 font-medium">Include all utilities and amenities in the description.</p>
                </li>
              </ul>
            </div>
            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Need help?</p>
              <p className="text-sm text-gray-400">Contact our support team for assistance with your listing.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 p-10 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  <Type size={14} className="text-emerald-600" /> Property Title
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Modern Studio near University of Rwanda" 
                  required 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    <DollarSign size={14} className="text-emerald-600" /> Price (USD / Mo)
                  </label>
                  <input 
                    type="number" 
                    placeholder="300" 
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
                    placeholder="e.g. Kigali, Kacyiru" 
                    required 
                    className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
                    onChange={e => setFormData({...formData, location: e.target.value})} 
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  <ImageIcon size={14} className="text-emerald-600" /> Image URL
                </label>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/photo..." 
                  required
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
                  onChange={e => setFormData({...formData, image: e.target.value})} 
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  <AlignLeft size={14} className="text-emerald-600" /> Description
                </label>
                <textarea 
                  placeholder="Describe your property in detail..." 
                  required 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold h-32 focus:ring-2 focus:ring-emerald-600 outline-none transition-all resize-none" 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full bg-emerald-600 text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-2 shadow-xl shadow-emerald-100 hover:opacity-90 transition disabled:opacity-50"
            >
              {submitting ? 'Creating Listing...' : 'Publish Property'} <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
