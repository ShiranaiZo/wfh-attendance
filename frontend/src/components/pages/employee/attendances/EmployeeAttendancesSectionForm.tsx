import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { apiClockIn } from "@/lib/api/attendance";
import { UploadCloud, X } from "lucide-react";

interface Props {
    additionalClass?: string;
    onSuccess?: () => void;
}

interface FormErrors {
    image?: boolean;
    notes?: boolean;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export function EmployeeAttendancesSectionForm({ additionalClass = "", onSuccess }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (file: File | null) => {
        if (!file) return;

        if (!ACCEPTED_TYPES.includes(file.type)) {
            toast.error("Only PNG, JPG, JPEG, or WEBP images are allowed.");
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
        if (errors.image) setErrors((prev) => ({ ...prev, image: false }));
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0] ?? null;

        handleFileChange(file);
    };

    const clearImage = () => {
        setImage(null);
        setPreview(null);

        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newErrors: FormErrors = {};
        if (!image) newErrors.image = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error("Please upload a photo proof before clocking in.");
            return;
        }

        setErrors({});
        setIsLoading(true);
        const toastId = toast.loading("Clocking in...");

        try {
            await apiClockIn(image!, notes.trim());
            toast.success("Clock-in saved successfully!", { id: toastId });

            clearImage();
            setNotes("");
            onSuccess?.();
        } catch (error: any) {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to clock in. Please try again.";

            toast.error(msg, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`w-full ${additionalClass}`}>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-sm border h-fit"
            >
                <div className="border-b px-6 py-5">
                    <h2 className="text-xl font-semibold">Clock In</h2>
                </div>

                <div className="px-6 pt-6 pb-8">
                    <FieldGroup>
                        <Field data-invalid={errors.image || undefined}>
                            <FieldLabel htmlFor="attendance-image">
                                Photo Proof
                            </FieldLabel>

                            <input
                                ref={fileInputRef}
                                id="attendance-image"
                                type="file"
                                accept={ACCEPTED_TYPES.join(",")}
                                className="sr-only"
                                disabled={isLoading}
                                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                                required
                            />

                            {preview ? (
                                <div className="relative w-full rounded-md overflow-hidden border">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={clearImage}
                                        disabled={isLoading}
                                        className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                                    >
                                        <X className="size-4" />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onClick={() => !isLoading && fileInputRef.current?.click()}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    className={`
                                        flex flex-col items-center justify-center gap-2 w-full h-40
                                        rounded-md border-2 border-dashed cursor-pointer transition-colors
                                        ${errors.image
                                            ? "border-destructive bg-destructive/5"
                                            : "border-input hover:border-primary hover:bg-primary/5"
                                        }
                                        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                                    `}
                                >
                                    <UploadCloud className={`size-8 ${errors.image ? "text-destructive" : "text-muted-foreground"}`} />
                                    <p className="text-sm text-muted-foreground text-center">
                                        <span className="font-medium text-foreground">Click to upload</span> or drag & drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, WEBP</p>
                                </div>
                            )}

                            {errors.image && (
                                <FieldError>Photo proof is required.</FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="attendance-notes">Notes (To do)</FieldLabel>
                            <Textarea
                                id="attendance-notes"
                                placeholder="Slicing UI, Review PR"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                disabled={isLoading}
                                rows={3}
                                className="resize-none"
                            />
                        </Field>

                        <Field orientation="horizontal">
                            <Button
                                type="submit"
                                className="w-full cursor-pointer flex items-center gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? "Submitting..." : "Clock In"}
                            </Button>
                        </Field>
                    </FieldGroup>
                </div>
            </form>
        </div>
    );
}
