import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { AdminEmployeesSectionForm } from "@/components/pages/admin/employees/AdminEmployeesSectionForm";
import { apiGetEmployee } from "@/lib/api/employee";
import type { EmployeeType } from "@/lib/types/employee";
import { AppRoutes } from "@/lib/helpers/app-routes";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminEmployeesEditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<EmployeeType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            navigate(AppRoutes.ADMIN_EMPLOYEES);
            return;
        }

        apiGetEmployee(id)
            .then(setEmployee)
            .catch(() => {
                toast.error("Employee not found.");
                navigate(AppRoutes.ADMIN_EMPLOYEES);
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) {
        return (
            <div className="max-w-lg flex flex-col gap-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-64 w-full rounded-lg" />
            </div>
        );
    }

    if (!employee) return null;

    return <AdminEmployeesSectionForm mode="edit" employee={employee} />;
}
