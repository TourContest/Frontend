import axios from "axios";

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 0, // 요청 제한시간
});

// 요청 인터셉터
api.interceptors.request.use(config => {
    return config;
}, error => Promise.reject(error));

// 응답 인터셉터
api.interceptors.response.use(res => res, error => {
    if (error.res?.status == 401) {
        // 로그인 만료
    }
    return Promise.reject(error);
});

export default api;