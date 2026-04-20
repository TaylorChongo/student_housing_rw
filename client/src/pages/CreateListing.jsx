import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CreateListing = () => {
  const [formData, setFormData] = useState({ title: '', description: '', price: '', location: '', image: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/listings', { ...formData, images: [formData.image] });
      navigate('/listings');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to create listing');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-6">Create New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" placeholder="e.g. Modern Studio Kacyiru" required className="mt-1 block w-full px-3 py-2 border rounded-md" onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea placeholder="Tell us about the property..." required className="mt-1 block w-full px-3 py-2 border rounded-md h-32" onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (USD / Month)</label>
          <input type="number" placeholder="300" required className="mt-1 block w-full px-3 py-2 border rounded-md" onChange={e => setFormData({...formData, price: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" placeholder="Kigali - Kacyiru" required className="mt-1 block w-full px-3 py-2 border rounded-md" onChange={e => setFormData({...formData, location: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="text" placeholder="https://..." className="mt-1 block w-full px-3 py-2 border rounded-md" onChange={e => setFormData({...formData, image: e.target.value})} />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-3 rounded-md hover:bg-teal-800 transition font-bold mt-4">Post Listing</button>
      </form>
    </div>
  );
};

export default CreateListing;
