import axios from 'axios';

const BASE_URL = "https://realestate-backend-production.up.railway.app/api/v1/";
// const BASE_URL = "https://realestate-backend-tokc.onrender.com/api/v1/";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;


export default axiosInstance;