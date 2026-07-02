import { getUserRole, isAuthenticated, UserRoles } from "@/lib/helpers/auth"
import { AppRoutes } from "@/lib/helpers/app-routes"
import { type RolesType } from "@/lib/types/auth"
import { Navigate, Outlet } from "react-router-dom"

export function MiddlewareGuest() {
    if (isAuthenticated()) {
        const userRole = getUserRole() as RolesType
        return <Navigate to={userRole === UserRoles.HRD ? AppRoutes.ADMIN : AppRoutes.EMPLOYEE} replace />
    }

    return <Outlet />
}
