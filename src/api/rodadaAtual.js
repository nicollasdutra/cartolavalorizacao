import axios from 'axios';
const api = axios.create({
   baseURL: 'https://api.cartola.globo.com/partidas/', 
});
export default api;