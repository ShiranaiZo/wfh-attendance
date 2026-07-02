import { useNavigate } from "react-router-dom"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { GeneralLogo } from "@/components/general/GeneralLogo"
import { toast } from "sonner"
import { apiAuthLogout } from "@/lib/api/auth"
import { AppRoutes } from "@/lib/helpers/app-routes"

export function LayoutSectionHeader({ isAdmin = false }: { isAdmin?: boolean }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        apiAuthLogout()
        toast.success("Logged out successfully!")
        navigate(AppRoutes.LOGIN, { replace: true })
    }

    return (
        <header className={`h-16 w-full border-b sticky top-0 bg-background z-50`}>
            <div className={`${isAdmin ? 'w-full' : 'max-w-7xl'} mx-auto flex justify-between items-center px-5 py-3`}>
                {isAdmin ? (
                    <SidebarTrigger size="icon-lg" />
                ) : (
                    <GeneralLogo />
                )}

                <div className="flex items-center justify-between">
                    <Button variant="destructive" className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                        <LogOutIcon className="size-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    )
}