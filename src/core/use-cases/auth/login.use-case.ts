import type { Cookie } from "lucia";

import type { AuthService } from "~/core/interfaces/auth-service.interface";
import type { PasswordService } from "~/core/interfaces/password-service.interface";
import type { UsersRepository } from "~/domain/interfaces/users-repository.interface";

export class LoginUseCase {
  constructor(
    private authService: AuthService,
    private passwordService: PasswordService,
    private usersRepository: UsersRepository,
  ) {}

  async execute(username: string, password: string): Promise<Cookie> {
    const existingUser = await this.usersRepository.findByUsername(username);

    if (!existingUser) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await this.passwordService.verify(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    return this.authService.createSessionCookie({ userId: existingUser.id });
  }
}
