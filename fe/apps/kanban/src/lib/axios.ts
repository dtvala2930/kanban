import Axios, { type AxiosRequestConfig } from "axios";

import { useLoading } from "@kanban/libs/hooks/useLoading";
import { API_PATH, API_URL } from "../config";
import { useNavigateStore } from "../stores/navigate";

export interface IApiResponse {
	statusCode: number;
	success: string;
	data: [] | null;
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function authRequestInterceptor(config: AxiosRequestConfig): any {
	return config;
}

console.log("API_URL: ", API_URL);

export const axios = Axios.create({
	baseURL: `${API_URL}${API_PATH}`,
	headers: {
		"Content-Type": "application/json",
	},
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		if (
			error.response.data.statusCode === 500 &&
			window.location.pathname !== "/"
		) {
			useNavigateStore.getState().setNavigateTo("/");
		}

		useLoading.setState({ isLoading: false });

		return Promise.reject(error);
	},
);
