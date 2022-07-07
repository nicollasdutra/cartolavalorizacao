import axios from 'axios';
const api = axios.create({
   baseURL: 'https://api.cartola.globo.com/mercado/destaques', 
});
export default api;