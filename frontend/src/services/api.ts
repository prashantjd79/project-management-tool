import axios from 'axios';

const API = axios.create({
  baseURL: 'https://project-management-tool-8tfe.onrender.com/api',  
});

export default API;
