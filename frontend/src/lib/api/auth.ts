import { removeToken } from "../helpers/auth";
import type { LoginType } from "../types/auth";
import { api } from "./api";

export async function apiAuthLogin(data: LoginType) {
    const res = await api.post("/auth/login", data)

    return res;

}

export function apiAuthLogout() {
    removeToken()
}