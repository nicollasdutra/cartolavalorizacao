import axios from 'axios';
const api = axios.create({
   baseURL: 'https://api.cartola.globo.com/mercado/status', 
});
export default api;