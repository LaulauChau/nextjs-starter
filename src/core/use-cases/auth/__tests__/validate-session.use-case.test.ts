import type { AuthService } from "~/core/interfaces/auth-service.interface";
import { ValidateSessionUseCase } from "~/core/use-cases/auth/validate-session.use-case";

describe("ValidateSessionUseCase", () => {
  const mockAuthService = {
    validateSession: vi.fn(),
  };
  let useCase: ValidateSessionUseCase;

  beforeEach(() => {
    useCase = new ValidateSessionUseCase(
      mockAuthService as unknown as AuthService,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should return the session and user", async () => {
    mockAuthService.validateSession.mockResolvedValue({
      session: { id: "session-id" },
      user: { id: "user-id" },
    });

    const result = await useCase.execute("session-id");

    expect(result).toEqual({
      session: { id: "session-id" },
      user: { id: "user-id" },
    });
  });

  test("should return null if the session is invalid", async () => {
    mockAuthService.validateSession.mockResolvedValue({
      session: null,
      user: null,
    });

    const result = await useCase.execute("session-id");

    expect(result).toEqual({
      session: null,
      user: null,
    });
  });
});
