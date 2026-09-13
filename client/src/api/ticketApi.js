import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/tickets';

export const fetchTickets = async (status = '', search = '', page = 1, limit = 5) => {
  const params = { page, limit };
  if (status && status !== 'All') params.status = status;
  if (search) params.search = search;
  
  const res = await axios.get(API_BASE_URL, { params });
  return res.data; 
};

export const fetchTicketById = async (ticketId) => {
  const res = await axios.get(`${API_BASE_URL}/${ticketId}`);
  return res.data;
};

export const createTicket = async (ticketData) => {
  const res = await axios.post(API_BASE_URL, ticketData);
  return res.data;
};

export const updateTicket = async (ticketId, payload) => {
  const res = await axios.put(`${API_BASE_URL}/${ticketId}`, payload);
  return res.data;
};