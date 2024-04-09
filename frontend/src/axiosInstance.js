import axios from "axios";

const baseURL = `${process.env.REACT_APP_API}/api/v1`;
const axiosInstance = axios.create({ baseURL });

export default axiosInstance;