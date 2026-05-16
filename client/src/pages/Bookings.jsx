import { useEffect, useState } from 'react';
import { getMyBookings, updateBookingStatus } from '../services/bookingService';
import { getCurrentUser } from '../services/authService';
import { Calendar, Check, X, Clock, MapPin, User } from 'lucide-react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  const fetchBookings = () => {
    getMyBookings().then(res => {
      setBookings(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this request?`)) return;
    try {
      await updateBookingStatus(id, status);
      fetchBookings();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'accepted': return 'bg-emerald-500 text-white border-emerald-600';
      case 'rejected': return 'bg-rose-500 text-white border-rose-600';
      default: return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-32">
      <div className="mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          <Calendar size={14} /> Schedule Management
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-950 italic">
          {user.role === 'student' ? 'My Visit Requests' : 'Incoming Requests'}
        </h2>
        <p className="text-gray-500 mt-2 font-medium">Manage and track property viewings and bookings.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 sm:py-32 px-4 bg-white rounded-[2rem] sm:rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
            <Calendar size={40} />
          </div>
          <p className="text-gray-400 font-bold text-lg">No booking requests found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map(booking => (
            <div key={booking.id} className="group bg-white p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between md:justify-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                    <img 
                      src={booking.listing.images[0] || 'https://via.placeholder.com/100'} 
                      className="w-full h-full object-cover" 
                      alt="" 
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-lg sm:text-xl text-slate-950 group-hover:text-emerald-600 transition-colors italic">{booking.listing.title}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-1 font-bold">
                      <MapPin size={14} /> {booking.listing.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 py-6 border-y border-gray-50">
                  <div className="flex items-center gap-2 text-slate-950 font-bold text-sm">
                    <Clock size={16} className="text-gray-300" /> 
                    <span className="text-[10px] uppercase text-gray-400 font-black tracking-widest mr-1">Sent</span> 
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                  {booking.visitDate && (
                    <div className="flex items-center gap-2 text-slate-950 font-bold text-sm">
                      <Calendar size={16} className="text-emerald-600" /> 
                      <span className="text-[10px] uppercase text-gray-400 font-black tracking-widest mr-1">Visit</span> 
                      {new Date(booking.visitDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  )}
                  {user.role === 'landlord' && (
                    <div className="flex items-center gap-2 text-slate-950 font-bold text-sm">
                      <User size={16} className="text-emerald-600" /> 
                      <span className="text-[10px] uppercase text-gray-400 font-black tracking-widest mr-1">Student</span> 
                      {booking.student.name}
                    </div>
                  )}
                </div>

                {booking.message && (
                  <div className="relative p-5 bg-slate-50 rounded-2xl border-l-4 border-emerald-600/20">
                    <p className="text-slate-600 text-sm italic leading-relaxed font-medium">"{booking.message}"</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-4 min-w-[180px] w-full md:w-auto">
                <span className={`px-6 py-2.5 rounded-full text-[10px] font-black border uppercase tracking-widest shadow-sm ${getStatusStyle(booking.status)}`}>
                  {booking.status}
                </span>
                
                {user.role === 'landlord' && booking.status === 'pending' && (
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'accepted')} 
                      className="flex-1 bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex justify-center active:scale-95"
                    >
                      <Check size={20} />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'rejected')} 
                      className="flex-1 bg-rose-500 text-white p-4 rounded-2xl hover:bg-rose-600 transition shadow-lg shadow-rose-100 flex justify-center active:scale-95"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
