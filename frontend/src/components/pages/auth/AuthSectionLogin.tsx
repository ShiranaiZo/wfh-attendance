import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function AuthSectionLogin() {

    return (
        <div className="bg-white rounded-lg max-w-md w-full h-fit m-auto -translate-y-20">
            <div className="border-b px-4 py-6">
                <h1 className="text-4xl font-bold text-center">Login</h1>
            </div>

            <div className="px-10 pt-8 pb-12">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                        <Input
                            id="fieldgroup-email"
                            type="email"
                            placeholder="name@example.com"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="fieldgroup-name">Password</FieldLabel>
                        <Input id="fieldgroup-name" type="password" placeholder="Password" />
                    </Field>

                    <Field orientation="horizontal">
                        <Button type="submit" className="w-full">Login</Button>
                    </Field>
                </FieldGroup>
            </div>
        </div>
    )
}