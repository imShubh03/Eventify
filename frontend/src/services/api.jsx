import axios from "axios";

// Use import.meta.env for Vite instead of process.env
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const register = (userData) => axios.post(`${API_URL}/api/users/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/api/users/login`, userData);
export const fetchEvents = () => axios.get(`${API_URL}/api/events`);

export const createEvent = (eventData, token) =>
    axios.post(`${API_URL}/api/events`, eventData, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const attendEvent = (eventId, token) =>
    axios.post(`${API_URL}/api/events/${eventId}/attend`, {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
