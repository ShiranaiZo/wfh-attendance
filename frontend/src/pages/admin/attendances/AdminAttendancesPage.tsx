import { useCallback, useEffect, useState } from "react";
import type { AttendanceType } from "@/lib/types/attendance";
import type { MetadataType } from "@/lib/types/apiType";
import { format } from "date-fns";
import { apiGetAttendances } from "@/lib/api/attendance";
import { EmployeeAttendancesSectionMain } from "@/components/pages/employee/attendances/EmployeeAttendancesSectionMain";

const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

export default function AdminAttendancesPage() {
    const [data, setData] = useState<AttendanceType[]>([]);
    const [metadata, setMetadata] = useState<MetadataType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(todayDate);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const fetchData = useCallback((date: Date, page: number, perPage: number) => {
        setIsLoading(true);
        setError(null);

        const dateStr = format(date, "yyyy-MM-dd");

        apiGetAttendances(dateStr, page, perPage)
            .then(({ data, metadata }) => {
                setData(data);
                setMetadata(metadata);
            })
            .catch(() => setError("Failed to load all employee attendances. Please try again."))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        fetchData(selectedDate, page, perPage);
    }, [fetchData, selectedDate, page, perPage]);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => setPage(newPage);
    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1);
    };

    return (
        <EmployeeAttendancesSectionMain
            data={data}
            metadata={metadata}
            isLoading={isLoading}
            error={error}
            isAdmin={true}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            page={page}
            perPage={perPage}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
        />
    );
}
