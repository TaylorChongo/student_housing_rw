import api from './api';

export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getMyBookings = (status) => api.get(`/bookings${status ? `?status=${status}` : ''}`);
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}`, { status });
export const getPendingCount = () => api.get('/bookings/pending-count');
