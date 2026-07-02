import { LayoutSectionHeader } from "@/components/pages/layout/LayoutSectionHeader"
import { Outlet } from "react-router-dom"

export default function LayoutDashboardEmployee() {
    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <LayoutSectionHeader />

            <main className="py-12 px-12 w-full min-h-screen bg-slate-100">
                <Outlet />
            </main>
        </div>
    )
}