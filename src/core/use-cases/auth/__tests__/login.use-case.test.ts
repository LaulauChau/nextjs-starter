import type { AuthService } from "~/core/interfaces/auth-service.interface";
import type { PasswordService } from "~/core/interfaces/password-service.interface";
import { LoginUseCase } from "~/core/use-cases/auth/login.use-case";
import type { UsersRepository } from "~/domain/interfaces/users-repository.interface";

describe("LoginUseCase", () => {
  const mockAuthService = {
    createSessionCookie: vi.fn(),
  };
  const mockUsersRepository = {
    findByUsername: vi.fn(),
  };
  const mockPasswordService = {
    verify: vi.fn(),
  };
  let useCase: LoginUseCase;

  beforeEach(() => {
    useCase = new LoginUseCase(
      mockAuthService as unknown as AuthService,
      mockPasswordService as unknown as PasswordService,
      mockUsersRepository as unknown as UsersRepository,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should throw if the user does not exist", async () => {
    mockUsersRepository.findByUsername.mockResolvedValue(null);

    await expect(useCase.execute("username", "password")).rejects.toThrow(
      "Invalid credentials",
    );
  });

  test("should throw if the password is invalid", async () => {
    mockUsersRepository.findByUsername.mockResolvedValue({
      password: "hashed-password",
    });
    mockPasswordService.verify.mockResolvedValue(false);

    await expect(useCase.execute("username", "password")).rejects.toThrow(
      "Invalid credentials",
    );
  });

  test("should return a session cookie", async () => {
    mockUsersRepository.findByUsername.mockResolvedValue({
      id: "user-id",
      password: "hashed-password",
    });
    mockPasswordService.verify.mockResolvedValue(true);
    mockAuthService.createSessionCookie.mockResolvedValue({
      name: "cookie-name",
      value: "cookie-value",
    });

    const result = await useCase.execute("username", "password");

    expect(result).toEqual({
      name: "cookie-name",
      value: "cookie-value",
    });
  });
});
