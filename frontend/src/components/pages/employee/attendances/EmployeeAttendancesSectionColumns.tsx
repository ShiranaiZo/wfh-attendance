import type { ColumnDef } from "@tanstack/react-table";
import type { AttendanceType } from "@/lib/types/attendance";

export function EmployeeAttendancesSectionColumns(): ColumnDef<AttendanceType>[] {
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