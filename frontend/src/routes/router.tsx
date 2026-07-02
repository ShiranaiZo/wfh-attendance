import DashboardPage from "@/pages/dashboard/DashboardPage";
import Layout from "@/pages/dashboard/Layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />
    },
    {
        path: "/dashboard",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <DashboardPage />,
            },
        ],
    },
]);
