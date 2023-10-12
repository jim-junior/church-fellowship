import axios from "axios";


//const HOST_URL = "https://schoolsoftapp-3432013afef6.herokuapp.com";
const HOST_URL = "http://192.168.43.1:3001";

//const HOST_URL = "https://fellow-ship-app.onrender.com";


export const UPLOADS_URL = HOST_URL + "/useruploads";


const axiosInstance = axios.create({
	baseURL: HOST_URL + "/api",
});

const requestHandler = (request) => {
	request.headers.Authorization = `Bearer ${localStorage.getItem('mothersToken')}`;

	return request;
}
const errorHandler = (error) => Promise.reject(error);

axiosInstance.interceptors.request.use(
	(request) => requestHandler(request),

	(error) => errorHandler(error),
);

axiosInstance.interceptors.response.use(
	(response) => response,

	(error) => {
		if (error?.response?.status === 401) {
			localStorage.clear();
			window.location.href = '/';
		}
	},
);

export default axiosInstance;
