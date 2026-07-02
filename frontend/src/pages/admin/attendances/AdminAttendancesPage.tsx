import { useCallback, useEffect, useState } from "react";
import type { AttendanceType } from "@/lib/types/attendance";
import { apiGetAttendances } from "@/lib/api/attendance";
import { EmployeeAttendancesSectionMain } from "@/components/pages/employee/attendances/EmployeeAttendancesSectionMain";

export default function AdminAttendancesPage() {
    const [data, setData] = useState<AttendanceType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(() => {
        setIsLoading(true);
        setError(null);

        apiGetAttendances()
            .then(setData)
            .catch(() => setError("Failed to load all employee attendances. Please try again."))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <EmployeeAttendancesSectionMain
            data={data}
            isLoading={isLoading}
            error={error}
            isAdmin={true}
        />
    );
}
