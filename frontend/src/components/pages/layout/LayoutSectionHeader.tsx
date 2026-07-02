import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

export function LayoutSectionHeader() {

    return (
        <header className="h-16 w-full flex justify-between items-center border-b px-5 py-3 sticky top-0 bg-background z-50">
            <SidebarTrigger size="icon-lg" />

            <div className="flex items-center justify-between">
                <Button variant="destructive" className="flex items-center gap-2 cursor-pointer">
                    <LogOutIcon className="size-4" />
                    Logout
                </Button>
            </div>
        </header>
    )
}