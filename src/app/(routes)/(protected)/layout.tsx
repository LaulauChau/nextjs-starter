import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { validateSession } from "~/app/actions/auth/validate-session.action";

export default async function ProtectedLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const { user } = await validateSession();

  if (!user) {
    return redirect("/auth/login");
  }

  return children;
}
