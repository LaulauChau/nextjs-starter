"use client";

import { Button } from "~/app/components/ui/button";
import { Form } from "~/app/components/ui/form";
import { FormInput } from "~/app/components/ui/form-input";
import { useAuthForm } from "~/app/hooks/use-auth-form";

export function AuthForm({
  formType,
}: Readonly<{ formType: "login" | "register" }>) {
  const { form, formAction, formRef, onSubmit } = useAuthForm(formType);

  return (
    <Form {...form}>
      <form
        action={formAction}
        className="space-y-10"
        onSubmit={onSubmit}
        ref={formRef}
      >
        <div className="space-y-6">
          {formType === "register" && (
            <FormInput control={form.control} label="name" />
          )}
          <FormInput control={form.control} label="username" />
          <FormInput control={form.control} label="password" />
          {formType === "register" && (
            <FormInput control={form.control} label="confirmPassword" />
          )}
        </div>
        <Button className="w-full" type="submit">
          {formType === "login" ? "Login" : "Register"}
        </Button>
      </form>
    </Form>
  );
}
