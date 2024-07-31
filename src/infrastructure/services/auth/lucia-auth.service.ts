import type { Cookie, Session, User } from "lucia";

import type { AuthService } from "~/core/interfaces/auth-service.interface";
import { lucia } from "./lucia.config";

export class LuciaAuthService implements AuthService {
  createBlankSessionCookie(): Cookie {
    return lucia.createBlankSessionCookie();
  }

  async createSessionCookie(
    params: { sessionId: string } | { userId: string },
  ): Promise<Cookie> {
    if ("userId" in params) {
      const session = await lucia.createSession(params.userId, {});

      return lucia.createSessionCookie(session.id);
    }

    return lucia.createSessionCookie(params.sessionId);
  }

  getSessionCookieName(): string {
    return lucia.sessionCookieName;
  }

  async validateSession(
    sessionId: string | null,
  ): Promise<{ session: Session | null; user: User | null }> {
    if (!sessionId) {
      return {
        session: null,
        user: null,
      };
    }

    return lucia.validateSession(sessionId);
  }
}
