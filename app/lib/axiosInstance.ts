import axios from "axios";
import { toast } from 'react-toastify';


const axiosInstance  = axios.create({
    baseURL: 'https://fakestoreapi.com/'
})


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use((response) => {
    console.log('Response:', response);
    toast.success("Response successfully received!")
    
    return response;
    }, (error) => {
        if (error.response && error.response.status === 401) {
            toast.error('Authentication Error: Please login again.');
        }
    
        if (error.response) {
            const errorMessage = error.response.data.message || 'An error occurred';
            toast.error(errorMessage);
        } else {
            toast.error('An unexpected error occurred.'); 
        }
        
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export  {
    axiosInstance,
};