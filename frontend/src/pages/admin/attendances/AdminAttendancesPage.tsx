import { useCallback, useEffect, useState } from "react";
import type { AttendanceType } from "@/lib/types/attendance";
import { format } from "date-fns";
import { apiGetAttendances } from "@/lib/api/attendance";
import { EmployeeAttendancesSectionMain } from "@/components/pages/employee/attendances/EmployeeAttendancesSectionMain";


const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

export default function AdminAttendancesPage() {
    const [data, setData] = useState<AttendanceType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(todayDate);


    const fetchData = useCallback((date: Date) => {
        setIsLoading(true);
        setError(null);

        const dateStr = format(date, "yyyy-MM-dd");

        apiGetAttendances(dateStr)
            .then(setData)
            .catch(() => setError("Failed to load all employee attendances. Please try again."))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        fetchData(selectedDate);
    }, [fetchData, selectedDate]);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <EmployeeAttendancesSectionMain
            data={data}
            isLoading={isLoading}
            error={error}
            isAdmin={true}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
        />
    );
}
