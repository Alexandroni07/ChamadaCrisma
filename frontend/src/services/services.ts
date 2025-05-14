import axios from "axios";

const api = axios.create({
	withCredentials: true,
	timeout: 60000,
	headers: { "Content-Type": "application/json" },
	baseURL: "http://localhost:3000",
});

export {api};
export const routeApiV1 = "/api";
