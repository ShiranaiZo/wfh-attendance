import type { ColumnDef } from "@tanstack/react-table";
import type { AttendanceType } from "@/lib/types/attendance";

export function EmployeeAttendancesSectionColumns({ isAdmin = false }: { isAdmin?: boolean }): ColumnDef<AttendanceType>[] {
    return [
        {
            accessorKey: "clockin",
            header: "Date",
            cell: ({ row }) =>
                row?.original?.clockIn ? (
                    new Date(row.original.clockIn).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })
                ) : (
                    <span className="text-muted-foreground italic">-</span>
                ),
        },
        {
            accessorKey: "clockin",
            header: "Clock In",
            cell: ({ row }) =>
                row?.original?.clockIn ? (
                    new Date(row.original.clockIn).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })
                ) : (
                    <span className="text-muted-foreground italic">-</span>
                ),
        },
        ...(isAdmin ?
            [
                {
                    accessorKey: "employee.name",
                    header: "Employee Name",
                    cell: ({ row }) =>
                        row?.original?.employee?.name ? (
                            row.original.employee?.name
                        ) : (
                            <span className="text-muted-foreground italic">-</span>
                        ),
                } as ColumnDef<AttendanceType>,
                {
                    accessorKey: "employee.position",
                    header: "Position",
                    cell: ({ row }) =>
                        row?.original?.employee?.position ? (
                            row.original.employee?.position
                        ) : (
                            <span className="text-muted-foreground italic">-</span>
                        ),
                } as ColumnDef<AttendanceType>,
            ]
            : []
        ),
        {
            accessorKey: "notes",
            header: "Notes",
            cell: ({ row }) =>
                row?.original?.notes ? (
                    row.original.notes
                ) : (
                    <span className="text-muted-foreground italic">-</span>
                ),
        },
        {
            accessorKey: "image",
            header: "Photo Proof",
            cell: ({ row }) =>
                row.original.image ? (
                    <img src={`${row.original.image}?token=${localStorage.getItem("access_token")}`} alt={`${row.original.clockIn} ${row?.original?.employee?.name ? row?.original?.employee?.name : ''}`} className="max-w-20 w-full h-fit" />
                ) : (
                    <span className="text-muted-foreground italic">—</span>
                ),
        }
    ];
}