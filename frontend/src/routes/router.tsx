import DashboardPage from "@/pages/admin/dashboard/AdminDashboardPage";
import LoginPage from "@/pages/auth/LoginPage";
import LayoutAuth from "@/pages/layout/LayoutAuth";
import LayoutDashboardAdmin from "@/pages/layout/LayoutDashboardAdmin";
import LayoutDashboardEmployee from "@/pages/layout/LayoutDashboardEmployee";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <LayoutAuth />,
        children: [
            {
                path: "",
                element: <LoginPage />,
            },
        ],
    },
    {
        path: "/",
        element: <LayoutDashboardEmployee />,
        children: [
            // {
            //     path: "/attendance",
            //     element: <AttendancePage />,
            // },
        ],
    },
    {
        path: "/admin",
        element: <LayoutDashboardAdmin />,
        children: [
            {
                path: "",
                element: <DashboardPage />,
            },
        ],
    },
]);
