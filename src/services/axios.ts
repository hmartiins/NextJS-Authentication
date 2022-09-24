import axios from 'axios';
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
  const { 'nextauth-token': token } = parseCookies();

  const api = axios.create({
    baseURL: 'https://localhost:3333'
  });
  
  api.interceptors.request.use(config => {
    console.log(config);
    
    return config;
  });
  
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }
  
  return api;
}