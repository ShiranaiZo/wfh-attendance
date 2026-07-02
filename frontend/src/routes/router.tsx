import AdminDashboardPage from "@/pages/admin/dashboard/AdminDashboardPage";
import LoginPage from "@/pages/auth/LoginPage";
import LayoutAuth from "@/pages/layout/LayoutAuth";
import LayoutDashboardAdmin from "@/pages/layout/LayoutDashboardAdmin";
import LayoutDashboardEmployee from "@/pages/layout/LayoutDashboardEmployee";
import { createBrowserRouter } from "react-router-dom";
import { MiddlewareAuth, MiddlewareGuest } from "@/middlewares/MiddlewareAuth";
import { UserRoles } from "@/lib/helpers/auth";
import { AppRoutes } from "@/lib/helpers/app-routes";
import NotFoundPage from "@/pages/errors/NotFoundPage";
import AdminEmployeesPage from "@/pages/admin/employees/AdminEmployeesPage";
import AdminEmployeesCreatePage from "@/pages/admin/employees/AdminEmployeesCreatePage";
import AdminEmployeesEditPage from "@/pages/admin/employees/AdminEmployeesEditPage";

export const router = createBrowserRouter([
    {
        element: <MiddlewareGuest />,
        children: [
            {
                path: AppRoutes.LOGIN,
                element: <LayoutAuth />,
                children: [
                    {
                        path: "",
                        element: <LoginPage />,
                    },
                ],
            },
        ],
    },
    {
        element: <MiddlewareAuth allowedRoles={[UserRoles.EMPLOYEE]} />,
        children: [
            {
                path: AppRoutes.EMPLOYEE,
                element: <LayoutDashboardEmployee />,
                children: [
                    // {
                    //     path: "/attendance",
                    //     element: <AttendancePage />,
                    // },
                ],
            },
        ],
    },
    {
        element: <MiddlewareAuth allowedRoles={[UserRoles.HRD]} />,
        children: [
            {
                path: AppRoutes.ADMIN,
                element: <LayoutDashboardAdmin />,
                children: [
                    {
                        path: "",
                        element: <AdminDashboardPage />,
                    },
                    {
                        path: AppRoutes.ADMIN_EMPLOYEES,
                        element: <AdminEmployeesPage />,
                    },
                    {
                        path: AppRoutes.ADMIN_EMPLOYEES_CREATE,
                        element: <AdminEmployeesCreatePage />,
                    },
                    {
                        path: AppRoutes.ADMIN_EMPLOYEES_EDIT,
                        element: <AdminEmployeesEditPage />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <LayoutAuth />,
        children: [
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);
