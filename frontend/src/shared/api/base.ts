import {API_URL} from '@/src/shared/config';
import {AuthStoreInstance} from '@/src/entities/auth/model';
import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: API_URL
});

export const apiPrivateInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

apiPrivateInstance.interceptors.request.use(
    (config) => {
        if (!config.headers['Authorization']) {
            config.headers[
                'Authorization'
            ] = `Bearer ${AuthStoreInstance.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//     (config) => {
//         return config;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (
//             error.response.status == 401 &&
//             error.config &&
//             !error.config._isRetry
//         ) {
//             originalRequest._isRetry = true;
//             try {
//                 const response = await axios.get<Response>(
//                     `${API_URL}/api/v1/auth/refresh-tokens`,
//                     {withCredentials: true}
//                 );
//                 localStorage.setItem('persist', 'true');
//                 return axiosInstance.request(originalRequest);
//             } catch (e) {
//                 console.log('НЕ АВТОРИЗОВАН');
//             }
//         }
//         throw error;
//     }
// );
