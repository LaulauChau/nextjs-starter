import type { AuthService } from "~/core/interfaces/auth-service.interface";
import type { PasswordService } from "~/core/interfaces/password-service.interface";
import { RegisterUseCase } from "~/core/use-cases/auth/register.use-case";
import type { UsersRepository } from "~/domain/interfaces/users-repository.interface";

describe("RegisterUseCase", () => {
  const mockAuthService = {
    createSessionCookie: vi.fn(),
  };
  const mockUsersRepository = {
    create: vi.fn(),
    findByUsername: vi.fn(),
  };
  const mockPasswordService = {
    hash: vi.fn(),
  };
  let useCase: RegisterUseCase;

  beforeEach(() => {
    useCase = new RegisterUseCase(
      mockAuthService as unknown as AuthService,
      mockPasswordService as unknown as PasswordService,
      mockUsersRepository as unknown as UsersRepository,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should throw if the user already exists", async () => {
    mockUsersRepository.findByUsername.mockResolvedValue({});

    await expect(
      useCase.execute("name", "username", "password"),
    ).rejects.toThrow("User already exists");
  });

  test("should create a new user and return a session cookie", async () => {
    mockUsersRepository.findByUsername.mockResolvedValue(null);
    mockPasswordService.hash.mockResolvedValue("hashed-password");
    mockUsersRepository.create.mockResolvedValue({
      id: "user-id",
    });
    mockAuthService.createSessionCookie.mockResolvedValue({
      name: "cookie-name",
      value: "cookie-value",
    });

    const result = await useCase.execute("name", "username", "password");

    expect(result).toEqual({
      name: "cookie-name",
      value: "cookie-value",
    });
  });
});
