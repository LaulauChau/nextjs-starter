"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import sanitize from "sanitize-html";

import { registerSchema } from "~/app/validations/auth/register.schema";
import { getAuthUseCases } from "~/core/di/auth.di";

export async function registerAction(_: unknown, data: FormData) {
  const formData = Object.fromEntries(data);
  const parsedData = registerSchema.safeParse(formData);

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

  const { registerUseCase } = getAuthUseCases();
  const sessionCookie = await registerUseCase.execute(
    sanitize(parsedData.data.name),
    sanitize(parsedData.data.username),
    sanitize(parsedData.data.password),
  );

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/dashboard");
}
