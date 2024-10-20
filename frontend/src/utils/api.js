import axios from 'axios';

const api = axios.create({
    baseURL: process.env.BASE_URL ,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    }    
})

export default api;