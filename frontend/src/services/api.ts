import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // ✅ Adjust if backend URL changes
});

export default API;
