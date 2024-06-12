import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false, // Измените, если ваш API требует аутентификации
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getLeads(query?: string) {
        return apiClient.get(`/amo-crm/leads`, { params: { query } });
    }
};
