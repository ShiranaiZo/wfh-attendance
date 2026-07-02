import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUserRole, UserRoles } from "@/lib/helpers/auth";
import { AppRoutes } from "@/lib/helpers/app-routes";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { general } from "@/lib/assets";

export function GeneralError(
    { title = 'Oops!', message = "You searched for me, but I don't exist.", debugText = null }:
        { title?: string, message?: string, debugText?: string | null }
) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (isAuthenticated()) {
            const role = getUserRole();
            if (role === UserRoles.HRD) {
                navigate(AppRoutes.ADMIN);
            } else {
                navigate(AppRoutes.EMPLOYEE);
            }
        } else {
            navigate(AppRoutes.LOGIN);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen w-fit mx-auto">
            <img src={general.notfound} alt="not found" className="w-44" />

            <h1 className="text-3xl md:text-4xl text-center font-bold text-foreground">
                {title}
            </h1>

            <p className="text-base md:text-lg text-center text-foreground">
                {message}
            </p>

            {(import.meta.env.VITE_APP_ENV === 'local') && debugText && (
                <pre className="text-foreground text-sm md:text-base text-center">
                    <code>{debugText}</code>
                </pre>
            )}

            <Button onClick={handleGoBack}>
                <ArrowLeft size={16} className="mt-1" /> Go back home
            </Button>
        </div>
    )
}