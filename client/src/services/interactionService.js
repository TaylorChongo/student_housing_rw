import api from './api';

export const saveListing = (id) => api.post(`/interactions/favorites/toggle`, { listingId: id });
export const getSavedListings = () => api.get('/interactions/favorites');

export const createBooking = (bookingData) => api.post('/bookings', bookingData);
