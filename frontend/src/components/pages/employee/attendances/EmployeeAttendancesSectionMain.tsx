import { useMemo } from "react";
import type { AttendanceType } from "@/lib/types/attendance";
import { Skeleton } from "@/components/ui/skeleton";
import { EmployeeAttendancesSectionColumns } from "./EmployeeAttendancesSectionColumns";
import { EmployeeAttendancesSectionDatatable } from "./EmployeeAttendancesSectionDatatable";

interface Props {
    data: AttendanceType[];
    isLoading: boolean;
    error: string | null;
    additionalClass?: string;
}

export function EmployeeAttendancesSectionMain({ data, isLoading, error, additionalClass = "" }: Props) {
    const columns = useMemo(
        () => EmployeeAttendancesSectionColumns(),
        []
    );

    return (
        <section
            id="admin-employees-section-main"
            className={`bg-white rounded-lg w-full h-fit py-8 px-6 flex flex-col gap-6 ${additionalClass}`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-foreground">Attendances</h2>
                </div>
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
                <EmployeeAttendancesSectionDatatable columns={columns} data={data} />
            )}
        </section>
    );
}