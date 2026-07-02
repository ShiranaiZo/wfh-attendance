import { Outlet } from "react-router-dom";

export default function LayoutAuth() {
    return (
        <div className="w-full min-h-screen bg-slate-100 flex items-center justify-center">
            <Outlet />
        </div>
    )
}