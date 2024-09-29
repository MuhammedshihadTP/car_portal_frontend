import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL }); 


API.interceptors.request.use(
  (config) => {
   
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

  
    const token = adminToken ? adminToken : userToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export const registerUser = (userData) => API.post('/api/auth/register', userData);
export const loginUser = (userData) => API.post('/api/auth/login', userData);
export const loginAdmin = (adminData) => API.post('/api/auth/admin/login', adminData);

export const createCar = (carData) => API.post('/api/cars', carData);
export const getCars = () => API.get('api/cars');
export const searchCars = (searchParams) => API.get('/api/cars/search', { params: searchParams });
export const updateCar = (id, carData) => API.put(`/api/cars/${id}`, carData);
export const deleteCar = (id) => API.delete(`/api/cars/${id}`);

