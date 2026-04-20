import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { saveListing } from '../services/interactionService';
import { createBooking } from '../services/bookingService';
import { getCurrentUser } from '../services/authService';
import { Heart, MessageSquare, Calendar, Send, Edit, Trash2, ArrowLeft, User } from 'lucide-react';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [bookingData, setBookingData] = useState({ message: '', visitDate: '' });
  const [submitting, setSubmitting] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    api.get(`/listings/${id}`).then(res => setListing(res.data));
  }, [id, user, navigate]);

  if (!listing) return <div className="text-center mt-20">Loading details...</div>;

  const isOwner = user?.id === listing.landlordId;

  const handleContact = () => navigate(`/messages/${id}/${listing.landlordId}`);
  const handleSave = async () => {
    try {
      await saveListing(listing.id);
      alert('Toggled favorite status!');
    } catch (err) {
      alert('Error saving listing');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      await api.delete(`/listings/${id}`);
      navigate('/my-listings');
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createBooking({ ...bookingData, listingId: id });
      alert('Visit request sent successfully!');
      setBookingData({ message: '', visitDate: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to send request');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate('/listings')} 
        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition font-bold group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <img 
            src={listing.images[0] || 'https://via.placeholder.com/600x400'} 
            className="rounded-3xl w-full h-[500px] object-cover shadow-2xl border border-white" 
            alt={listing.title} 
          />
          
          {user?.role === 'student' && (
            <form onSubmit={handleBooking} className="p-8 bg-white border rounded-3xl shadow-sm space-y-4">
              <h3 className="font-black text-2xl text-gray-900 flex items-center gap-2">
                <Calendar className="text-primary" /> Request a Visit
              </h3>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Preferred Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full border-gray-200 bg-gray-50 border p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" 
                  value={bookingData.visitDate}
                  onChange={e => setBookingData({...bookingData, visitDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Message (Optional)</label>
                <textarea 
                  placeholder="I am interested..." 
                  className="w-full border-gray-200 bg-gray-50 border p-3 rounded-xl h-32 focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={bookingData.message}
                  onChange={e => setBookingData({...bookingData, message: e.target.value})}
                />
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teal-800 transition-all shadow-lg disabled:opacity-50">
                {submitting ? 'Sending...' : 'Confirm Request'} <Send size={18} />
              </button>
            </form>
          )}
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-5xl font-black text-gray-900 leading-tight">{listing.title}</h1>
              <div className="flex gap-2">
                {isOwner && (
                  <>
                    <button onClick={() => navigate(`/edit-listing/${id}`)} className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-blue-500 hover:bg-blue-50 transition">
                      <Edit size={24} />
                    </button>
                    <button onClick={handleDelete} className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100 text-red-500 hover:bg-red-50 transition">
                      <Trash2 size={24} />
                    </button>
                  </>
                )}
                {user?.role === 'student' && (
                  <button onClick={handleSave} className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100 hover:bg-red-50 text-gray-300 hover:text-red-500 transition">
                    <Heart size={24} />
                  </button>
                )}
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-lg">
              ${listing.price} <span className="text-sm font-medium text-primary/60">/ Month</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                <User size={24} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-400">Property Owner</p>
                <p className="font-black text-gray-900 text-lg">{listing.landlord?.name}</p>
              </div>
            </div>
            {!isOwner && user?.role === 'student' && (
              <button 
                onClick={handleContact} 
                className="text-primary font-bold hover:underline flex items-center gap-2"
              >
                <MessageSquare size={18} /> Chat
              </button>
            )}
          </div>

          <div className="bg-white p-8 rounded-3xl border shadow-sm">
            <h3 className="font-black text-xl mb-4 text-gray-900">About the Home</h3>
            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">{listing.description}</p>
          </div>

          {isOwner && (
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
              <p className="text-blue-700 font-bold">This is your listing.</p>
              <p className="text-blue-600 text-sm mt-1">You can edit the information or delete it using the icons above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
