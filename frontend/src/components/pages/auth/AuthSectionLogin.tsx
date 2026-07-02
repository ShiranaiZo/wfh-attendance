import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getUserRole, setToken, UserRoles } from "@/lib/helpers/auth";
import { apiAuthLogin } from "@/lib/api/auth";
import { AppRoutes } from "@/lib/helpers/app-routes";

export function AuthSectionLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: boolean; password?: boolean }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: typeof errors = {};
        if (!email) newErrors.email = true;
        if (!password) newErrors.password = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please fill in all fields.");
            return;
        }

        setErrors({});
        setIsLoading(true);
        const toastId = toast.loading("Logging in...");

        try {
            const response = await apiAuthLogin({ email, password });

            if (response.data?.success && response.data?.access_token) {
                setToken(response.data.access_token);

                toast.success("Successfully logged in!", { id: toastId });

                const role = getUserRole();
                if (role === UserRoles.HRD) {
                    navigate(AppRoutes.ADMIN);
                } else {
                    navigate(AppRoutes.EMPLOYEE);
                }
            } else {
                toast.error(response.data?.message || "Login failed. Invalid credentials.", { id: toastId });
            }
        } catch (error: any) {
            console.error("Login error:", error);
            const errorMsg = error.response?.data?.message || "Connection refused. Please check if backend is running.";
            toast.error(errorMsg, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg max-w-md w-full h-fit m-auto -translate-y-20 shadow-md border">
            <div className="border-b px-4 py-6">
                <h1 className="text-4xl font-bold text-center">Login</h1>
            </div>

            <div className="px-10 pt-8 pb-12">
                <FieldGroup>
                    <Field data-invalid={errors.email || undefined}>
                        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                        <Input
                            id="fieldgroup-email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors({ ...errors, email: false });
                            }}
                            aria-invalid={errors.email}
                            disabled={isLoading}
                            required
                        />
                        {errors.email && <FieldError>Email is required.</FieldError>}
                    </Field>

                    <Field data-invalid={errors.password || undefined}>
                        <FieldLabel htmlFor="fieldgroup-name">Password</FieldLabel>
                        <Input
                            id="fieldgroup-name"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({ ...errors, password: false });
                            }}
                            aria-invalid={errors.password}
                            disabled={isLoading}
                            required
                        />
                        {errors.password && <FieldError>Password is required.</FieldError>}
                    </Field>

                    <Field orientation="horizontal">
                        <Button type="submit" className="w-full mt-2 cursor-pointer" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </Field>
                </FieldGroup>
            </div>
        </form>
    )
}