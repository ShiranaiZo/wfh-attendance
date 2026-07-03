import { useMemo } from "react";
import type { AttendanceType } from "@/lib/types/attendance";
import { Skeleton } from "@/components/ui/skeleton";
import { EmployeeAttendancesSectionColumns } from "./EmployeeAttendancesSectionColumns";
import { EmployeeAttendancesSectionDatatable } from "./EmployeeAttendancesSectionDatatable";

import type { MetadataType } from "@/lib/types/apiType";

interface Props {
    data: AttendanceType[];
    metadata?: MetadataType | null;
    isLoading: boolean;
    error: string | null;
    additionalClass?: string;
    isAdmin?: boolean;
    selectedDate?: Date;
    onDateChange?: (date: Date) => void;
    page?: number;
    perPage?: number;
    onPageChange?: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
}

export function EmployeeAttendancesSectionMain({
    data,
    metadata,
    isLoading,
    error,
    additionalClass = "",
    isAdmin = false,
    selectedDate,
    onDateChange,
    page,
    perPage,
    onPageChange,
    onPerPageChange,
}: Props) {
    const columns = useMemo(
        () => EmployeeAttendancesSectionColumns({ isAdmin }),
        [isAdmin]
    );

    return (
        <section
            id="employee-attendances-section-main"
            className={`bg-white rounded-lg w-full h-fit py-8 px-6 flex flex-col gap-6 ${additionalClass}`}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Attendances</h2>
            </div>

            {isLoading ? (
                <div className="flex flex-col gap-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full rounded-md" />
                    ))}
                </div>
            ) : error ? (
                <div className="flex items-center justify-center h-40 text-sm text-destructive">
                    {error}
                </div>
            ) : (
                <EmployeeAttendancesSectionDatatable
                    columns={columns}
                    data={data}
                    isAdmin={isAdmin}
                    selectedDate={selectedDate}
                    onDateChange={onDateChange}
                    metadata={metadata}
                    page={page}
                    perPage={perPage}
                    onPageChange={onPageChange}
                    onPerPageChange={onPerPageChange}
                />
            )}
        </section>
    );
}