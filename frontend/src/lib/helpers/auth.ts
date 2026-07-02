import type { AuthPayloadType } from "../types/auth"

export const UserRoles = {
    HRD: 'HRD',
    EMPLOYEE: 'EMPLOYEE',
} as const

export function parseJwt(token: string): AuthPayloadType | null {
    try {
        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
        const jsonPayload = decodeURIComponent(
            window.atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        )

        return JSON.parse(jsonPayload) as AuthPayloadType
    } catch {
        return null
    }
}

export function setToken(token: string) {
    localStorage.setItem("access_token", token)
}

export function getToken(): string | null {
    return localStorage.getItem("access_token")
}

export function removeToken() {
    localStorage.removeItem("access_token")
}

export function getUser(): AuthPayloadType | null {
    const token = getToken()
    if (!token) return null
    return parseJwt(token)
}

export function getUserRole(): string {
    const user = getUser()
    return user ? user.role : ""
}

export function isAuthenticated(): boolean {
    const token = getToken()

    if (!token) return false
    const decoded = parseJwt(token)

    if (!decoded) return false

    const payload = JSON.parse(window.atob(token.split(".")[1]))
    if (payload.exp && Date.now() >= payload.exp * 1000) {
        removeToken()
        return false
    }

    return true
}
