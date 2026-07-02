import { general } from "@/lib/assets";

export function GeneralLogo() {
    return (
        <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-auto overflow-hidden">
                <img src={general.logo} alt="logo" loading="lazy" className="w-full h-full object-cover object-center" />
            </div>

            <p className="font-bold text-lg">Attendances</p>
        </div>
    )
}