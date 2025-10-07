/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig } from 'axios';

// axios instance oluşturuyoruz
const axiosClient = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
	timeout: 5000, // 5 saniye
	headers: {
		'Content-Type': 'application/json',
	},
});

// get axios methodu
// istekler timeout ile iptal edilebilir. timeOutMs parametresi ile milisaniye cinsinden verilir. default 5000ms
const httpGet = async (url: string, config = {}, timeOutMs: number = 5000) => {
	console.log('Axios Client Service: Getting users...');

	const mergedConfig: AxiosRequestConfig = {
		...config,
		signal: AbortSignal.timeout(timeOutMs), // dışarıdan gönderilen config  + signal ile request iptal
	};

	try {
		const response = await axiosClient.get(url, mergedConfig);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

// post axios methodu
const httpPost = async (
	url: string,
	data: any,
	config = {},
	timeOutMs: number = 5000
) => {
	try {
		const mergedConfig: AxiosRequestConfig = {
			...config, // dışarıdan gönderilen config  + signal ile request iptali
			signal: AbortSignal.timeout(timeOutMs),
		};

		const response = await axiosClient.post(url, data, mergedConfig);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

// put axios methodu
// data  -> json payload
const httpPut = async (
	url: string,
	data: any,
	config = {},
	timeOutMs: number = 5000
) => {
	try {
		const mergedConfig: AxiosRequestConfig = {
			...config, // dışarıdan gönderilen config  + signal ile request iptali
			signal: AbortSignal.timeout(timeOutMs),
		};

		const response = await axiosClient.put(url, data, mergedConfig);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

// delete axios methodu
const httpDelete = async (
	url: string,
	config = {},
	timeOutMs: number = 5000
) => {
	try {
		const mergedConfig: AxiosRequestConfig = {
			...config, // dışarıdan gönderilen config  + signal ile request iptali
			signal: AbortSignal.timeout(timeOutMs),
		};

		const response = await axiosClient.delete(url, mergedConfig);
		return response.data;
	} catch (error) {
		return Promise.reject(error);
	}
};

// her istekden önce çalışır
axiosClient.interceptors.request.use(
	(config) => {
		// request gönderilmeden önce yapılacak işlemler
		console.log('Request Interceptor:', config);
		// her bir request de merkezi olarak bu header eklenir
		config.headers['X-Custom-Header'] = 'CustomHeaderValue'; // örnek custom header ekleme
		return config;
	},
	(error) => {
		// request hatası
		return Promise.reject(error);
	}
);

// her istekde cevap geldikten sonra çalışır
axiosClient.interceptors.response.use(
	(response) => {
		// response alındıktan sonra yapılacak işlemler
		console.log('Response Interceptor:', response);
		return response;
	},
	(error) => {
		// response hatası
		return Promise.reject(error);
	}
);

export const axiosClientService = {
	get: httpGet,
	post: httpPost,
	put: httpPut,
	delete: httpDelete,
};
