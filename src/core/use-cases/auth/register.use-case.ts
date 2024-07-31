import type { Cookie } from "lucia";

import type { AuthService } from "~/core/interfaces/auth-service.interface";
import type { PasswordService } from "~/core/interfaces/password-service.interface";
import type { UsersRepository } from "~/domain/interfaces/users-repository.interface";

export class RegisterUseCase {
  constructor(
    private authService: AuthService,
    private passwordService: PasswordService,
    private usersRepository: UsersRepository,
  ) {}

  async execute(
    name: string,
    username: string,
    password: string,
  ): Promise<Cookie> {
    const existingUser = await this.usersRepository.findByUsername(username);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.passwordService.hash(password);
    const newUser = await this.usersRepository.create({
      name,
      username,
      password: hashedPassword,
    });

    return this.authService.createSessionCookie({ userId: newUser.id });
  }
}
