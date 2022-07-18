import axios from 'axios';


const api = axios.create({
   baseURL: 'https://api.cartolafc.globo.com/auth/time/', 
   headers: {
    'X-GLB-Token': 'digite sua chave aqui'
    }
});


export default api;