import { useCallback, useEffect, useState } from "react";
import { AdminEmployeesSectionMain } from "@/components/pages/admin/employees/AdminEmployeesSectionMain";
import { apiGetEmployees } from "@/lib/api/employee";
import type { Employee } from "@/lib/types/employee";

export default function AdminEmployeesPage() {
    const [data, setData] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(() => {
        setIsLoading(true);
        setError(null);

        apiGetEmployees()
            .then(setData)
            .catch(() => setError("Failed to load employees. Please try again."))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <AdminEmployeesSectionMain
            data={data}
            isLoading={isLoading}
            error={error}
            onRefresh={fetchData}
        />
    );
}
