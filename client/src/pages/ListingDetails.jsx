import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { saveListing, getSavedListings } from '../services/interactionService';
import { createBooking } from '../services/bookingService';
import { getCurrentUser } from '../services/authService';
import { Bookmark, MessageSquare, Calendar, Send, Edit, Trash2, ArrowLeft, User, ShieldCheck, Zap, Info, CheckCircle2 } from 'lucide-react';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [bookingData, setBookingData] = useState({ message: '', visitDate: '' });
  const [submitting, setSubmitting] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingRes, favoritesRes] = await Promise.all([
          api.get(`/listings/${id}`),
          user?.role === 'student' ? getSavedListings() : Promise.resolve({ data: [] })
        ]);
        setListing(listingRes.data);
        if (user?.role === 'student') {
          const saved = favoritesRes.data.some(f => f.listingId === parseInt(id));
          setIsSaved(saved);
        }
      } catch (err) {
        console.error("Error fetching listing details", err);
      }
    };
    
    fetchData();
  }, [id, user?.id, user?.role]);

  if (!listing) return <div className="text-center py-20 animate-pulse font-black text-slate-950">LOADING SECURE DATA...</div>;

  const isOwner = user?.id === listing.landlordId;

  const handleContact = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/messages/${id}/${listing.landlordId}`);
  };

  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await saveListing(listing.id);
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error saving listing');
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
    if (!user) {
      navigate('/login');
      return;
    }

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

  const amenities = ["High-speed WiFi", "24/7 Security", "Private Bathroom", "Study Desk", "Electricity Included"];

  return (
    <div className="pb-32 bg-white">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 px-6 flex justify-between items-center z-50 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/90 backdrop-blur rounded-xl shadow-sm pointer-events-auto">
          <ArrowLeft size={20} />
        </button>
        <div className="flex gap-2 pointer-events-auto">
          {(!user || user?.role === 'student') && (
            <button onClick={handleSave} className="p-2 bg-white/90 backdrop-blur rounded-xl shadow-sm text-emerald-600">
              <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
            </button>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="mx-auto max-w-5xl px-6 pt-24 md:pt-28">
        <div className="relative h-72 w-full overflow-hidden rounded-[2rem] bg-gray-100 shadow-xl shadow-gray-100 md:h-[420px]">
          <img 
            src={listing.images[0] || 'https://via.placeholder.com/1200x800'} 
            className="h-full w-full object-cover" 
            alt={listing.title} 
          />
          <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl font-black text-slate-950 shadow-lg text-lg">
            ${listing.price} <span className="text-xs font-bold text-gray-400">/ MONTH</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1 space-y-8">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-green-50 text-emerald-600 px-3 py-1 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={14} /> Verified Listing
                </div>
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                  <Zap size={14} fill="currentColor" /> 8.8 Move-in Score
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-950 leading-tight">{listing.title}</h1>
              <div className="flex items-center gap-2 text-gray-400 font-medium">
                <Info size={16} />
                <span>{listing.location}</span>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((a, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-950 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <CheckCircle2 size={16} className="text-emerald-600" /> {a}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="font-black text-xl text-slate-950">About this place</h3>
              <p className="text-gray-500 leading-relaxed font-medium">{listing.description}</p>
            </div>

            {/* Landlord Info */}
            <div className="bg-slate-50 p-6 rounded-[2rem] border border-gray-100 flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm border border-gray-100">
                <User size={32} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Landlord</p>
                <p className="text-lg font-black text-slate-950">{listing.landlord?.name}</p>
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                  <ShieldCheck size={12} /> Identity Verified
                </div>
              </div>
              {isOwner ? (
                <button onClick={() => navigate(`/edit-listing/${id}`)} className="p-3 bg-white text-slate-950 rounded-xl shadow-sm border border-gray-100">
                  <Edit size={20} />
                </button>
              ) : (
                <button onClick={handleContact} className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-100">
                  <MessageSquare size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Visit Request Card (Desktop Only) */}
          <div className="hidden md:block w-80 shrink-0">
            <div className="sticky top-24 bg-white border border-gray-100 shadow-xl shadow-gray-100 rounded-[2.5rem] p-8 space-y-6">
              <h3 className="font-black text-2xl text-slate-950 flex items-center gap-2 italic">
                Ready to visit?
              </h3>
              {(!user || user?.role === 'student') ? (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Preferred Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
                      value={bookingData.visitDate}
                      onChange={e => setBookingData({...bookingData, visitDate: e.target.value})}
                    />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full">
                    {submitting ? 'Sending...' : 'Request Visit'} <Send size={18} />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold">
                  Landlords cannot request visits to their own properties.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-20 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent flex gap-3 z-40">
        {!isOwner && (!user || user?.role === 'student') && (
          <>
            <button onClick={handleContact} className="flex-1 bg-slate-950 text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-2 shadow-xl shadow-slate-100">
              <MessageSquare size={20} /> Message
            </button>
            <button 
              onClick={() => document.querySelector('#visit-form')?.scrollIntoView({ behavior: 'smooth' })} 
              className="flex-[1.5] bg-emerald-600 text-white font-black py-5 rounded-[1.5rem] flex items-center justify-center gap-2 shadow-xl shadow-emerald-100"
            >
              <Calendar size={20} /> Book Visit
            </button>
          </>
        )}
      </div>

      {/* Mobile Visit Form */}
      {(!user || user?.role === 'student') && !isOwner && (
        <section id="visit-form" className="md:hidden px-6 py-10 bg-gray-50 mt-10">
          <div className="bg-white border border-gray-100 shadow-xl rounded-[2.5rem] p-8 space-y-6">
            <h3 className="font-black text-2xl text-slate-950 italic">Request a Visit</h3>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Preferred Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-600 outline-none transition-all" 
                  value={bookingData.visitDate}
                  onChange={e => setBookingData({...bookingData, visitDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  placeholder="I'm a student at UR looking for a room..." 
                  className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm font-bold h-32 focus:ring-2 focus:ring-emerald-600 outline-none transition-all"
                  value={bookingData.message}
                  onChange={e => setBookingData({...bookingData, message: e.target.value})}
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? 'Sending...' : 'Confirm Request'}
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default ListingDetails;
