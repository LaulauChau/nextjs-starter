import { cookies } from "next/headers";
import { cache } from "react";

import { getAuthServices, getAuthUseCases } from "~/core/di/auth.di";

export const validateSession = cache(async () => {
  const {
    createBlankSessionCookie,
    createSessionCookie,
    getSessionCookieName,
  } = getAuthServices();
  const { validateSessionUseCase } = getAuthUseCases();
  const sessionId = cookies().get(getSessionCookieName())?.value ?? null;
  const result = await validateSessionUseCase.execute(sessionId);

  try {
    if (result.session?.fresh) {
      const sessionCookie = await createSessionCookie({
        sessionId: result.session.id,
      });

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    if (!result.session) {
      const sessionCookie = createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {}

  return result;
});
