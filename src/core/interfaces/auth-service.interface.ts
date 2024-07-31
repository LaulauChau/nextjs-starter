import type { Cookie, Session, User } from "lucia";

export interface AuthService {
  createBlankSessionCookie(): Cookie;

  createSessionCookie(
    params: { sessionId: string } | { userId: string },
  ): Promise<Cookie>;

  getSessionCookieName(): string;

  validateSession(
    sessionId: string | null,
  ): Promise<{ session: Session | null; user: User | null }>;
}
