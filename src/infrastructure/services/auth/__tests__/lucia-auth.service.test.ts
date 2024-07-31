import type { AuthService } from "~/core/interfaces/auth-service.interface";
import { LuciaAuthService } from "~/infrastructure/services/auth/lucia-auth.service";

vi.mock("~/infrastructure/services/auth/lucia.config", () => ({
  lucia: {
    createBlankSessionCookie: vi.fn().mockReturnValue("blank-session-cookie"),
    createSession: vi.fn().mockResolvedValue({ id: "session-id" }),
    createSessionCookie: vi.fn().mockReturnValue("session-cookie"),
    sessionCookieName: "session-cookie-name",
    validateSession: vi.fn().mockResolvedValue({
      session: { id: "session-id" },
      user: { id: "user-id" },
    }),
  },
}));

describe("LuciaAuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    service = new LuciaAuthService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("createBlankSessionCookie", () => {
    test("should return a blank session cookie", () => {
      const cookie = service.createBlankSessionCookie();

      expect(cookie).toBe("blank-session-cookie");
    });
  });

  describe("createSessionCookie", () => {
    test("should create a session cookie with a session ID", async () => {
      const cookie = await service.createSessionCookie({
        sessionId: "session-id",
      });

      expect(cookie).toBe("session-cookie");
    });

    test("should create a session cookie with a user ID", async () => {
      const cookie = await service.createSessionCookie({ userId: "user-id" });

      expect(cookie).toBe("session-cookie");
    });
  });

  describe("getSessionCookieName", () => {
    test("should return the session cookie name", () => {
      const name = service.getSessionCookieName();

      expect(name).toBe("session-cookie-name");
    });
  });

  describe("validateSession", () => {
    test("should return the session and user if the session ID is not null", async () => {
      const { session, user } = await service.validateSession("session-id");

      expect(session).toEqual({ id: "session-id" });
      expect(user).toEqual({ id: "user-id" });
    });

    test("should return null for the session and user if the session ID is null", async () => {
      const { session, user } = await service.validateSession(null);

      expect(session).toBeNull();
      expect(user).toBeNull();
    });
  });
});
