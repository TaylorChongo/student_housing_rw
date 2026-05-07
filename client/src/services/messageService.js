import api from './api';

export const sendMessage = (msgData) => api.post('/messages', msgData);
export const getConversations = () => api.get('/messages');
export const getMessageThread = (listingId, userId) => api.get(`/messages/${listingId}/${userId}`);
export const getUnreadCount = () => api.get('/messages/unread-count');
export const markThreadAsRead = (listingId, userId) => api.put('/messages/read', { listingId, userId });
