import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, CalendarCheck, Users } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { general } from "@/lib/assets"

export function LayoutSectionSidebar() {
    const location = useLocation()

    const menuItems = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Attendances",
            url: "/dashboard/attendances",
            icon: CalendarCheck,
        },
        {
            title: "Employees",
            url: "/dashboard/employees",
            icon: Users,
        },
    ]

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="border-b py-3 px-5 h-16 flex justify-center">
                <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-auto overflow-hidden">
                        <img src={general.logo} alt="logo" loading="lazy" className="w-full h-full object-cover object-center" />
                    </div>

                    <p className="font-bold text-lg">Attendances</p>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 text-[10px] font-semibold text-muted-foreground/75 tracking-wider uppercase mb-2">
                        Menu
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-y-2">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.url || (item.url === "/dashboard" && location.pathname === "/")

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link to={item.url} className="flex items-center gap-3 py-4 px-3 rounded-md transition-all">
                                                <item.icon className={`size-5 transition-all ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
                                                <span className={`text-sm ${isActive ? "font-bold" : "font-medium"}`}>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}