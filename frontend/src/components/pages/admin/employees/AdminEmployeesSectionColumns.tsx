import { Button } from "@/components/ui/button";
import type { Employee } from "@/lib/types/employee";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { EditIcon, TrashIcon } from "lucide-react";

interface ColumnsOptions {
    onEdit: (employee: Employee) => void;
    onDelete: (employee: Employee) => void;
}

export function AdminEmployeesSectionColumns({
    onEdit,
    onDelete,
}: ColumnsOptions): ColumnDef<Employee>[] {
    return [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "position",
            header: "Position",
            cell: ({ row }) =>
                row.original.position ? (
                    <span>{row.original.position}</span>
                ) : (
                    <span className="text-muted-foreground italic">—</span>
                ),
        },
        {
            accessorKey: "createdAt",
            header: "Joined At",
            cell: ({ row }) =>
                new Date(row.original.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }),
        },
        {
            id: "status",
            header: "Status",
            cell: () => <Badge variant="secondary">Active</Badge>,
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => (
                <div className="flex items-center gap-1 justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(row.original)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    >
                        <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(row.original)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];
}