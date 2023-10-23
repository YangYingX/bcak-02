import axios from "axios";

const instance = axios.create({
	baseURL: 'http://community.byesame.com',
	timeout: 60000,
	headers: { 'X-Custom-Header': 'foobar' }
});
instance.interceptors.request.use((config) => {
	if (config.url !== '/login') {
		config.headers.Authorization = localStorage.getItem('token')

	}
	return config
}, error => {
	// 超出 2xx 范围的状态码都会触发该函数。
	// 对响应错误做点什么
	return Promise.reject(error);
});
instance.interceptors.response.use(response => {
	// 2xx 范围内的状态码都会触发该函数。
	// 对响应数据做点什么
	return response.data;
}, error => {
	// 超出 2xx 范围的状态码都会触发该函数。
	// 对响应错误做点什么
	return Promise.reject(error);
});


export default instance