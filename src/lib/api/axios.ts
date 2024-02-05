import axios from 'axios';
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export default axios.create({
	baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
});