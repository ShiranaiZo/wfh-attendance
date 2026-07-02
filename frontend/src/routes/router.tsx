import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import LayoutAuth from "@/pages/Layout/LayoutAuth";
import LayoutDashboard from "@/pages/Layout/LayoutDashboard";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />
    },
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
        path: "/dashboard",
        element: <LayoutDashboard />,
        children: [
            {
                path: "",
                element: <DashboardPage />,
            },
        ],
    },
]);
