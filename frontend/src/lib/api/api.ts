import axios from "axios"
import { getToken, removeToken } from "../helpers/auth"
import { AppRoutes } from "../helpers/app-routes"

const API_URL = import.meta.env.VITE_API_URL
const API_PATH = import.meta.env.VITE_API_PATH
const API_VERSION = import.meta.env.VITE_API_VERSION

export const api = axios.create({
    baseURL: API_URL + "/" + API_PATH + "/" + API_VERSION,
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(
    (config) => {
        const token = getToken()

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            removeToken()
            window.location.href = AppRoutes.LOGIN
        }

        return Promise.reject(error)
    }
)
