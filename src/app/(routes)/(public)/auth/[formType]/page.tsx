import Link from "next/link";

import { AuthForm } from "~/app/components/auth/auth-form";
import { Separator } from "~/app/components/ui/separator";

export default function AuthPage({
  params: { formType },
}: Readonly<{ params: { formType: "login" | "register" } }>) {
  return (
    <div className="flex h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mb-10 text-center font-semibold text-2xl tracking-tight">
          {formType === "login" ? "Login" : "Register"}
        </h1>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm formType={formType} />
        <Separator orientation="horizontal" />
        <p className="text-center text-muted-foreground text-sm">
          {formType === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <br />
          <Link
            href={`/auth/${formType === "login" ? "register" : "login"}`}
            className="underline underline-offset-4 hover:text-primary"
          >
            {formType === "login" ? "Register" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
}
