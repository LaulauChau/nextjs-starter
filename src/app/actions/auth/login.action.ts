"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import sanitize from "sanitize-html";

import { loginSchema } from "~/app/validations/auth/login.schema";
import { getAuthUseCases } from "~/core/di/auth.di";

export async function loginAction(
  _: unknown,
  data: FormData,
): Promise<{
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
}> {
  try {
    const formData = Object.fromEntries(data);
    const parsedData = loginSchema.safeParse(formData);

    if (!parsedData.success) {
      const fields: Record<string, string> = {};

      for (const key of Object.keys(formData)) {
        if (formData[key]) {
          fields[key] = formData[key].toString();
        }
      }

      return {
        message: "Invalid data",
        fields,
        issues: parsedData.error.issues.map((issue) => issue.message),
      };
    }

    const { loginUseCase } = getAuthUseCases();
    const sessionCookie = await loginUseCase.execute(
      sanitize(parsedData.data.username),
      sanitize(parsedData.data.password),
    );

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/dashboard");
  } catch (error: unknown) {
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}
