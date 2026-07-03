import type { ColumnDef } from "@tanstack/react-table";
import type { AttendanceType } from "@/lib/types/attendance";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

export function EmployeeAttendancesSectionColumns({ isAdmin = false }: { isAdmin?: boolean }): ColumnDef<AttendanceType>[] {
    return [
        {
            accessorKey: "date",
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
            cell: ({ row }) => {
                const imageUrl = row.original.image ? `${row.original.image}?token=${localStorage.getItem("access_token")}` : null;
                const altText = `${row.original.clockIn} ${row?.original?.employee?.name ? row?.original?.employee?.name : ''}`;

                return imageUrl ? (
                    <Dialog>
                        <DialogTrigger asChild>
                            <img
                                src={imageUrl}
                                alt={altText}
                                className="max-w-20 w-full h-fit cursor-pointer hover:opacity-80 transition-opacity rounded-sm object-cover"
                            />
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl flex justify-center bg-transparent border-none shadow-none outline-none">
                            <img src={imageUrl} alt={altText} className="max-h-[85vh] w-auto object-contain rounded-md" />
                        </DialogContent>
                    </Dialog>
                ) : (
                    <span className="text-muted-foreground italic">—</span>
                );
            }
        }
    ];
}