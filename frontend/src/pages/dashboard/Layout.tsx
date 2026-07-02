import { LayoutSectionHeader } from "@/components/pages/layout/LayoutSectionHeader"
import { LayoutSectionSidebar } from "@/components/pages/layout/LayoutSectionSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <SidebarProvider>
            <LayoutSectionSidebar />

            <div className="flex-1 flex flex-col min-h-screen">
                <LayoutSectionHeader />

                <main className="py-12 px-12 w-full min-h-screen bg-slate-100">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    )
}