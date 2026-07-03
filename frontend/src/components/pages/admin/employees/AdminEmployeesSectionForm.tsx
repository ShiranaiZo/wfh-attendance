import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AppRoutes } from "@/lib/helpers/app-routes";
import { Positions } from "@/lib/helpers/positions";
import type { CreateEmployeePayloadType, EmployeeType, UpdateEmployeePayloadType } from "@/lib/types/employee";
import { apiCreateEmployee, apiUpdateEmployee } from "@/lib/api/employee";
import { ArrowLeft } from "lucide-react";

interface Props {
    mode: "create" | "edit";
    employee?: EmployeeType;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    position?: string;
}

const POSITION_OPTIONS = Object.entries(Positions).map(([, value]) => value);

export function AdminEmployeesSectionForm({ mode, employee }: Props) {
    const navigate = useNavigate();

    const [name, setName] = useState(employee?.name ?? "");
    const [email, setEmail] = useState(employee?.email ?? "");
    const [password, setPassword] = useState("");
    const [position, setPosition] = useState<string>(employee?.position ?? "");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const isEdit = mode === "edit";

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: FormErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!isEdit && !email.trim()) newErrors.email = "Email is required";
        if (!isEdit && !password.trim()) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all required fields.");
            return;
        }

        setErrors({});
        setIsLoading(true);

        const toastId = toast.loading(isEdit ? "Updating employee..." : "Creating employee...");

        try {
            if (isEdit && employee) {
                const payload: UpdateEmployeePayloadType = {
                    name: name.trim(),
                    position: position === "" ? undefined : position,
                };

                if (password.trim()) payload.password = password.trim();

                await apiUpdateEmployee(employee.id, payload);
            } else {
                const payload: CreateEmployeePayloadType = {
                    name: name.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    position: position === "" ? undefined : position,
                };

                await apiCreateEmployee(payload);
            }

            toast.success(
                isEdit ? "Employee updated successfully!" : "Employee created successfully!",
                { id: toastId }
            );

            navigate(AppRoutes.ADMIN_EMPLOYEES);
        } catch (error: any) {
            const data = error?.response?.data;
            const msg = data?.message || error?.message || "Something went wrong. Please try again.";

            if (data?.errors && typeof data.errors === "object") {
                const fieldErrors: FormErrors = {};
                if (data.errors.name?.length) fieldErrors.name = data.errors.name[0];
                if (data.errors.email?.length) fieldErrors.email = data.errors.email[0];
                if (data.errors.password?.length) fieldErrors.password = data.errors.password[0];
                if (data.errors.position?.length) fieldErrors.position = data.errors.position[0];

                setErrors(fieldErrors);

                console.log(fieldErrors, "ini field eror yang kedua")
            }

            toast.error(msg, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full">
            <button
                type="button"
                onClick={() => navigate(AppRoutes.ADMIN_EMPLOYEES)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 py-0"
            >
                <ArrowLeft className="size-4" />
                Back to Employees
            </button>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-sm border"
            >
                <div className="border-b px-6 py-5">
                    <h1 className="text-xl font-semibold">
                        {isEdit ? "Edit Employee" : "Add Employee"}
                    </h1>
                </div>

                <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
                    <FieldGroup className="grid grid-cols-2">
                        <Field data-invalid={errors?.name || undefined}>
                            <FieldLabel htmlFor="name">
                                Full Name
                            </FieldLabel>

                            <Input
                                id="name"
                                type="text"
                                placeholder="e.g. Budi Santoso"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (errors?.name) setErrors({ ...errors, name: "" })
                                }}
                                aria-invalid={!!errors?.name}
                                disabled={isLoading}
                                required
                            />
                            {errors?.name && <FieldError>{errors.name}</FieldError>}
                        </Field>

                        <Field data-invalid={errors?.position || undefined}>
                            <FieldLabel htmlFor="position">Position</FieldLabel>

                            <Select
                                value={position}
                                onValueChange={setPosition}
                                disabled={isLoading}
                                required
                            >
                                <SelectTrigger id="position">
                                    <SelectValue placeholder="-- Choose Position --" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={""}>
                                        <span className="text-muted-foreground">-- Choose Position --</span>
                                    </SelectItem>

                                    {POSITION_OPTIONS.map((pos) => (
                                        <SelectItem key={pos} value={pos}>
                                            {pos}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors?.position && <FieldError>{errors.position}</FieldError>}
                        </Field>

                        <Field data-invalid={errors?.email || undefined}>
                            <FieldLabel htmlFor="email">
                                Email
                            </FieldLabel>

                            <Input
                                id="email"
                                type="email"
                                placeholder="employee@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors?.email) setErrors({ ...errors, email: "" });
                                }}
                                aria-invalid={!!errors?.email}
                                disabled={isLoading || isEdit}
                                required
                            />
                            {errors?.email && <FieldError>{errors.email}</FieldError>}
                        </Field>

                        <Field data-invalid={errors?.password || undefined}>
                            <FieldLabel htmlFor="password">
                                Password
                            </FieldLabel>

                            <Input
                                id="password"
                                type="password"
                                placeholder={isEdit ? "Leave blank to keep current password" : "Min. 8 characters"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors?.password) setErrors({ ...errors, password: "" });
                                }}
                                aria-invalid={!!errors?.password}
                                disabled={isLoading}
                                required={!isEdit}
                            />
                            {errors?.password && <FieldError>{errors.password}</FieldError>}
                        </Field>
                    </FieldGroup>

                    <Button
                        type="submit"
                        className="w-fit ms-auto cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? isEdit ? "Saving..." : "Creating..."
                            : isEdit ? "Save Changes" : "Create Employee"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
