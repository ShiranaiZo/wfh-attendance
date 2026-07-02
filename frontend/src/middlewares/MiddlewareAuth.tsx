import { getUserRole, isAuthenticated, UserRoles } from "@/lib/helpers/auth"
import { AppRoutes } from "@/lib/helpers/app-routes"
import { type RolesType } from "@/lib/types/auth"
import { Navigate, Outlet } from "react-router-dom"

export function MiddlewareAuth({ allowedRoles }: { allowedRoles?: RolesType[] }) {
    if (!isAuthenticated()) {
        return <Navigate to={AppRoutes.LOGIN} replace />
    }

    const userRole = getUserRole() as RolesType

    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        return <Navigate to={userRole === UserRoles.HRD ? AppRoutes.ADMIN : AppRoutes.EMPLOYEE} replace />
    }

    return <Outlet />
}

export function MiddlewareGuest() {
    if (isAuthenticated()) {
        const userRole = getUserRole() as RolesType
        return <Navigate to={userRole === UserRoles.HRD ? AppRoutes.ADMIN : AppRoutes.EMPLOYEE} replace />
    }

    return <Outlet />
}
