import { Button } from "@/components/ui/button";
import type { EmployeeType } from "@/lib/types/employee";
import type { ColumnDef } from "@tanstack/react-table";
import { EditIcon, TrashIcon } from "lucide-react";

interface ColumnsOptions {
    onEdit: (employee: EmployeeType) => void;
    onDelete: (employee: EmployeeType) => void;
}

export function AdminEmployeesSectionColumns({
    onEdit,
    onDelete,
}: ColumnsOptions): ColumnDef<EmployeeType>[] {
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
                    <span className="text-muted-foreground italic">-</span>
                ),
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