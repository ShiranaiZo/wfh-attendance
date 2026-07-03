import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { EmployeeType } from "@/lib/types/employee";
import { AdminEmployeesSectionDatatable } from "./AdminEmployeesSectionDatatable";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { apiDeleteEmployee } from "@/lib/api/employee";
import { AppRoutes } from "@/lib/helpers/app-routes";
import { UserPlus } from "lucide-react";
import { AdminEmployeesSectionColumns } from "./AdminEmployeesSectionColumns";

import type { MetadataType } from "@/lib/types/apiType";

interface Props {
    data: EmployeeType[];
    metadata: MetadataType | null;
    isLoading: boolean;
    error: string | null;
    page: number;
    perPage: number;
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
    onRefresh: () => void;
}

export function AdminEmployeesSectionMain({ data, metadata, isLoading, error, page, perPage, onPageChange, onPerPageChange, onRefresh }: Props) {
    const navigate = useNavigate();
    const [deleteTarget, setDeleteTarget] = useState<EmployeeType | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = (employee: EmployeeType) => {
        navigate(`/admin/employees/edit/${employee.id}`);
    };

    const handleDelete = (employee: EmployeeType) => {
        setDeleteTarget(employee);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        setIsDeleting(true);
        const toastId = toast.loading(`Deleting ${deleteTarget.name}...`);
        try {
            await apiDeleteEmployee(deleteTarget.id);
            toast.success(`${deleteTarget.name} deleted successfully.`, { id: toastId });
            setDeleteTarget(null);
            onRefresh();
        } catch (err: any) {
            const msg = err?.response?.data?.message || err?.message || "Failed to delete employee.";
            toast.error(msg, { id: toastId });
        } finally {
            setIsDeleting(false);
        }
    };

    const columns = useMemo(
        () => AdminEmployeesSectionColumns({ onEdit: handleEdit, onDelete: handleDelete }),
        []
    );

    return (
        <section
            id="admin-employees-section-main"
            className="bg-white rounded-lg w-full h-fit py-8 px-6 flex flex-col gap-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-foreground">Employees</h2>
                </div>

                <Button
                    id="btn-add-employee"
                    onClick={() => navigate(AppRoutes.ADMIN_EMPLOYEES_CREATE)}
                    className="flex items-center gap-2"
                >
                    <UserPlus className="size-4" />
                    Add Employee
                </Button>
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
                <AdminEmployeesSectionDatatable
                    columns={columns}
                    data={data}
                    metadata={metadata}
                    page={page}
                    perPage={perPage}
                    onPageChange={onPageChange}
                    onPerPageChange={onPerPageChange}
                />
            )}

            <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <DialogContent>
                    <DialogHeader className="flex flex-col gap-5">
                        <DialogTitle>Delete Data</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete this data?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteTarget(null)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Yes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    );
}