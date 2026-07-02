import { useCallback, useEffect, useState } from "react";
import type { AttendanceType } from "@/lib/types/attendance";
import { EmployeeAttendancesSectionMain } from "@/components/pages/employee/attendances/EmployeeAttendancesSectionMain";
import { apiGetAttendances } from "@/lib/api/attendance";
import { EmployeeAttendancesSectionForm } from "@/components/pages/employee/attendances/EmployeeAttendancesSectionForm";

export default function EmployeeAttendancesPage() {
    const [data, setData] = useState<AttendanceType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(() => {
        setIsLoading(true);
        setError(null);

        apiGetAttendances()
            .then(setData)
            .catch(() => setError("Failed to load attendances. Please try again."))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="grid grid-cols-12 gap-6 items-start justify-between w-full">
            <EmployeeAttendancesSectionForm
                additionalClass="col-span-3"
                onSuccess={fetchData}
            />

            <EmployeeAttendancesSectionMain
                data={data}
                isLoading={isLoading}
                error={error}
                additionalClass="col-span-9"
            />
        </div>
    );
}
