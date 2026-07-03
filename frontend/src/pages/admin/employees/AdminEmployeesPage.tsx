import { useCallback, useEffect, useState } from "react";
import { AdminEmployeesSectionMain } from "@/components/pages/admin/employees/AdminEmployeesSectionMain";
import { apiGetEmployees } from "@/lib/api/employee";
import type { EmployeeType } from "@/lib/types/employee";
import type { MetadataType } from "@/lib/types/apiType";

export default function AdminEmployeesPage() {
    const [data, setData] = useState<EmployeeType[]>([]);
    const [metadata, setMetadata] = useState<MetadataType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const fetchData = useCallback((page: number, perPage: number) => {
        setIsLoading(true);
        setError(null);

        apiGetEmployees(page, perPage)
            .then(({ data, metadata }) => {
                setData(data);
                setMetadata(metadata);
            })
            .catch(() => setError("Failed to load employees. Please try again."))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        fetchData(page, perPage);
    }, [fetchData, page, perPage]);

    const handlePageChange = (newPage: number) => setPage(newPage);
    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(1);
    };

    return (
        <AdminEmployeesSectionMain
            data={data}
            metadata={metadata}
            isLoading={isLoading}
            error={error}
            page={page}
            perPage={perPage}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
            onRefresh={() => fetchData(page, perPage)}
        />
    );
}
