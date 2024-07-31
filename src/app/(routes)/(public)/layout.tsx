import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { validateSession } from "~/app/actions/auth/validate-session.action";

export default async function PublicLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const { user } = await validateSession();

  if (user) {
    return redirect("/dashboard");
  }

  return children;
}
