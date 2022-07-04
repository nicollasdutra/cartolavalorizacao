import axios from 'axios';
const api = axios.create({
   baseURL: 'https://api.cartola.globo.com/atletas/mercado/', 
});
export default api;