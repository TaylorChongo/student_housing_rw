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
      case 'accepted': return 'bg-green-500 text-white border-green-600';
      case 'rejected': return 'bg-red-500 text-white border-red-600';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-gray-900 flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Calendar size={32} />
          </div>
          {user.role === 'student' ? 'My Visit Requests' : 'Incoming Requests'}
        </h2>
        <p className="text-gray-500 mt-2 ml-16">Manage and track property viewings and bookings.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <Calendar size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 font-medium">No booking requests found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map(booking => (
            <div key={booking.id} className="group bg-white p-8 rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between md:justify-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                    <img 
                      src={booking.listing.images[0] || 'https://via.placeholder.com/100'} 
                      className="w-full h-full object-cover" 
                      alt="" 
                    />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-gray-900 group-hover:text-primary transition-colors">{booking.listing.title}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                      <MapPin size={14} /> {booking.listing.location}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 py-4 border-y border-gray-50">
                  <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                    <Clock size={16} className="text-gray-400" /> 
                    <span className="text-xs uppercase text-gray-400 font-bold">Sent:</span> 
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                  {booking.visitDate && (
                    <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                      <Calendar size={16} className="text-primary" /> 
                      <span className="text-xs uppercase text-gray-400 font-bold">Visit Date:</span> 
                      {new Date(booking.visitDate).toLocaleDateString()}
                    </div>
                  )}
                  {user.role === 'landlord' && (
                    <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                      <User size={16} className="text-primary" /> 
                      <span className="text-xs uppercase text-gray-400 font-bold">Student:</span> 
                      {booking.student.name}
                    </div>
                  )}
                </div>

                {booking.message && (
                  <div className="relative p-4 bg-gray-50 rounded-2xl border-l-4 border-primary/20">
                    <p className="text-gray-600 text-sm italic leading-relaxed">"{booking.message}"</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-4 min-w-[180px] w-full md:w-auto">
                <span className={`px-5 py-2 rounded-2xl text-[10px] font-black border uppercase tracking-widest shadow-sm ${getStatusStyle(booking.status)}`}>
                  {booking.status}
                </span>
                
                {user.role === 'landlord' && booking.status === 'pending' && (
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'accepted')} 
                      className="flex-1 bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition shadow-lg shadow-green-100 flex justify-center"
                    >
                      <Check size={20} />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'rejected')} 
                      className="flex-1 bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition shadow-lg shadow-red-100 flex justify-center"
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
